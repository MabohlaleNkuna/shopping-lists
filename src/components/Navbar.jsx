// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice'; // Import the specific action

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()); // Use the specific action directly
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#004AAD',
      color: '#FFF',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#FFF', textDecoration: 'none' }}>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" style={{ color: '#FFF', textDecoration: 'none' }}>Profile</Link>
            <Link to="/products" style={{ color: '#FFF', textDecoration: 'none' }}>Products</Link>
            <button 
              onClick={handleLogout} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#FFF', 
                cursor: 'pointer',
                padding: '0',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#FFF', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#FFF', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
