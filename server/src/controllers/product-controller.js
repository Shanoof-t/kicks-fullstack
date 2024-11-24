import {
  addProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategoryAndGender,
  updateProductById,
} from "../services/productService.js";
import { asynErrorHandler } from "../utils/error-handlers.js";

export const getAllProducts = asynErrorHandler(async (req, res) => {
  const products = await fetchAllProducts();
  res.status(200).json({
    status: "success",
    message: "Successfully fetched products details.",
    data: products,
  });
});

export const getProductById = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const product = await fetchProductById(id);
  return res.status(200).json({
    status: "success",
    message: "Successfully fetched product details.",
    data: product,
  });
});

export const getCategorieProducts = asynErrorHandler(async (req, res) => {
  const queryData = req.query;
  const products = await fetchProductsByCategoryAndGender(queryData);
  return res.status(200).json({
    status: "success",
    message: "Successfully fetched products details.",
    data: products,
  });
});

// admin only

export const createProduct = asynErrorHandler(async (req, res) => {
  const productData = req.body;
  const productImage = req.file;
  const product = await addProduct(productData, productImage);
  res.status(201).json({
    status: "success",
    message: "Successfully created a product.",
    data: product,
  });
});

export const updateProduct = asynErrorHandler(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const productImage = req.file;
  await updateProductById(id, updatedData, productImage);
  res.status(201).json({
    status: "success",
    message: "Successfully updated a product.",
    data: updatedProduct,
  });
});

export const deleteProduct = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  await deleteProductById(id);
  res.status(200).json({
    status: "success",
    message: "Successfully deleted a product.",
  });
});
