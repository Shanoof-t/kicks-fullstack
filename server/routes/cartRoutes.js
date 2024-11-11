import express from "express";
import { addToCart } from "../controllers/cartController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/add", authenticateToken, addToCart);
export default router;
