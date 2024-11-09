import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerDataPost = createAsyncThunk(
  "register/registerDataPost",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/register`,
      data
    );
    return res.data;
  }
);
