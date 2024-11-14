import mongoose from "mongoose";
import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { CLIENT_ERROR } from "../config/errorCodes.js";
import asynErrorHandler from "../utils/asynErrorHandler.js";
import CustomError from "../utils/CustomError.js";

export const createOrder = asynErrorHandler(async (req, res, next) => {
  let { sub } = req.user;
  const { values } = req.body;
  if (!values)
    return res
      .status(400)
      .json({ errCode: CLIENT_ERROR, message: "Your details is required" });

  const { email, firstName, lastName, address, phone, paymentMethod } = values;

  const userDetails = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(sub) } },
    { $unwind: "$cart" },
    {
      $addFields: {
        totalAmount: { $multiply: ["$cart.price", "$cart.quantity"] },
      },
    },
    {
      $group: {
        _id: "$_id",
        products: { $push: "$cart" },
        totalAmount: { $sum: "$totalAmount" },
      },
    },
  ]);

  if (userDetails.length === 0) {
    const error = new CustomError("Can't find cart details", 404);
    return next(error);
  }

  const { products, totalAmount } = userDetails[0];

  await Order.create({
    userId: sub,
    shippingAddress: { email, firstName, lastName, location: address, phone },
    paymentMethod,
    status: "pending",
    totalAmount,
    products,
  });
  
  await User.findByIdAndUpdate(sub, { $unset: { cart: 1 } });
  return res.status(201).json({ message: "Your order is placed" });
});
