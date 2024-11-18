import {
  processOrderCreation,
  retrieveOrderById,
  retrieveUserOrders,
} from "../services/orderService.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

export const createOrder = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const response = await processOrderCreation(user, data);
  res.status(201).json(response);
});

export const listOrders = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const orders = await retrieveUserOrders(user);
  res.status(200).json(orders);
});

export const getOrder = asynErrorHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const order = await retrieveOrderById(user, id);
  res.status(200).json(order);
});