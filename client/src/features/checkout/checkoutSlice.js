import { createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchUser } from "./checkoutAPI";
const initialState = {
  fetchUserData: {
    loading: false,
    userData: [],
    error: "",
  },
  addOrderData: {
    loading: false,
    userData: [],
    error: "",
  },
  contactDetails: {
    userId: "",
    orderId: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    paymentMethod: "",
    status: true,
    date: "",
    amount: 0,
    product: [],
  },
};
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setTotalPrice: (state, action) => {
      const total = action.payload.reduce((acc, val) => {
        return acc + val.price * val.quantity;
      }, 0);
      state.contactDetails.amount = total;
    },
    setUser: (state, action) => {
      state.contactDetails.userId = action.payload;
    },
    setProducts: (state, action) => {
      state.contactDetails.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchUserData.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchUserData.loading = false;
        state.fetchUserData.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchUserData.loading = false;
        state.fetchUserData.error = action.error.message;
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
