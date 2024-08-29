import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!surname) newErrors.surname = 'Surname is required';
    else if(surname.length <3) newErrors.surname = 'Surname must be at least 3 characters';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      
      const userData = { email, password, name, surname };

      dispatch(userActions.registerUser(userData));
      navigate('/profile');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
        
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="form-input"
        />
        {errors.surname && <p className="error-message">{errors.surname}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        
        
        <button onClick={handleRegister} className="register-button">Register</button>
      </div>
    </div>
  );
};

export default RegistrationPage;
