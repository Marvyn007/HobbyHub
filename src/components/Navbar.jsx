import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1><Link to="/">HobbyHub</Link></h1>
        <Link to="/create">Create Post</Link>
      </div>
    </nav>
  );
}

export default Navbar;