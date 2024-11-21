import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
  updateProduct,
} from "../../controllers/productController.js";

//middlewares

import verifyAdmin from "../../middleware/verifyAdmin.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import upload from "../../middleware/imageUploadMiddleware.js";


const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(authenticateToken, verifyAdmin, upload.single("image"), createProduct);

productRouter.get("/category", getCategorieProducts);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(authenticateToken, verifyAdmin, updateProduct)
  .delete(authenticateToken, verifyAdmin, deleteProduct);

export default productRouter;
