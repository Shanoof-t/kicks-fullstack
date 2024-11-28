import { userLogin, userRegister } from "./auth-controller.js";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCart,
} from "./cart-controller.js";
import {
  createOrder,
  getOrder,
  listOrders,
  listUserOrders,
  updateOrder,
} from "./order-controller.js";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
  updateProduct,
} from "./product-controller.js";
import { getStats } from "./stats-controller.js";
import { getUser, listUsers, updateUser } from "./user-controller.js";

export {
  userLogin,
  userRegister,
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCart,
  createOrder,
  getOrder,
  listOrders,
  listUserOrders,
  updateOrder,
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
  updateProduct,
  getStats,
  getUser,
  listUsers,
  updateUser,
};
