import { createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchUserCartDetails } from "./checkoutAPI";
const initialState = {
  loading: false,
  cartDetails: {
    totalAmount: 0,
    cartProducts: [],
    cartProductCount: 0,
    error: "",
  },
  addOrderData: {
    userData: [],
    error: "",
  },
  contactDetails: {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    paymentMethod: "",
  },
};
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.contactDetails.userId = action.payload;
    },
    setProducts: (state, action) => {
      state.contactDetails.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCartDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cartDetails.cartProducts = action.payload.cart;
        state.cartDetails.cartProductCount = action.payload.cartProductCount;
        state.cartDetails.totalAmount = action.payload.totalAmount;
      })
      .addCase(fetchUserCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.addOrderData.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.addOrderData.loading = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.addOrderData.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.addOrderData.loading = false;
        state.addOrderData.error = action.error.message;
      });
  },
});
export const { setTotalPrice, setContactDetails, setUser, setProducts } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
