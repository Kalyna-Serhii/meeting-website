import express from "express";
import userController from "../controllers/user-controller.js";
import upload from '../middlewares/image-middleware.js';
import authMiddleware from "../middlewares/auth-middleware.js";
import { userUpdateValidation, handleValidationErrors } from '../utils/index.js';


const router = express.Router();

router.get("/users", authMiddleware.onlyAuthorized, userController.getUsers);
router.get("/user/:id", authMiddleware.onlyAuthorized, userController.getUserById);
router.get("/user", authMiddleware.onlyAuthorized, userController.getUserByToken);
router.patch("/user", authMiddleware.onlyAuthorized, upload.single('photo'), userUpdateValidation, handleValidationErrors, userController.updateUser);
router.delete("/user", authMiddleware.onlyAuthorized, userController.deleteUser);

export default router;