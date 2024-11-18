import express from "express";
import {
  createProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
} from "../../controllers/productController.js";
import verifyAdmin from "../../middleware/verifyAdmin.js";
import authenticateToken from "../../middleware/authenticateToken.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(authenticateToken, verifyAdmin, createProduct);
productRouter.get("/category", getCategorieProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
