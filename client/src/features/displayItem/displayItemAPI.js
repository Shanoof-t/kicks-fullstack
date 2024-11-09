import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { itemsURL } from "../../utils/API_URL";

export const fetchAllItems = createAsyncThunk(
  "allItems/fetchAllItems",
  async () => {
    // const [allitems,setAllItems]=useState([])
    // useEffect(() => {
    //     axios
    //       .get(itemsURL)
    //       .then((res) => {
    //         setAllItems(res.data);
    //       })
    //       .catch((err) => console.log(err.message));
    //   }, []);
    const res = await axios.get(itemsURL);
    return res.data;
  }
);
