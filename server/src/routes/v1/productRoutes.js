import express from "express";
import {
  createProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
} from "../../controllers/productController.js";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createProduct)
productRouter.get("/category", getCategorieProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
