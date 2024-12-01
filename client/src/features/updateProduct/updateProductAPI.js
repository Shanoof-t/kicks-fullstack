import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { adminApiClient } from "../../api/adminApi";

export const fetchProduct = createAsyncThunk(
  "updateProduct/fetchProduct",
  async ({ itemId }, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get(`/products/${itemId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct/updateProduct",
  async ({ itemId, formData }, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.put(`/products/${itemId}`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
