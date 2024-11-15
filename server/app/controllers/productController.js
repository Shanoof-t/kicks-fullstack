import { CLIENT_ERROR } from "../config/errorCodes.js";
import { Product } from "../models/productModel.js";
import asynErrorHandler from "../utils/asynErrorHandler.js";
import CustomError from "../utils/CustomError.js";

export const getAllProducts = asynErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    const error = new CustomError("Not product found", 404);
    return next(error);
  } 
  res.status(200).json(products);
});

export const getProductById = asynErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    const error = new CustomError("can't find product", 404);
    return next(error);
  }
  return res.status(200).json(product);
});

export const getCategorieProducts = asynErrorHandler(async (req, res, next) => {
  const { category, gender } = req.query;
  if (!category || !gender) {
    return res
      .status(403)
      .json({ errCode: CLIENT_ERROR, message: "check quary" });
  }

  const products = await Product.aggregate([{ $match: { gender, category } }]);

  if (products.length === 0) {
    const error = new CustomError(
      "No products found for the specified category and gender",
      404
    );
    return next(error);
  }
  return res.status(200).json(products);
});
