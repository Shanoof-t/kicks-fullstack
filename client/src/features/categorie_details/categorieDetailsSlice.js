import { createSlice } from "@reduxjs/toolkit";
import { fetchCategorieItems } from "./categorieDetailsAPI";
const initialState = {
  categrieType: "",
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
    setCategrieType: (state, action) => {
      state.categrieType = action.payload;
    },
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
        state.items.data = action.payload;
      })
      .addCase(fetchCategorieItems.rejected, (state, action) => {
        state.items.loading = false;
        state.items.error = action.error.message;
      });
  },
});
export const { setCategrieType, setItems } = categorieDetailsSlice.actions;
export default categorieDetailsSlice.reducer;
