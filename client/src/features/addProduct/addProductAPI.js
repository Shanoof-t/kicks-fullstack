import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApiClient } from "../../api/adminApi";

export const addProduct = createAsyncThunk(
  "addProduct/addProduct",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.post("/products", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
