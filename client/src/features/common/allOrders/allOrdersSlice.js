import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrder } from "./allOrdersAPI";
const initialState = {
  loading: false,
  data: [],
  error: "",
};
const allOrderSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setOrders } = allOrderSlice.actions;
export default allOrderSlice.reducer;
