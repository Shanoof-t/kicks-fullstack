import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../utils/API_URL";

export const fetchUser = createAsyncThunk(
  "checkout/fetchUser",
  async (user) => {
    const res = await axios.get(`${userURL}/${user}`);
    return res.data;
  }
);

export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async ({ user, values, userDetails }) => {
    const existingOrders = userDetails.order || [];
    const updatedOrder = [...existingOrders, values];
    const res = await axios.patch(`${userURL}/${user}`, {
      order: updatedOrder,
      cart: [],
    });
    return res.data;
  }
);
