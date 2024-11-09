import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "updateProduct/fetchProduct",
  async ({ itemsURL, itemId }) => {
    const res = await axios.get(`${itemsURL}/${itemId}`);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct/updateProduct",
  async ({ itemsURL, itemId, itemData }) => {
    const res = await axios.put(`${itemsURL}/${itemId}`, itemData);
    return res.data;
  }
);
