import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL } from "../../utils/API_URL";

export const fetchAllItem_navbar = createAsyncThunk("navbar/fetchAllItem_nav",async()=>{
    const res = await axios.get(itemsURL)
    return res.data
})