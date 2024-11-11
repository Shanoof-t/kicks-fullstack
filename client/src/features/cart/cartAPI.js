import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/cart/products`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.payload);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ id, newQuantity }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/cart/update_quantity`,
        { id, newQuantity },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.payload);
    }
  }
);
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ user, updatedCart }) => {
    const res = await axios.patch(`${userURL}/${user}`, { cart: updatedCart });
    return res.data;
  }
);
