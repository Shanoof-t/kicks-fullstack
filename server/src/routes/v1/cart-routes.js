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
