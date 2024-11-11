import { createSlice } from "@reduxjs/toolkit";
import { userFetch } from "./loginAPI";
const initialState = {
  formValues: {
    email: "",
    password: "",
  },
  userFetchValues: {
    loading: false,
    message: "",
    error: "",
    role: "",
  },
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.pending, (state) => {
        state.userFetchValues.loading = true;
        state.userFetchValues.message = "";
        state.userFetchValues.error = "";
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.userFetchValues.loading = false;
        state.userFetchValues.role = action.payload.role;
        state.userFetchValues.message = action.payload.message;
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.userFetchValues.error = action.payload;
      });
  },
});
export default loginSlice.reducer;
