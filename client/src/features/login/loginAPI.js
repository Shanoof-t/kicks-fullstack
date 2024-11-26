import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userApiClient } from "../../api/userApi";

export const userFetch = createAsyncThunk(
  "login/userFetch",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await userApiClient.post("/auth/login", loginData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
