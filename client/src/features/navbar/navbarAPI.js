import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const fetchAllItem_navbar = createAsyncThunk(
  "navbar/fetchAllItem_nav",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get("/products");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
