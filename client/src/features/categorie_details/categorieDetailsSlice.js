import { createSlice } from "@reduxjs/toolkit";
import { fetchCategorieItems } from "./categorieDetailsAPI";
const initialState = {
  items: {
    loading: false,
    data: [],
    error: "",
  },
};
const categorieDetailsSlice = createSlice({
  name: "categorieDetails",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorieItems.pending, (state) => {
        state.items.loading = true;
      })
      .addCase(fetchCategorieItems.fulfilled, (state, action) => {
        state.items.loading = false;
        state.items.data = action.payload.data;
      })
      .addCase(fetchCategorieItems.rejected, (state, action) => {
        state.items.loading = false;
        state.items.error = action.payload;
      });
  },
});
export const { setCategrieType, setItems } = categorieDetailsSlice.actions;
export default categorieDetailsSlice.reducer;
