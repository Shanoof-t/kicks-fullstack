import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async (_, { rejectWithValues }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/allProducts`
      );
      return res.data;
    } catch (error) {
      return rejectWithValues(error.response.data.message);
    }
  }
);
