import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct, updateProduct } from "./updateProductAPI";
const initialState = {
  imageUrl: null,
  fetchProduct: {
    loading: false,
    data: [],
    error: "",
  },
  updateProduct: {
    loading: false,
    data: [],
    error: "",
  },
  initialDatas: {
    name: "",
    description: "",
    category: "",
    brand: "",
    gender: "",
    items_left: "",
    available_sizes: "",
    price: "",
    offer_price: "",
    imageURL: "",
  },
};
const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    updateImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setInitialInformation: (state, action) => {
      state.initialDatas.available_sizes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.fetchProduct.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.fetchProduct.loading = false;
        state.fetchProduct.data = action.payload;
        state.initialDatas = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.fetchProduct.loading = false;
        state.fetchProduct.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateProduct.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProduct.loading = false;
        state.updateProduct.data = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProduct.loading = false;
        state.updateProduct.error = action.error.message;
      });
  },
});
export const { updateImageUrl, setInitialInformation } =
  updateProductSlice.actions;
export default updateProductSlice.reducer;
