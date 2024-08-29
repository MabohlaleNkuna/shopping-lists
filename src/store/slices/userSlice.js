// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: JSON.parse(localStorage.getItem('userData')) || null,
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userData', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    logoutUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
    },
    registerUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userData', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    updateUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      localStorage.setItem('userData', JSON.stringify(state.userData));
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
