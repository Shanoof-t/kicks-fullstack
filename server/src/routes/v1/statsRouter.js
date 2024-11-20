import express from "express";
import { getStats } from "../../controllers/statsController.js";
import verifyAdmin from "../../middleware/verifyAdmin.js";
import authenticateToken from "../../middleware/authenticateToken.js";

const statsRouter = express.Router();

statsRouter.use(authenticateToken)
statsRouter.use(verifyAdmin);

statsRouter.route("/").get(getStats);

export default statsRouter;
