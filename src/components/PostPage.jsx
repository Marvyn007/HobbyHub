import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const foundPost = storedPosts.find(p => p.id === id);
    setPost(foundPost);
  }, [id]);

  const handleUpvote = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.map(p =>
      p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPost({ ...post, upvotes: post.upvotes + 1 });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.map(p =>
      p.id === id ? { ...p, comments: [...p.comments, { id: Date.now(), text: comment, createdAt: new Date().toISOString() }] } : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPost({ ...post, comments: [...post.comments, { id: Date.now(), text: comment, createdAt: new Date().toISOString() }] });
    setComment('');
  };

  const handleDelete = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.filter(p => p.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate('/');
  };

  if (!post) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="post-page">
        <h1>{post.title}</h1>
        <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
        <p>Upvotes: {post.upvotes}</p>
        {post.content && <p>{post.content}</p>}
        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
        <div className="button-group">
          <button className="upvote" onClick={handleUpvote}>Upvote</button>
          <Link className="edit" to={`/edit/${post.id}`}>Edit</Link>
          <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
        <div className="comment-section">
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Add Comment</button>
          </form>
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;