import { createSlice } from "@reduxjs/toolkit";
import { fetchItem, updateCartSize } from "./productDetailsAPI";

const initialState = {
  productDetailsLoading: false,
  items: {},
  sizes: [],
  size: 0,
  error: {
    sizeError: "",
    updateError: "",
    fetchError: "",
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
        state.error.fetchError = action.error.message;
      });
  },
});

export const { setSize, setSizeError } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
