import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageUrl: null,
};
const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});
export const { setImageUrl } = addProductSlice.actions;
export default addProductSlice.reducer;
