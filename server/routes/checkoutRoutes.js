import express from "express";
import { checkoutDetails } from "../controllers/checkoutController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.get("/details", authenticateToken, checkoutDetails);

export default router;
