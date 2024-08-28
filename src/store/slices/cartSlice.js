import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProductIDs: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartProductIDs.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartProductIDs = state.cartProductIDs.filter(id => id !== action.payload);
    },
    clearAllItems: (state) => {
      state.cartProductIDs = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
