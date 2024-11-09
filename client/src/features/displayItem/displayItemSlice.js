import { createSlice } from "@reduxjs/toolkit";
import { fetchAllItems } from "./displayItemAPI";
const initialState = {
  loading: false,
  data: [],
  error: "",
};
const displayItem = createSlice({
  name: "displayItem",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default displayItem.reducer;
