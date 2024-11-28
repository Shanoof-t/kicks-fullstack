import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCart,
} from "../../controllers/index.js";
import authenticateToken from "../../middleware/authenticate-token.js";
import validator from "../../middleware/validator-middleware.js";
import schema from "../../schema/index.js";
import { getCartItem } from "../../controllers/cart-controller.js";
const cartRouter = express.Router();

cartRouter.use(authenticateToken);

cartRouter
  .route("/")
  .post(validator(schema.addTocart), addCartItem)
  .get(getCartItems);

cartRouter
  .route("/:id")
  .get(getCartItem)
  .post(validator(schema.updateCart), updateCart)
  .delete(deleteCartItem);

export default cartRouter;
