import express from "express";

import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../../controllers/cartController.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const router = express.Router();

router.use(authenticateToken);

router.route("/").post(addCartItem).get(getCartItems);
router.route("/:id").post(updateCartItemQuantity).delete(deleteCartItem);

export default router;
