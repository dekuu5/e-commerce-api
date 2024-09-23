import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { verifyAccessToken } from "../../middlewares/auth.js";
import { userRegisterSchema,userLoginSchema } from "../../validators/userValidator.js";
import { registerController, loginController, signOutController, refreshTokenController } from "./auth.controllers.js";

const auth = Router();

auth.post('/register', validate(userRegisterSchema), registerController);
auth.post('/login', validate(userLoginSchema),loginController);
auth.post('/sign-out', verifyAccessToken, signOutController);
auth.get('/refresh-token', refreshTokenController);


export default auth;
