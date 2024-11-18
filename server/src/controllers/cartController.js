import {
  addItemToCart,
  getCartDetails,
  removeCartItem,
  updateCartItem,
} from "../services/cartServices.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

export const addCartItem = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const item = req.body;
  const response = await addItemToCart(user, item);
  return res.json(response);
});

export const getCartItems = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const products = await getCartDetails(user);
  return res.status(200).json(products);
});

export const updateCart = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const { action } = req.body;
  const { id } = req.params;
  const updatedCart = await updateCartItem(user, id, action);
  return res.status(200).json({ message: "Quantity updated", updatedCart });
});

export const deleteCartItem = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  await removeCartItem(user, id);
  return res.status(204).json({ message: "Product deleted from cart" });
});
