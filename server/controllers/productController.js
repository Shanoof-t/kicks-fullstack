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
    res
      .status(500)
      .json({
        errCode: "SERVER_ERROR",
        message: "Something went wrong, please try again later",
      });
  }
};
