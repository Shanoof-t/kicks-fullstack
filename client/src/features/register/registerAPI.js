import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_API } from "../../api/userApi";

export const registerDataPost = createAsyncThunk(
  "register/registerDataPost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await USER_API.post("/auth/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
