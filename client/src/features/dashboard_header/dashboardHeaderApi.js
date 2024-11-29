import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const fetchAllProductsToheader = createAsyncThunk(
    "allProducts/fetchAllProductsToheader",
    async (_, { rejectWithValue }) => {
      try {
        const res = await userApiClient.get("/products");
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );