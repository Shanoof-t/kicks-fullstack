import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL } from "../../utils/API_URL";

export const fetchCategorieItems = createAsyncThunk(
  "categorie/fetchCategorieItems",
  async ({ categrieType, categorieGender }) => {
    const res = await axios.get(
      `${itemsURL}?category=${categrieType}&gender=${categorieGender}`
    );
    return res.data;
  }
);
