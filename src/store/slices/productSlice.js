import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = 'products';

const loadProductsFromLocalStorage = () => {
  const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedProducts ? JSON.parse(savedProducts) : [];
};

const saveProductsToLocalStorage = (products) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (apiUrl, { dispatch }) => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    saveProductsToLocalStorage(data); // Save fetched products to localStorage
    return data;
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
    const products = [...loadProductsFromLocalStorage(), newProduct];
    saveProductsToLocalStorage(products);
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
      body: JSON.stringify({ ...updates, userId: user.userData.id }),
    });
    const updatedProduct = await response.json();
    const products = loadProductsFromLocalStorage().map(product =>
      product.id === id ? updatedProduct : product
    );
    saveProductsToLocalStorage(products);
    return updatedProduct;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch }) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    });
    const products = loadProductsFromLocalStorage().filter(product => product.id !== id);
    saveProductsToLocalStorage(products);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: loadProductsFromLocalStorage(),
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
