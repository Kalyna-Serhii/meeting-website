import express from "express";
import userController from "../controllers/user-controller.js";
import upload from '../middlewares/image-middleware.js';
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user", authMiddleware.onlyAuthorized, userController.getUserByToken);
router.patch("/user", authMiddleware.onlyAuthorized, upload.single('photo'), userController.updateUser);
router.delete("/user", authMiddleware.onlyAuthorized, userController.deleteUser);

export default router;