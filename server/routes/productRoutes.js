import express from "express";
import { getAllProduct, getCategorieProduct, getProduct } from "../controllers/productController.js";
const router = express.Router();

router.get("/allproducts", getAllProduct);
router.get("/:id", getProduct);
router.get("/",getCategorieProduct)
export default router;
