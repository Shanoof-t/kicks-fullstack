import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiClient } from "../../api/userApi";

export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async ({ values }, { rejectWithValue }) => {
    try {
      const res = await userApiClient.post("/orders", values);
      return res.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifypayment = createAsyncThunk(
  "checkout/verifypayment",
  async ({ response, order }, { rejectWithValue }) => {
    try {
      console.log("this is from verifypayment", response, order);
      const res = await userApiClient.post("/orders/verify-payment", {
        response,
        order,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
