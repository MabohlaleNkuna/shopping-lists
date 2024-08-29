import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
    registerUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    updateUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
