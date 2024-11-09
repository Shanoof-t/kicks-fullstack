import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderUser = createAsyncThunk(
  "order/fetchOrderUser",
  async ({ userURL, userId }) => {
    const res = await axios.get(`${userURL}/${userId}`);
    return res.data;
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
