import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsToheader } from "./dashboardHeaderApi";

const initialState = {
  items: {
    loading: false,
    data: [],
    error: "",
  },
};

const dashBoardHeaderSlice = createSlice({
  name: "dashBoardHeader",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsToheader.pending, (state) => {
        state.items.loading = true;
        state.items.data = [];
        state.items.error = "";
      })
      .addCase(fetchAllProductsToheader.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload.data;
      })
      .addCase(fetchAllProductsToheader.rejected, (state, action) => {
        state.items.loading = false;
        state.items.error = action.payload;
      });
  },
});

export default dashBoardHeaderSlice.reducer;
