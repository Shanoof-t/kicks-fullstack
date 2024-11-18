import express from "express";

import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../../controllers/cartController.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const cartRouter = express.Router();

cartRouter.use(authenticateToken);

cartRouter.route("/").post(addCartItem).get(getCartItems);
cartRouter.route("/:id").post(updateCartItemQuantity).delete(deleteCartItem);

export default cartRouter;
