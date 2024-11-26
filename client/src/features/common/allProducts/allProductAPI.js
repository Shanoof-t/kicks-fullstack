import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userApiClient } from "../../../api/userApi";

export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get("/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
