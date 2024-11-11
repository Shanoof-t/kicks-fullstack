import { Product } from "../models/productModel.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(401).json({ message: "something wrong happened" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      errCode: "SERVER_ERROR",
      message: "Something went wrong, please try again later",
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product)
      return res.status(401).json({ message: "can't find product" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      errCode: "SERVER_ERROR",
      message: "Something went wrong, please try again later",
    });
  }
};

export const getCategorieProduct = async (req, res) => {
  const { category, gender } = req.query;
  if (!category && gender) {
    res.status(403).json({ errCode: "QUERY_ERROR", message: "check quary" });
  }
  try {
    const products = await Product.aggregate([
      { $match: { gender, category } },
    ]);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        errCode: "SERVER_ERROR",
        message: "Something went wrong, please try again later",
      });
  }
};
