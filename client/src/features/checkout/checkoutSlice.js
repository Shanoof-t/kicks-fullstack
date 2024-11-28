import { createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./checkoutAPI";
const initialState = {
  loading: false,
  CreateOrdererror: "",
  contactDetails: {
    email: "",
    first_name: "",
    last_name: "",
    location: "",
    phone: "",
    payment_method: "",
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
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.CreateOrdererror = action.payload.message;
      });
  },
});
export const { setTotalPrice, setContactDetails, setUser, setProducts } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
