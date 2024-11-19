import {
  processOrderCreation,
  retrieveOrderById,
  retrieveOrders,
  retrieveUserOrders,
  updatedOrderById,
} from "../services/orderService.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

// user order controllers
export const createOrder = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const order = await processOrderCreation(user, data);
  res
    .status(201)
    .json({ status: "success", message: "Your order is placed", data: order });
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

// export const getOrder = asynErrorHandler(async (req, res) => {
//   const { id } = req.params;
//   const order = await retrieveOrderById(id);
//   res
//     .status(200)
//     .json({ status: "success", message: "Successfull", data: order });
// });
