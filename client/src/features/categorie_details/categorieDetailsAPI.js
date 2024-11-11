import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL } from "../../utils/API_URL";

export const fetchCategorieItems = createAsyncThunk(
  "categorie/fetchCategorieItems",
  async ({ categrieType, categorieGender }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}?category=${categrieType}&gender=${categorieGender}`
      );
      return res.data;
    } catch (error) {
      console.log("error>>>>>", error);
      return rejectWithValue(error.response.data.payload);
    }
  }
);
