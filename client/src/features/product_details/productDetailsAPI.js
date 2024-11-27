import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL, userURL } from "../../utils/API_URL";
import { userApiClient } from "../../api/userApi";

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
      const res = await userApiClient.get(`/products/${productId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCartItem = createAsyncThunk(
  "productdetails/fetchCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get(`/cart/${productId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "productdetails/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const res = await userApiClient.post("/cart", item);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
