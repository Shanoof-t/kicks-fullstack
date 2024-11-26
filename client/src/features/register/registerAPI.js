import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const registerDataPost = createAsyncThunk(
  "register/registerDataPost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await userApiClient.post("/auth/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
