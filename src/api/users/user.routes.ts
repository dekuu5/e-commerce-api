import { Router } from "express";
import { verifyAccessToken, authorizeRoles } from "../../middlewares/auth.js";
import { getUserProfileController, updateUserProfileController, deleteUserProfileController, getAllUsersController, getUserByIdController, updateUserByIdController, deleteUserByIdController } from "./user.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { updateUserSchema } from "../../validators/userValidator.js";

const user = Router();

user.get('/me', verifyAccessToken, getUserProfileController);
user.patch('/me', verifyAccessToken, validate(updateUserSchema), updateUserProfileController);
user.delete('/me', verifyAccessToken, deleteUserProfileController);

user.get('/', verifyAccessToken, authorizeRoles('ADMIN'), getAllUsersController);
user.get('/:id', verifyAccessToken, authorizeRoles('ADMIN'), getUserByIdController);
user.put('/:id', verifyAccessToken, authorizeRoles('ADMIN'),validate(updateUserSchema),  updateUserByIdController);
user.delete('/:id', verifyAccessToken, authorizeRoles('ADMIN'), deleteUserByIdController);

export default user;