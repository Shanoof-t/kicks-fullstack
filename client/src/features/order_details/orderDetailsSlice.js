import { createSlice } from "@reduxjs/toolkit";
import { orderDetailsFetch } from "./orderDetailsAPI";
const initialState = {
  orderData: {
    loading: false,
    data: [],
    error: "",
  },
};
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(orderDetailsFetch.pending, (state) => {
        state.orderData.loading = true;
      })
      .addCase(orderDetailsFetch.fulfilled, (state, action) => {
        state.orderData.loading = false;
        state.orderData.data = action.payload;
      })
      .addCase(orderDetailsFetch.rejected, (state, action) => {
        state.orderData.loading = false;
        state.orderData.error = action.payload.message;
      });
  },
});
export default orderDetailsSlice.reducer;
