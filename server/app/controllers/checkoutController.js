import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import asynErrorHandler from "../utils/asynErrorHandler.js";
import CustomError from "../utils/CustomError.js";

export const checkoutDetails = asynErrorHandler(async (req, res, next) => {
  const { sub } = req.user;

  const cartDetails = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(sub) } },
    { $unwind: "$cart" },
    {
      $addFields: {
        totalPrice: { $multiply: ["$cart.price", "$cart.quantity"] },
      },
    },
    {
      $group: {
        _id: "$_id",
        cartProductCount: { $sum: 1 },
        totalAmount: { $sum: "$totalPrice" },
        cart: { $push: "$cart" },
      },
    },
  ]);

  if (cartDetails.length === 0) {
    const error = new CustomError("Can't find cart details", 404);
    return next(error);
  }
  return res.status(200).json(cartDetails[0]);
});
