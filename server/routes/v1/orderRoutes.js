import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../../controllers/orderController.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const router = express.Router();

router.use(authenticateToken);
router.route("/").post(createOrder).get(getAllOrders);
router.get("/:id", getOrderById);

export default router;
