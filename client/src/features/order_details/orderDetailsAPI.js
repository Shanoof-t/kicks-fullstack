import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const orderDetailsFetch = createAsyncThunk(
  "orderDetails/orderDetailsFetch",
  async (userId) => {
    const res = await axios.get(`http://localhost:4000/user/${userId}`);
    return res.data;
  }
);
