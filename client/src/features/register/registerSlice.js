import { createSlice } from "@reduxjs/toolkit";
import { registerDataPost } from "./registerAPI";
const initialState = {
  dataPostValue: {
    loading: false,
    error: "",
  },
  formValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  },
};
const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerDataPost.pending, (state) => {
        state.dataPostValue.loading = true;
      })
      .addCase(registerDataPost.fulfilled, (state) => {
        state.dataPostValue.loading = false;
      })
      .addCase(registerDataPost.rejected, (state, action) => {
        state.dataPostValue.loading = false;
        state.dataPostValue.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
