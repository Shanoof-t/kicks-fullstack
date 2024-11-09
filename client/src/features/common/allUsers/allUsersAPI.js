import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../../utils/API_URL";

export const allUsersFetch = createAsyncThunk(
  "allUsers/allUsersFetch",
  async () => {
    const res = await axios.get(userURL);
    return res.data.filter((value) => !value.isAdmin);
  }
);
