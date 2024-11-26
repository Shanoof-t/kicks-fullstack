import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const fetchCategorieItems = createAsyncThunk(
  "categorie/fetchCategorieItems",
  async ({ categrieType, categorieGender }, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get(
        `/products/category?category=${categrieType}&gender=${categorieGender}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
