import express from "express";
import { getStats } from "../../controllers/index.js";
import verifyAdmin from "../../middleware/verify-admin-middleware.js";
import authenticateToken from "../../middleware/authenticate-token.js";

const statsRouter = express.Router();

statsRouter.use(authenticateToken)
statsRouter.use(verifyAdmin);

statsRouter.route("/").get(getStats);

export default statsRouter;
