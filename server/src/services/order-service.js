import mongoose from "mongoose";
import crypto from "crypto";
import { User } from "../models/user-model.js";
import CustomError from "../utils/custom-error.js";
import { Order } from "../models/order-model.js";
import razorpay from "../config/razorpay.js";
import orderHelper from "../helpers/order-helper.js";
import env from "../config/env_variables.js";
// user order services
export const processOrderCreation = async (user, data) => {
  const { sub } = user;
  if (!data) throw new CustomError("Your details is required", 400);

  const { email, first_name, last_name, location, phone, payment_method } =
    data;

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

  const status = payment_method === "COD" ? "placed" : "pending";

  const order = await Order.create({
    userId: sub,
    shipping_address: {
      email,
      first_name,
      last_name,
      location,
      phone,
    },
    payment_method,
    total_amount,
    products,
    status,
  });

  await User.findByIdAndUpdate(sub, { $unset: { cart: 1 } });
  
  if (payment_method === "COD") {
    return { order_id: order._id, payment_method, status, total_amount };
  } else if (payment_method === "UPI") {
    const paymentGatewayDetails = await orderHelper.generateRazorpay(order); //razorpay order payment integration
    if (!paymentGatewayDetails)
      throw new CustomError("payment gateway failed", 500);
    return {
      order_id: order._id,
      payment_method,
      status,
      payment_gateway_details: paymentGatewayDetails,
      user_information: order.shipping_address,
      total_amount,
    };
  }
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
  if (updatedOrder.modifiedCount === 0)
    throw new CustomError(`There is no order with this id : ${id}`);
  return updatedOrder;
};

export const retrieveOrders = async () => {
  const orders = await Order.find();
  return orders;
};

export const processPaymentVerification = async (response, order, user) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    response;

  let sha = crypto.createHmac("sha256", env.razorpay_key_secret);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = sha.digest("hex");

  if (generated_signature !== razorpay_signature)
    throw new CustomError("Transaction is not legit!");

  const { order_id } = order;

  await Order.updateOne({ _id: order_id }, { $set: { status: "placed" } });

  await User.findByIdAndUpdate(user.sub, { $unset: { cart: 1 } });

  return { order_id: razorpay_order_id, payment_id: razorpay_payment_id };
};

// export const retrieveOrderById = async (id) => {
//   const order = await Order.findOne({ _id: id });
//   if (!order) throw new CustomError("There is no order with this id", 404);
//   return order;
// };
