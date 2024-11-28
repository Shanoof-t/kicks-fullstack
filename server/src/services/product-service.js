import { Product } from "../models/product-model.js";
import CustomError from "../utils/custom-error.js";

export const fetchAllProducts = async () => {
  const products = await Product.find();
  return products;
};

export const fetchProductById = async (id) => {
  const product = await Product.findOne({ _id: id });
  if (!product) throw new CustomError("can't find product", 404);
  return product;
};

export const fetchProductsByCategoryAndGender = async (queryData) => {
  const { category, gender } = queryData;

  if (!category && !gender) throw new CustomError("Invalid query", 400);

  let products = [];
  if (category && gender) {
    products = await Product.aggregate([{ $match: { gender, category } }]);
  } else if (category) {
    products = await Product.aggregate([{ $match: { category } }]);
  }

  return products;
};

// admin only

export const addProduct = async (productData, productImage) => {
  const {
    name,
    brand,
    gender,
    category,
    price,
    quantity,
    description,
    available_sizes,
  } = productData;

  const product = await Product.create({
    name,
    brand,
    gender,
    category,
    price: Number(price),
    items_left: Number(quantity),
    image_url: productImage.path,
    description,
    available_sizes: available_sizes.split(","),
  });
  return product;
};

export const updateProductById = async (id, updatedData, productImage) => {
  const {
    name,
    brand,
    gender,
    category,
    price,
    quantity,
    description,
    available_sizes,
  } = updatedData;

  const updatedProduct = {
    name,
    brand,
    gender,
    category,
    price: Number(price),
    items_left: Number(quantity),
    image_url: productImage.path,
    description,
    available_sizes: available_sizes.split(","),
  };
  const updatedDetails = await Product.updateOne({ _id: id }, updatedProduct);
  if (updatedDetails.matchedCount === 0)
    throw new CustomError(
      `The product is not existing with this id ${id}!`,
      404
    );
};

export const deleteProductById = async (id) => {
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product)
    throw new CustomError(
      `The product is not existing with this id ${id}!`,
      404
    );
};
