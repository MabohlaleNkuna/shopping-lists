import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:5001/users";
const LOCAL_STORAGE_KEY = "user";

// Utility functions for local storage
const loadUserFromLocalStorage = () => {
  const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return userData ? JSON.parse(userData) : { isAuthenticated: false, userData: null };
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
};

// Async actions using createAsyncThunk
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const response = await axios.post(apiUrl, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
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
  "user/updateUser",
  async (updatedData) => {
    const response = await axios.put(`${apiUrl}/${updatedData.id}`, updatedData);
    return response.data;
  }
);

// Initial state
const initialState = {
  ...loadUserFromLocalStorage(),
  status: "idle",
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        saveUserToLocalStorage(state);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.isAuthenticated = true;
          saveUserToLocalStorage(state);
        } else {
          state.error = "Invalid credentials";
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        saveUserToLocalStorage(state);
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
