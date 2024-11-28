import {
  processOrderCreation,
  retrieveOrderById,
  retrieveOrders,
  retrieveUserOrders,
  updatedOrderById,
} from "../services/index.js";
import { processPaymentVerification } from "../services/order-service.js";
import { asynErrorHandler } from "../utils/error-handlers.js";

// user order controllers

export const createOrder = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const orderData = await processOrderCreation(user, data);
  res.status(201).json({
    status: "success",
    message: "Your order is placed",
    data: orderData,
  });
});

export const listUserOrders = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const orders = await retrieveUserOrders(user);
  res.status(200).json(orders);
});

// both admin and user

export const getOrder = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const order = await retrieveOrderById(id);
  res.status(200).json(order);
});

// admin order controllers

export const updateOrder = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const updatedOrder = await updatedOrderById(id, action);
  res.status(200).json({
    status: "success",
    message: "Order updated Successfully",
    data: updatedOrder,
  });
});

export const listOrders = asynErrorHandler(async (req, res) => {
  const orders = await retrieveOrders();
  res
    .status(200)
    .json({ status: "success", message: "Successfull", data: orders });
});

export const verifyPayment = asynErrorHandler(async (req, res) => {
  const { response, order } = req.body;
  const user = req.user;
  const { order_id, payment_id } = await processPaymentVerification(
    response,
    order,
    user
  );
  res.status(200).json({
    status: "success",
    message: "Your order is placed",
    data: { order_id, payment_id },
  });
});

// export const getOrder = asynErrorHandler(async (req, res) => {
//   const { id } = req.params;
//   const order = await retrieveOrderById(id);
//   res
//     .status(200)
//     .json({ status: "success", message: "Successfull", data: order });
// });
