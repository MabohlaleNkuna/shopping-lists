import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const userData = useSelector((state) => state.user.userData);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <h1>Welcome to the Shopping List App</h1>
      <p>Current User: {isAuthenticated ? userData.name : 'Guest'}</p>
    </div>
  );
};

export default HomePage;
