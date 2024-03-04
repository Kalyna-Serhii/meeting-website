import express from "express";
import userController from "../controllers/user-controller.js";
import upload from '../middlewares/image-middleware.js';

const router = express.Router();

router.get("/users", userController.getUsers);
router.patch("/user", upload.single('photo'), userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

export default router;