import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = storedPosts.find(p => p.id === id);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImageUrl(post.imageUrl);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required!');
      return;
    }
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = storedPosts.map(p =>
      p.id === id ? { ...p, title, content, imageUrl } : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate(`/post/${id}`);
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;