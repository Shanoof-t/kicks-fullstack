import express from "express";
import {
  createOrder,
  listOrders,
  getOrder,
} from "../../controllers/orderController.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const orderRouter = express.Router();

orderRouter.use(authenticateToken);
orderRouter.route("/").post(createOrder).get(listOrders);
orderRouter.get("/:id", getOrder);

export default orderRouter;
