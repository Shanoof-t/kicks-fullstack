import express from "express";
import { userLogin, userRegister } from "../../controllers/auth-controller.js";
import validator from "../../middleware/validatorMiddleware.js";
import schema from "../../schema/index.js";

const authRouter = express.Router();

authRouter.post("/register", validator(schema.register), userRegister);
authRouter.post("/login", validator(schema.login), userLogin);

export default authRouter;
