import { Product } from "../models/productModel.js";
import CustomError from "../utils/CustomError.js";

export const fetchAllProducts = async () => {
  const products = await Product.find();
  if (!products) throw new CustomError("Not product found", 404);
  return products;
};

export const fetchProductById = async (id) => {
  const product = await Product.findOne({ _id: id });
  if (!product) throw new CustomError("can't find product", 404);
  return product;
};

export const fetchProductsByCategoryAndGender = async (queryData) => {
  const { category, gender } = queryData;

  if (!category || !gender) throw new CustomError("check quary", 403);

    const products = await Product.aggregate([{ $match: { gender, category } }]);

  if (products.length === 0)
    throw new CustomError(
      "No products found for the specified category and gender",
      404
    );
  return products;
};
