import { authenticateUser, createUser } from "./auth-service.js";
import {
  addItemToCart,
  getCartDetails,
  removeCartItem,
  updateCartItem,
} from "./cart-services.js";
import {
  processOrderCreation,
  retrieveOrderById,
  retrieveOrders,
  retrieveUserOrders,
  updatedOrderById,
} from "./order-service.js";

import {
  addProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategoryAndGender,
  updateProductById,
} from "./product-service.js";
import { createStats } from "./stats-service.js";
import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from "./user-service.js";
export {
  authenticateUser,
  createUser,
  addItemToCart,
  getCartDetails,
  removeCartItem,
  updateCartItem,
  processOrderCreation,
  retrieveOrderById,
  retrieveOrders,
  retrieveUserOrders,
  updatedOrderById,
  addProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategoryAndGender,
  updateProductById,
  createStats,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
};
