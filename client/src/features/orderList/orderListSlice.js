import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderList: [],
};
const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
});
export const { setOrderList } = orderListSlice.actions;
export default orderListSlice.reducer;
