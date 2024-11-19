import {
  addProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategoryAndGender,
} from "../services/productService.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

export const getAllProducts = asynErrorHandler(async (req, res) => {
  const products = await fetchAllProducts();
  res.status(200).json(products);
});

export const getProductById = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const product = await fetchProductById(id);
  return res.status(200).json(product);
});

export const getCategorieProducts = asynErrorHandler(async (req, res) => {
  const queryData = req.query;
  const products = await fetchProductsByCategoryAndGender(queryData);
  return res.status(200).json(products);
});

export const createProduct = asynErrorHandler(async (req, res) => {
  const productData = req.body;
  const product = await addProduct(productData);
  res.status(201).json({
    status: "success",
    message: "Product added successfully",
    data: product,
  });
});

export const deleteProduct = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const product = await deleteProductById(id);
  res
    .status(200)
    .json({
      status: "success",
      message: "Product deleted successfully",
      data: product,
    });
});

export const updateProduct = asynErrorHandler(async(req,res)=>{
  
})
