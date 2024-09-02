// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/users';

// Async actions using createAsyncThunk
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData) => {
    const response = await axios.post(apiUrl, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials) => {
    const response = await axios.get(apiUrl, {
      params: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    return response.data.length ? response.data[0] : null;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updatedData) => {
    const response = await axios.put(`${apiUrl}/${updatedData.id}`, updatedData); // Assuming the user ID is included in the data
    return response.data;
  }
);

// Initial state
const initialState = {
  userData: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.isAuthenticated = true;
        } else {
          state.error = 'Invalid credentials';
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload; // Update user data
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
