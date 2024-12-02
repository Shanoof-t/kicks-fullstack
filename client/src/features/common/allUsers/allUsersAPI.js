import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApiClient } from "../../../api/adminApi";

export const allUsersFetch = createAsyncThunk(
  "allUsers/allUsersFetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get("/users");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
