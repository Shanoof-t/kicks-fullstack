import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApiClient } from "../../../api/adminApi";

export const fetchAllOrder = createAsyncThunk(
  "allOrder/fetchAllOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get("/orders/list");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
