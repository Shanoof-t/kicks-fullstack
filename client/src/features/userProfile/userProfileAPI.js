import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userApiClient } from "../../api/userApi";

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
  async ({ userURL, id, user }) => {
    const res = await axios.patch(`${userURL}/${id}`, {
      isAllowed: !user.isAllowed,
    });
    return res.data;
  }
);
