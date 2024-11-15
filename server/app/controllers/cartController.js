import asynErrorHandler from "../utils/asynErrorHandler.js";
import {
  addItemToCart,
  getCartDetails,
  removeCartItem,
  updateCartItem,
} from "../services/cartServices.js";

export const addCartItem = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const item = req.body;
  await addItemToCart(user, item);
  return res.json({ message: "success" });
});

export const getCartItems = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const products = await getCartDetails(user);
  return res.status(200).json(products);
});

export const updateCartItemQuantity = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const body = req.body;
  const { id } = req.params;

  await updateCartItem(user, id, body);

  return res.status(200).json({ message: "Quantity updated" });
});

export const deleteCartItem = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  await removeCartItem(user, id);
  return res.status(204).json({ message: "Product deleted from cart" });
});
