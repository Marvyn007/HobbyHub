import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const filteredPosts = sortedPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Sort by Creation Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>
      <div>
        {filteredPosts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Upvotes: {post.upvotes}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;