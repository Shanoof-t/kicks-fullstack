import express from "express";
import {
  addToCart,
  deleteCartProduct,
  fetchCartProducts,
  updateCartQuantity,
} from "../controllers/cartController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/add", authenticateToken, addToCart);
router.get("/products", authenticateToken, fetchCartProducts);
router.patch("/update_quantity", authenticateToken, updateCartQuantity);
router.patch("/delete_product", authenticateToken, deleteCartProduct);
export default router;
