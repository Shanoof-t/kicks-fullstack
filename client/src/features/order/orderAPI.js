import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { adminApiClient } from "../../api/adminApi";

export const fetchOrderUser = createAsyncThunk(
  "order/fetchOrderUser",
  async ({ orderID }, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get(`/orders/${orderID}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateUserOrder = createAsyncThunk(
  "order/UpdateUserOrder",
  async ({ userURL, userId, updatedData }) => {
    const res = await axios.patch(`${userURL}/${userId}`, {
      order: updatedData,
    });
    return res.data;
  }
);
