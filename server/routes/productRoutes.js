import express from "express";
import { getAllProduct, getProduct } from "../controllers/productController.js";
const router = express.Router();

router.get("/allproducts", getAllProduct);
router.get("/:id", getProduct);
export default router;
