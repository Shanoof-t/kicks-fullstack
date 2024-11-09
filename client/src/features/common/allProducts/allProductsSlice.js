import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./allProductAPI";
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
        state.items.loading = false;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.items.error = action.error.message;
      });
  },
});

export default allProductSlice.reducer;
