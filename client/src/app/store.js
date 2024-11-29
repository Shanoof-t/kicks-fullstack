import { configureStore } from "@reduxjs/toolkit";
import cart from "../features/cart/cartSlice";
import login from "../features/login/loginSlice";
import home from "../features/home/homeSlice";
import productDetails from "../features/product_details/productDetailsSlice";
import register from "../features/register/registerSlice";
import navbar from "../features/navbar/navbarSlice";
import checkout from "../features/checkout/checkoutSlice";
// import displayItem from "../features/displayItem/displayItemSlice";
import categorie from "../features/Categorie/categorieSlice";
import categorieDetails from "../features/categorie_details/categorieDetailsSlice";
import allProducts from "../features/common/allProducts/allProductsSlice";
import orderDetails from "../features/order_details/orderDetailsSlice";
import allOrders from "../features/common/allOrders/allOrdersSlice";
import allUsers from "../features/common/allUsers/allUsersSlice";
import dashboardHome from "../features/Dashboard_Home/dashboardHomeSlice";
import order from "../features/order/orderSlice";
import orderList from "../features/orderList/orderListSlice";
import addProduct from "../features/addProduct/addProductSlice";
import updateProduct from "../features/updateProduct/updateProductSlice";
import userProfile from "../features/userProfile/userProfileSlice";
const store = configureStore({
  reducer: {
    login,
    register,
    productDetails,
    cart,
    home,
    navbar,
    checkout,
    // displayItem,
    categorie,
    categorieDetails,
    allProducts,
    orderDetails,
    allOrders,
    allUsers,
    dashboardHome,
    order,
    orderList,
    addProduct,
    updateProduct,
    userProfile,
  },
});

export default store;
