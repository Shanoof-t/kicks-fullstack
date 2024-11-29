import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../../api/userApi";
import { adminApiClient } from "../../../api/adminApi";

export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get("/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchcategoryProducts = createAsyncThunk(
  "products/fetchproducts",
  async ({ productCategory }, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get(
        `/products/category?category=${productCategory}`
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
