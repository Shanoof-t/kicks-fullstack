import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "addProduct/addProduct",
  async ({ itemsURL, itemData }) => {
    const res = await axios.post(itemsURL, itemData);
    return res.data;
  }
);
