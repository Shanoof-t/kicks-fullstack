import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (id) => {
    const res = await axios.get(`${userURL}/${id}`);
    return res.data.cart;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ user, updatedCart }) => {
    const res = await axios.patch(`${userURL}/${user}`, { cart: updatedCart });
    return res.data;
  }
);
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ user, updatedCart }) => {
    const res = await axios.patch(`${userURL}/${user}`, { cart: updatedCart });
    return res.data;
  }
);
