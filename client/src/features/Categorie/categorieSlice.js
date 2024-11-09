import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  load: true,
  categorieGender: "",
};
const categorieSlice = createSlice({
  name: "categorie",
  initialState,
  reducers: {
    setLoad: (state, action) => {
      state.load = action.payload;
    },
    setCategorieGender: (state, action) => {
      state.categorieGender = action.payload;
    },
  },
});
export const { setLoad, setCategorieGender } = categorieSlice.actions;
export default categorieSlice.reducer;
