import { createSlice } from "@reduxjs/toolkit";
import { allUsersFetch } from "./allUsersAPI";
const initialState = {
  loading: false,
  data: [],
  error: "",
};
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsersFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsersFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(allUsersFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
