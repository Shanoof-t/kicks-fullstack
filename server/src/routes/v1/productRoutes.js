import express from "express";
import {
  getAllProducts,
  getCategorieProducts,
  getProductById,
} from "../../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/category", getCategorieProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
