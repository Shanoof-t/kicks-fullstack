import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import asynErrorHandler from "../utils/asynErrorHandler.js";
import CustomError from "../utils/CustomError.js";

export const addToCart = asynErrorHandler(async (req, res, next) => {
  const { sub } = req.user;
  const item = req.body;
  // if (!item) {
  //   const error = new CustomError("Item is required", 400);
  //   next(error);
  // }
  if (!item)
    return res
      .status(400)
      .json({ errCode: CLIENT_ERROR, message: "Item is required" });

  const updatedCart = await User.updateOne(
    {
      _id: new mongoose.Types.ObjectId(sub),
      "cart._id": item._id,
    },
    { $inc: { "cart.$.quantity": item.quantity } }
  );

  if (updatedCart.modifiedCount === 0) {
    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(sub) },
      { $push: { cart: item } }
    );

    if (result.modifiedCount === 0) {
      const error = new CustomError("user cart update has problem", 404);
      return next(error);
    }
  }

  return res.json({ message: "success" });
});

export const fetchCartProducts = asynErrorHandler(async (req, res, next) => {
  const { sub } = req.user;
  const products = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(sub) } },
    { $addFields: { cart: { $ifNull: ["$cart", []] } } },
    { $unwind: { path: "$cart", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        totalPrice: { $multiply: ["$cart.price", "$cart.quantity"] },
      },
    },
    {
      $group: {
        _id: "$_id",
        cart: { $push: "$cart" },
        totalAmount: { $sum: "$totalPrice" },
        count: {
          $sum: { $cond: [{ $eq: [{ $type: "$cart" }, "object"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        cart: 1,
        totalAmount: { $ifNull: ["$totalAmount", 0] },
        count: 1,
        _id: 0,
      },
    },
  ]);

  if (products.length === 0) {
    const error = new CustomError(`Can't find the cart items`, 404);
    return next(error);
  }
  return res.status(200).json(products[0]);
});

export const updateCartQuantity = asynErrorHandler(async (req, res, next) => {
  const { sub } = req.user;
  const { newQuantity } = req.body;
  const id = req.params;
  if (!req.body)
    return res.status(400).json({
      errCode: "CLIENT_ERROR",
      message: "Product id and new quantity is required",
    });

  const data = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(sub),
    },
    { $set: { "cart.$[elem].quantity": newQuantity } },
    { new: true, arrayFilters: [{ "elem._id": id }] }
  );

  if (!data) {
    const error = new CustomError("Cart item not found ", 404);
    return next(error);
  }

  return res.status(200).json({ message: "Quantity updated" });
});

export const deleteCartProduct = asynErrorHandler(async (req, res, next) => {
  const { id } = req.body;
  const { sub } = req.user;

  if (!id)
    return res.status(400).json({
      errCode: "CLIENT_ERROR",
      message: "Product id is required",
    });

  const data = await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(sub) },
    { $pull: { cart: { _id: id } } }
  );

  if (!data) {
    const error = new CustomError("Can't find cart product", 404);
    return next(error);
  }

  return res.status(204).json({ message: "Product deleted from cart" });
});
