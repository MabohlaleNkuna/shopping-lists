// src/components/HomePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const userData = useSelector((state) => state.user.userData);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <h1 className="welcome-message">
        Welcome to the Shopping List App, {isAuthenticated ? userData.name : 'Guest'}!
      </h1>
      {isAuthenticated && (
        <div className="user-info">
          <p>
            To add and view shopping lists, <Link to="/products" className="link-text">click here</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
