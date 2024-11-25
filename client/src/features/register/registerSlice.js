import { createSlice } from "@reduxjs/toolkit";
import { registerDataPost } from "./registerAPI";
const initialState = {
  dataPostValue: {
    loading: false,
    error: "",
  },
  formValues: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
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
        state.dataPostValue.error = "";
      })
      .addCase(registerDataPost.fulfilled, (state, action) => {
        state.dataPostValue.loading = false;
      })
      .addCase(registerDataPost.rejected, (state, action) => {
        state.dataPostValue.loading = false;
        state.dataPostValue.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
