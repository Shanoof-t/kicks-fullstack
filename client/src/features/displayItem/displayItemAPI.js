import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL } from "../../utils/API_URL";

export const fetchAllItems = createAsyncThunk(
  "allItems/fetchAllItems",
  async () => {
    const res = await axios.get(itemsURL);
    return res.data;
  }
);
