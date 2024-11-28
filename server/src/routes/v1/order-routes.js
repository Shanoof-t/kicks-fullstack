import express from "express";
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrder,
  listUserOrders,
} from "../../controllers/index.js";
import authenticateToken from "../../middleware/authenticate-token.js";
import verifyAdmin from "../../middleware/verify-admin-middleware.js";
import validate from "../../middleware/validator-middleware.js";
import schema from "../../schema/index.js";
import { verifyPayment } from "../../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.use(authenticateToken);

orderRouter
  .route("/")
  .post(validate(schema.createOrder), createOrder)
  .get(listUserOrders);
orderRouter.route("/list").get(verifyAdmin, listOrders);
orderRouter.route("/verify-payment").post(verifyPayment)
orderRouter
  .route("/:id")
  .get(getOrder)
  .post(verifyAdmin, validate(schema.updateOrder), updateOrder);

export default orderRouter;
