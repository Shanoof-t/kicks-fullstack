import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userApiClient } from "../../api/userApi";
import { adminApiClient } from "../../api/adminApi";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await userApiClient.get(`/user/${userId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlockedUser = createAsyncThunk(
  "userProfile/updateBlockedUser",
  async ({ userID, action }, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.post(`/users/${userID}`, { action });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfileBYId = createAsyncThunk(
  "userProfile/fetchUserProfileBYId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await adminApiClient.get(`/users/${userId}`);
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
