import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faList } from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {
  const userData = useSelector((state) => state.user.userData);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      {/* Main content */}
      <div className="content-container my-5">
        <h1 className="text-center text-primary mb-4 fade-in">
          <FontAwesomeIcon icon={faShoppingCart} /> Welcome to the Shopping List App, {isAuthenticated ? userData.name : 'Guest'}!
        </h1>

        {/* User Info Section */}
        {isAuthenticated && (
          <div className="user-info text-center">
            <p>
              <FontAwesomeIcon icon={faList} /> To add and view shopping lists,{' '}
              <Link to="/products" className="btn btn-primary">
                <FontAwesomeIcon icon={faShoppingCart} /> Click here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
