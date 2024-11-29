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
    userId: "",
  },
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearFetchvalues(state) {
      state.userFetchValues = {
        loading: false,
        message: "",
        error: "",
        role: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.pending, (state) => {
        state.userFetchValues.loading = true;
        state.userFetchValues.message = "";
        state.userFetchValues.error = "";
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.userFetchValues.loading = false;
        state.userFetchValues.role = action.payload.data.user.role;
        state.userFetchValues.userId = action.payload.data.user._id;
        state.userFetchValues.message = action.payload.message;
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.userFetchValues.error = action.payload;
      });
  },
});
export const { clearFetchvalues } = loginSlice.actions;
export default loginSlice.reducer;
