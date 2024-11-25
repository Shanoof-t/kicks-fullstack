import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserCartDetails = createAsyncThunk(
  "checkout/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/checkout/details`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.payload);
    }
  }
);

export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async ({ values }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders/create`,
        { values },
        { withCredentials: true }
      );
      console.log("order>>>>", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
