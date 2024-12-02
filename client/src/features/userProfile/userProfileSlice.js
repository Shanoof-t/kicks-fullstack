import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  fetchUserProfileBYId,
  updateBlockedUser,
} from "./userProfileAPI";
const initialState = {
  user: null,
  userProfile: {
    loading: false,
    data: {},
    error: "",
  },
};
const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.userProfile.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload.message;
      })
      .addCase(fetchUserProfileBYId.pending, (state) => {
        state.userProfile.loading = true;
      })
      .addCase(fetchUserProfileBYId.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.data = action.payload;
      })
      .addCase(fetchUserProfileBYId.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload.message;
      })
      .addCase(updateBlockedUser.pending, (state) => {
        state.userProfile.loading = true;
      })
      .addCase(updateBlockedUser.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.data = action.payload;
      })
      .addCase(updateBlockedUser.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.error.message;
      });
  },
});
export const { setUserProfileUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;
