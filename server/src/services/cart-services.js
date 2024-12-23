import mongoose from "mongoose";
import { User } from "../models/user-model.js";
import CustomError from "../utils/custom-error.js";

export const addItemToCart = async (user, item) => {
  const { sub } = user;

  const result = await User.updateOne(
    { _id: sub },
    { $push: { cart: item } },
    { new: true, runValidators: true }
  );

  if (result.modifiedCount === 0)
    throw new CustomError("user cart update has problem", 404);
};

export const getCartProduct = async (user, id) => {
  const { sub } = user;
  const product = await User.findOne({
    _id: sub,
    cart: { $elemMatch: { _id: id } },
  });

  return product;
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

export const updateCartItem = async (user, id, action) => {
  const { sub } = user;

  if (!action) throw new CustomError("Action must be needed", 404);

  if (!["increment", "decrement"].includes(action))
    throw new CustomError("Action must be increment or decrement", 400);

  const updatableUser = await User.findOne({
    _id: sub,
  });
  if (!updatableUser) throw new CustomError("User not found", 404);

  const userCartItem = updatableUser.cart.find(
    (item) => item._id.toString() === id
  );
  if (!userCartItem)
    throw new CustomError(
      `Can't find cart items with this id '${id}',check item id again!`,
      404
    );

  let newQuantity = userCartItem.quantity;
  if (action === "increment") {
    newQuantity++;
  } else if (action === "decrement") {
    newQuantity = Math.max(newQuantity - 1, 1);
  }

  const updatedCart = await User.findOneAndUpdate(
    {
      _id: sub,
      "cart._id": new mongoose.Types.ObjectId(id),
    },
    { $set: { "cart.$.quantity": newQuantity } },
    { new: true }
  );
  return updatedCart;
};

export const removeCartItem = async (user, id) => {
  const { sub } = user;

  if (!id) throw new CustomError("Product id is required", 400);

  const data = await User.updateOne(
    { _id: sub },
    { $pull: { cart: { _id: new mongoose.Types.ObjectId(id) } } }
  );

  if (data.modifiedCount === 0)
    throw new CustomError("Can't find cart product", 404);
};
