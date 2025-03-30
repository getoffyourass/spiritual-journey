import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/prayer', label: 'Prayer', icon: '🙏' },
    { path: '/meditation', label: 'Meditation', icon: '☮️' },
    { path: '/community', label: 'Community', icon: '👥' },
    { path: '/shop', label: 'Shop', icon: '🛍️' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Spiritual Journey</Link>
      </div>
      
      <div className="navbar-links">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="navbar-user">
        {user ? (
          <>
            <Link to="/profile" className="user-profile">
              <img 
                src={user.photoURL || '/assets/default-avatar.png'} 
                alt="Profile" 
                className="user-avatar"
              />
            </Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
