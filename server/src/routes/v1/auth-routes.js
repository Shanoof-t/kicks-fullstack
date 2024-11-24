import express from "express";
import { userLogin, userRegister } from "../../controllers/index.js";
import validator from "../../middleware/validator-middleware.js";
import schema from "../../schema/index.js";

const authRouter = express.Router();

authRouter.post("/register", validator(schema.register), userRegister);
authRouter.post("/login", validator(schema.login), userLogin);

export default authRouter;
