import { createSlice } from "@reduxjs/toolkit";
import { deleteCartItems, fetchCartItems, updateCartQuantity } from "./cartAPI";

const initialState = {
  cartLoading: false,
  cartError: "",
  cartItems: [],
  cartTotalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartTotalPrice: (state, action) => {
      state.cartTotalPrice = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message;
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(deleteCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message;
      });
  },
});

export const { setCartTotalPrice, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
