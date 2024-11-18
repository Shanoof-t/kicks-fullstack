import express from "express";
import {
  getUser,
  listUsers,
  updateUser,
} from "../../controllers/userController.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import verifyAdmin from "../../middleware/verifyAdmin.js";

const userRoutes = express.Router();

userRoutes.use(authenticateToken);
userRoutes.use(verifyAdmin);

userRoutes.route("/").get(listUsers);
userRoutes.route("/:id").post(updateUser).get(getUser);

export default userRoutes;
