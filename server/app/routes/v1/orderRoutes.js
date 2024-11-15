import express from "express";
import {
  createOrder,
  listOrders,
  getOrder,
} from "../../controllers/orderController.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const router = express.Router();

router.use(authenticateToken);
router.route("/").post(createOrder).get(listOrders);
router.get("/:id", getOrder);

export default router;
