import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderUser, UpdateUserOrder } from "./orderAPI";
const initialState = {
  userData: {
    loading: false,
    data: [],
    error: "",
  },
};
const orderSlice = createSlice({
  name: "orderAdmin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderUser.pending, (state) => {
        state.userData.loading = true;
      })
      .addCase(fetchOrderUser.fulfilled, (state, action) => {
        state.userData.loading = false;
        state.userData.data = action.payload;
      })
      .addCase(fetchOrderUser.rejected, (state, action) => {
        state.userData.loading = false;
        state.userData.error = action.error.message;
      })
      .addCase(UpdateUserOrder.pending, (state) => {
        state.userData.loading = true;
      })
      .addCase(UpdateUserOrder.fulfilled, (state, action) => {
        state.userData.loading = false;
        // state.userData.data = action.payload;
      })
      .addCase(UpdateUserOrder.rejected, (state, action) => {
        state.userData.loading = false;
        state.userData.error = action.error.message;
      });
  },
});
export default orderSlice.reducer;
