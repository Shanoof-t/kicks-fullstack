import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../../utils/API_URL";

export const fetchAllOrder = createAsyncThunk(
  "allOrder/fetchAllOrder",
  async () => {
    const res = await axios.get(userURL);
    return res.data
      .filter((value) => !value.isAdmin && value.order)
      .flatMap((value) => value.order);
  }
);
// import React, { createContext, useEffect, useState } from "react";
// import { userURL } from "../utils/API_URL";
// import axios from "axios";
// export const UserContext = createContext();
// function UserProvider({ children }) {
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     // axios
//     //   .get(userURL)
//     //   .then((res) => {
//     //     const allOrders = res.data
//     //       .filter((value) => !value.isAdmin && value.order)
//     //       .flatMap((value) => value.order);
//     //     setOrders(allOrders);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err.message);
//     //   });
//   }, []);

//   useEffect(() => {
//     // axios.get(userURL).then((res) => {
//     //   const allUsers = res.data.filter((value) => !value.isAdmin);
//     //   setUsers(allUsers);
//     // });
//   }, []);
//   return (
//     <UserContext.Provider value={{ orders, users, setUsers, setOrders }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export default UserProvider;
