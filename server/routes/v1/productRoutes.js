import express from "express";
import { getAllProducts, getCategorieProducts, getProductById } from "../../controllers/productController.js"

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/category",getCategorieProducts)

export default router;
