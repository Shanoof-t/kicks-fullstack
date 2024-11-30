import { createSlice } from "@reduxjs/toolkit";
import { addProduct } from "./addProductAPI";
const initialState = {
  imageUrl: null,
  loading: false,
};
const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
      }),
});
export const { setImageUrl } = addProductSlice.actions;
export default addProductSlice.reducer;
