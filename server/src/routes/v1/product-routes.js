import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategorieProducts,
  getProductById,
  updateProduct,
} from "../../controllers/index.js";

//middlewares

import verifyAdmin from "../../middleware/verify-admin-middleware.js";
import authenticateToken from "../../middleware/authenticate-token.js";
import upload from "../../middleware/image-upload-middleware.js";
import validator from "../../middleware/validator-middleware.js";
import schema from "../../schema/index.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(
    authenticateToken,
    verifyAdmin,
    upload.single("product-image"),
    validator(schema.createProduct),
    createProduct
  );

productRouter.get("/category", getCategorieProducts);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(
    authenticateToken,
    verifyAdmin,
    upload.single("product-image"),
    validator(schema.createProduct),
    updateProduct
  )
  .delete(authenticateToken, verifyAdmin, deleteProduct);

export default productRouter;
