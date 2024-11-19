import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
  updateProduct,
} from "../../controllers/productController.js";
import verifyAdmin from "../../middleware/verifyAdmin.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(authenticateToken, verifyAdmin, createProduct);
productRouter.get("/category", getCategorieProducts);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(authenticateToken, verifyAdmin, updateProduct)
  .delete(authenticateToken, verifyAdmin, deleteProduct);

export default productRouter;
