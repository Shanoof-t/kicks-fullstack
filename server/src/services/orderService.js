import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import CustomError from "../utils/custom-error.js";
import { Order } from "../models/orderModel.js";

// user order services
export const processOrderCreation = async (user, data) => {
  const { sub } = user;
  console.log(data);
  if (!data) throw new CustomError("Your details is required", 400);

  const { email, first_name, last_name, address, phone, payment_method } = data;

  const userDetails = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(sub) } },
    { $unwind: "$cart" },
    {
      $addFields: {
        total_amount: { $multiply: ["$cart.price", "$cart.quantity"] },
      },
    },
    {
      $group: {
        _id: "$_id",
        products: { $push: "$cart" },
        total_amount: { $sum: "$total_amount" },
      },
    },
  ]);

  if (userDetails.length === 0)
    throw new CustomError("Can't find cart details", 400);

  const { products, total_amount } = userDetails[0];

  const order = await Order.create({
    userId: sub,
    shipping_address: {
      email,
      first_name,
      last_name,
      location: address,
      phone,
    },
    payment_method,
    total_amount,
    products,
  });

  await User.findByIdAndUpdate(sub, { $unset: { cart: 1 } });
  return order;
};

export const retrieveUserOrders = async (user) => {
  const { sub } = user;
  const orders = await Order.find({ userId: sub });
  if (orders.length === 0)
    throw new CustomError(
      "Currently you dont have orders,Please make order!",
      404
    );
  return orders;
};

export const retrieveOrderById = async (id) => {
  if (!id) throw new CustomError("Order id is required", 404);
  const order = await Order.findOne({
    _id: id,
  });
  if (!order) throw new CustomError("There is no order with this id", 404);
  return order;
};

// admin order services

export const updatedOrderById = async (id, action) => {
  if (!action) throw new CustomError("Order action must be needed", 400);

  if (!["pending", "delivered"].includes(action))
    throw new CustomError("Action must be pending or delivered", 400);

  const updatedOrder = await Order.updateOne(
    { _id: id },
    { $set: { status: action } },
    { new: true }
  );
  return updatedOrder;
};

export const retrieveOrders = async () => {
  const orders = await Order.find();
  return orders;
};

// export const retrieveOrderById = async (id) => {
//   const order = await Order.findOne({ _id: id });
//   if (!order) throw new CustomError("There is no order with this id", 404);
//   return order;
// };
