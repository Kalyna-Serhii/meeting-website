import express from 'express';
import authController from '../controllers/auth-controller.js';
import authMiddleware from "../middlewares/auth-middleware.js";
import upload from '../middlewares/image-middleware.js';

const router = express.Router();

router.post('/register', upload.single('photo'), authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware.onlyAuthorized, authController.logout);
router.get('/refresh', authController.refresh);

export default router;