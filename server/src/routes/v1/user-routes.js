import express from "express";
import {
  getUser,
  listUsers,
  updateUser,
} from "../../controllers/index.js";
import authenticateToken from "../../middleware/authenticate-token.js";
import verifyAdmin from "../../middleware/verify-admin-middleware.js";

const userRoutes = express.Router();

userRoutes.use(authenticateToken);
userRoutes.use(verifyAdmin);

userRoutes.route("/").get(listUsers);
userRoutes.route("/:id").post(updateUser).get(getUser);

export default userRoutes;
