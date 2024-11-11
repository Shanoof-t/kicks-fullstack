import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL, userURL } from "../../utils/API_URL";

export const updateCartSize = createAsyncThunk(
  "productdetails/updateCartSize",
  async ({ user, cartItems, cartData }) => {
    const existingCart = cartItems || [];
    const updatedCart = [...existingCart, ...cartData];
    const res = axios.patch(`${userURL}/${user}`, {
      cart: updatedCart,
    });
    return (await res).data;
  }
);

export const fetchItem = createAsyncThunk(
  "productdetails/fetchItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/${productId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "productdetails/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/add`,
        { item },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
