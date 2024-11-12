import mongoose from "mongoose";
import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import { CLIENT_ERROR, SERVER_ERROR } from "../config/errorCodes.js";

export const createOrder = async (req, res) => {
  const { sub } = req.user;
  const { values } = req.body;
  if (!values)
    return res
      .status(401)
      .json({ errCode: CLIENT_ERROR, message: "Your details is required" });

  try {
    const { email, firstName, lastName, address, phone, paymentMethod } =
      values;

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errCode: SERVER_ERROR,
      message: "Something went wrong, please try again later",
    });
  }
};
