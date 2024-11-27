import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItem,
  fetchItem,
  updateCartSize,
} from "./productDetailsAPI";

const initialState = {
  productDetailsLoading: false,
  addedMessage: "",
  item: {},
  cartExistingItem: {},
  size: null,
  sizeError: "",
  updateError: "",
  fetchError: "",
  addCartError: "",
  cartExistingItemError: "",
};
const productDetailsSlice = createSlice({
  name: "product-details",
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setSizeError: (state, action) => {
      state.sizeError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartSize.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(updateCartSize.fulfilled, (state) => {
        state.productDetailsLoading = false;
      })
      .addCase(updateCartSize.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.updateError = action.error.message;
      })
      .addCase(fetchItem.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.item = action.payload.data;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.fetchError = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.addedMessage = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.addCartError = action.payload;
      })
      .addCase(fetchCartItem.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(fetchCartItem.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.cartExistingItem = action.payload.data;
      })
      .addCase(fetchCartItem.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.cartExistingItemError = action.payload;
      });
  },
});

export const { setSize, setSizeError } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
