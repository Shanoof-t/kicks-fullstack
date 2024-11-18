import express from "express";
import { listUsers, updateUser } from "../../controllers/userController.js";
import authenticateToken from "../../middleware/authenticateToken.js";
const userRoutes = express.Router();

userRoutes.use(authenticateToken);

userRoutes.route("/").get(listUsers);
userRoutes.route("/:id").post(updateUser);

export default userRoutes;
