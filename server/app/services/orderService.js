import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";
import { Order } from "../models/orderModel.js";

export const processOrderCreation = async (user, data) => {
  const { sub } = user;

  if (!data) throw new CustomError("Your details is required", 400);

  const { email, firstName, lastName, address, phone, paymentMethod } = data;

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

  if (userDetails.length === 0)
    throw new CustomError("Can't find cart details", 404);

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
};

export const retrieveUserOrders = async (user) => {
  const { sub } = user;
  const orders = await Order.find({ userId: sub });
  if (!orders) throw new CustomError("Can't find orders", 404);
  return orders;
};

export const retrieveOrderById = async (user, id) => {
  const { sub } = user;
  if (!id) throw new CustomError("Order id is required", 404);
  const order = Order.findOne({
    userId: sub,
    _id: new mongoose.Types.ObjectId(id),
  });
  if (!order) throw new CustomError("Can't find the order", 404);
  return order;
};
