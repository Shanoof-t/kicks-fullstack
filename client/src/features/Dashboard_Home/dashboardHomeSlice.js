import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderDetails: {
    totalOrders: 0,
  },
};
const dashboardHomeSlice = createSlice({
  name: "dashboardHome",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});
export const { setOrderDetails } = dashboardHomeSlice.actions;
export default dashboardHomeSlice.reducer;
