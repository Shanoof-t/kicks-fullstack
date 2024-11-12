import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { CLIENT_ERROR, SERVER_ERROR } from "../config/errorCodes.js";

export const addToCart = async (req, res) => {
  const { sub } = req.user;
  const { item } = req.body;
  console.log("item>>>", item);
  if (!item)
    return res
      .status(400)
      .json({ errCode: CLIENT_ERROR, message: "Item is required" });
  try {
    const updatedCart = await User.updateOne(
      {
        _id: new mongoose.Types.ObjectId(sub),
        "cart._id": item._id,
      },
      { $inc: { "cart.$.quantity": item.quantity } }
    );

    if (!updatedCart.acknowledged) {
      const result = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(sub) },
        { $push: { cart: item } }
      );
      if (!result.acknowledged)
        return res.status(404).json({
          errCode: SERVER_ERROR,
          message: "user cart update has problem",
        });
    }
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

export const fetchCartProducts = async (req, res) => {
  const { sub } = req.user;
  try {
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

    if (!products)
      return res.status(404).json({
        errCode: SERVER_ERROR,
        message: `can't find the cart items`,
      });
    return res.status(200).json(products[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: SERVER_ERROR,
      message: "Something went wrong, please try again later",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { sub } = req.user;
  const { id, newQuantity } = req.body;
  if (!req.body)
    return res.status(400).json({
      errCode: "CLIENT_ERROR",
      message: "Product id and new quantity is required",
    });

  try {
    const data = await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(sub),
      },
      { $set: { "cart.$[elem].quantity": newQuantity } },
      { new: true, arrayFilters: [{ "elem._id": id }] }
    );
    res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartProduct = async (req, res) => {
  const { id } = req.body;
  const { sub } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        errCode: "CLIENT_ERROR",
        message: "Product id is required",
      });
    const data = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(sub) },
      { $pull: { cart: { _id: id } } }
    );
    return res.status(204).json({ message: "Product deleted from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: "SERVER_ERROR",
      message: "Something went wrong, please try again later",
    });
  }
};
