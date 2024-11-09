import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async ({ userURL, userID }) => {
    const res = await axios.get(`${userURL}/${userID}`);
    return res.data;
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
