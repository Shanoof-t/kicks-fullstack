import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userFetch = createAsyncThunk(
  "login/userFetch",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_USER_URL}/login`,
        loginData,
        { withCredentials: true }
      );
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message);
    }
  }
);
