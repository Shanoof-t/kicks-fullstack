import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get("/cart");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ id, action }, { rejectWithValue }) => {
    try {
      const res = await userApiClient.post(`/cart/${id}`, { action });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await userApiClient.delete(`/cart/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.payload);
    }
  }
);
