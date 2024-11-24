import {
  addItemToCart,
  getCartDetails,
  removeCartItem,
  updateCartItem,
} from "../services/index.js";
import { asynErrorHandler } from "../utils/error-handlers.js";

export const addCartItem = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const item = req.body;
  await addItemToCart(user, item);
  return res.json({
    state: "success",
    message: "Successfully added product to the cart.",
  });
});

export const getCartItems = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const products = await getCartDetails(user);
  return res.status(200).json({
    status: "success",
    message: "Successfully fetched cart products.",
    data: products,
  });
});

export const updateCart = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const { action } = req.body;
  const { id } = req.params;
  const updatedCart = await updateCartItem(user, id, action);
  return res.status(200).json({
    status: "success",
    message: "Successfully updated cart quantity",
    data: updatedCart,
  });
});

export const deleteCartItem = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  await removeCartItem(user, id);
  return res
    .status(204)
    .json({
      status: "success",
      message: "Successfully deleted product from cart",
    });
});
