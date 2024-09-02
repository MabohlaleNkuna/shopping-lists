// src/actions/auth.js
const API_URL = 'http://localhost:5000';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`);
    const users = await response.json();

    if (users.length === 0 || users[0].password !== password) {
      alert('Invalid email or password');
      return;
    }

    const user = users[0];
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Login failed:', error);
    dispatch({ type: AUTH_ERROR, error: error.message });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const newUser = await response.json();

    // Automatically log in the user after registration
    dispatch(login(userData.email, userData.password));
  } catch (error) {
    console.error('Registration error:', error);
    dispatch({ type: AUTH_ERROR, error: error.message });
  }
};
