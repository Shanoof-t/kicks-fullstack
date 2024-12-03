import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApiClient } from "../../api/adminApi";

export const fetchStats = createAsyncThunk(
  "dashboardHome/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get("/stats");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
