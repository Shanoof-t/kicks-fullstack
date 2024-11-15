import express from "express";
import {
  getAllProducts,
  getCategorieProducts,
  getProductById,
} from "../../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/category", getCategorieProducts);
router.get("/:id", getProductById);

export default router;
