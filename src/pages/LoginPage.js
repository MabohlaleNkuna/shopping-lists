import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(userActions.loginUser(userData));
    navigate('/profile');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
