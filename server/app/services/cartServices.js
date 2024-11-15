import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";

export const addItemToCart = async (user, item) => {
  const { sub } = user;

  if (!item) throw new CustomError("Item is required", 400);

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
      { $push: { cart: item } },
      { new: true, runValidators: true }
    );

    if (result.modifiedCount === 0)
      throw new CustomError("user cart update has problem", 404);
  }
};

export const getCartDetails = async (user) => {
  const { sub } = user;

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

  if (products.length === 0)
    throw new CustomError(`Can't find the cart items`, 404);

  return products[0];
};

export const updateCartItem = async (user, id, body) => {
  const { sub } = user;
  const { newQuantity } = body;

  if (!body)
    throw new CustomError("Product id and new quantity is required", 400);

  const data = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(sub),
    },
    { $set: { "cart.$[elem].quantity": newQuantity } },
    { new: true, arrayFilters: [{ "elem._id": id }] }
  );

  if (!data) throw new CustomError("Cart item not found ", 404);
};

export const removeCartItem = async (user, id) => {
  const { sub } = user;

  if (!id) throw new CustomError("Product id is required", 400);

  const data = await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(sub) },
    { $pull: { cart: { _id: id } } }
  );

  if (!data) throw new CustomError("Can't find cart product", 404);
};
