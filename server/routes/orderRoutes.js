import express from "express";
import { createOrder } from "../controllers/orderController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();
router.post("/create",authenticateToken,createOrder)
export default router;
