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
        state.items.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.items.loading = false;
        state.items.error = action.payload;
      });
  },
});

export default allProductSlice.reducer;
