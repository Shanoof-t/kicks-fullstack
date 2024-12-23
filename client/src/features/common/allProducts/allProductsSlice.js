import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  fetchAllProducts,
  fetchcategoryProducts,
} from "./allProductAPI";

const initialState = {
  items: {
    loading: false,
    data: [],
    error: "",
  },
};

const allProductSlice = createSlice({
  name: "allProduct",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.items.loading = true;
        state.items.data = [];
        state.items.error = "";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.items.loading = false;
        state.items.error = action.payload;
      })
      .addCase(fetchcategoryProducts.pending, (state) => {
        state.items.loading = true;
        state.items.data = [];
        state.items.error = "";
      })
      .addCase(fetchcategoryProducts.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload;
      })
      .addCase(fetchcategoryProducts.rejected, (state, action) => {
        state.items.loading = true;
        state.items.error = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.items.loading = true;
        state.items.data = [];
        state.items.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.items.loading = true;
        state.items.error = action.payload.message;
      });
  },
});

export default allProductSlice.reducer;
