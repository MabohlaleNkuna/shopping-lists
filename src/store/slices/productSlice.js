import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (apiUrl) => {
    const response = await fetch(apiUrl);
    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { dispatch, getState }) => {
    const { user } = getState();
    const response = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, userId: user.userData.id }),
    });
    const newProduct = await response.json();
    dispatch(fetchAllProducts(`http://localhost:5000/products?userId=${user.userData.id}`));
    return newProduct;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updates }, { dispatch, getState }) => {
    const { user } = getState();
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const updatedProduct = await response.json();
    dispatch(fetchAllProducts(`http://localhost:5000/products?userId=${user.userData.id}`));
    return updatedProduct;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, getState }) => {
    const { user } = getState();
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    });
    dispatch(fetchAllProducts(`http://localhost:5000/products?userId=${user.userData.id}`));
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchStatus = "success";
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.fetchStatus = "pending";
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.fetchStatus = "error";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(product => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
