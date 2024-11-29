import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const orderDetailsFetch = createAsyncThunk(
  "orderDetails/orderDetailsFetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get("/orders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const repayment = createAsyncThunk(
//   "orderDetails/repayment",
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await userApiClient.get(`/orders/${id}/repay`);
//       return res.data;
//     } catch (error) {
//       rejectWithValue(error.response.data);
//     }
//   }
// );
