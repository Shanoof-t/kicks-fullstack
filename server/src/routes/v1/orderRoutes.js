import express from "express";
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrder,
  listUserOrders,
} from "../../controllers/orderController.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import verifyAdmin from "../../middleware/verifyAdmin.js";

const orderRouter = express.Router();

orderRouter.use(authenticateToken);

orderRouter.route("/").post(createOrder).get(listUserOrders);
orderRouter.route("/list").get(verifyAdmin, listOrders);
orderRouter
  .route("/:id")
  .get(getOrder)
  .post(verifyAdmin, updateOrder)

export default orderRouter;
