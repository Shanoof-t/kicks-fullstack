import { createSlice } from "@reduxjs/toolkit";
import { fetchStats } from "./dashboardHomeAPI";
const initialState = {
  orderDetails: {
    totalOrders: 0,
  },
  loading: false,
  error: "",
  totalRevenue: 0,
  totalProductPurchased: 0,
};
const dashboardHomeSlice = createSlice({
  name: "dashboardHome",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.totalProductPurchased = action.payload.data.totalProductPurchased;
        state.totalRevenue = action.payload.data.totalRevenue;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { setOrderDetails } = dashboardHomeSlice.actions;
export default dashboardHomeSlice.reducer;
