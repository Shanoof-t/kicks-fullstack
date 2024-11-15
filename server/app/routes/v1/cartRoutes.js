import express from "express";

import {
  addToCart,
  deleteCartProduct,
  fetchCartProducts,
  updateCartQuantity,
} from "../../controllers/cartController.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const router = express.Router();

router.use(authenticateToken);

router.route("/").post(addToCart).get(fetchCartProducts);
router.route("/:id").patch(updateCartQuantity).delete(deleteCartProduct);

export default router;
