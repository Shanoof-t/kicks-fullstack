import { createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItem, updateCartSize } from "./productDetailsAPI";

const initialState = {
  productDetailsLoading: false,
  addedMessage: "",
  items: {},
  sizes: [],
  size: null,
  error: {
    sizeError: "",
    updateError: "",
    fetchError: "",
    addCartError: "",
  },
};
const productDetailsSlice = createSlice({
  name: "product-details",
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setSizeError: (state, action) => {
      state.error.sizeError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartSize.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(updateCartSize.fulfilled, (state) => {
        state.productDetailsLoading = false;
      })
      .addCase(updateCartSize.rejected, (state, action) => {
        state.error.updateError = action.error.message;
      })
      .addCase(fetchItem.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.items = action.payload;
        state.sizes = action.payload.available_sizes;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.error.fetchError = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.productDetailsLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addedMessage = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error.addCartError = action.payload;
      });
  },
});

export const { setSize, setSizeError } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
