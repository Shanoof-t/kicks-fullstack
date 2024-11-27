import { createSlice } from "@reduxjs/toolkit";
import { deleteCartItems, fetchCartItems, updateCartQuantity } from "./cartAPI";

const initialState = {
  cartLoading: false,
  cartError: "",
  cartItems: [],
  cartTotalPrice: 0,
  CartProductCount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartTotalPrice: (state, action) => {
      state.cartTotalPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.cartLoading = true;
        state.cartItems = [];
        state.cartTotalPrice = 0;
        state.CartProductCount = 0;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartItems = action.payload.data.cart;
        state.cartTotalPrice = action.payload.data.totalAmount;
        state.CartProductCount = action.payload.data.count;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload.message;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cartLoading = false;
        // state.cartItems = action.payload.data.cart;
        // state.cartTotalPrice = action.payload.data.totalAmount;
        // state.CartProductCount = action.payload.data.count;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload.message;
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
