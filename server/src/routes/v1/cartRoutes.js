import express from "express";

import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCart,
} from "../../controllers/cart-controller.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import validator from "../../middleware/validatorMiddleware.js";
import schema from "../../schema/index.js";
const cartRouter = express.Router();

cartRouter.use(authenticateToken);

cartRouter
  .route("/")
  .post(validator(schema.addTocart), addCartItem)
  .get(getCartItems);
  
cartRouter
  .route("/:id")
  .post(validator(schema.updateCart), updateCart)
  .delete(deleteCartItem);

export default cartRouter;
