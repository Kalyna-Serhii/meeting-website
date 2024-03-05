import express from "express";
import friendRequestController from "../controllers/friend-request-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get('/received-friend-requests', authMiddleware.onlyAuthorized, friendRequestController.getReceivedFriendRequests);
router.get('/sent-friend-requests', authMiddleware.onlyAuthorized, friendRequestController.getSentFriendRequests);
router.post('/send-friend-request', authMiddleware.onlyAuthorized, friendRequestController.sendFriendRequest);
router.post('/accept-friend-request', authMiddleware.onlyAuthorized, friendRequestController.acceptFriendRequest);
router.post('/reject-friend-request', authMiddleware.onlyAuthorized, friendRequestController.rejectFriendRequest);
router.post('/delete-from-friends', authMiddleware.onlyAuthorized, friendRequestController.deleteFromFriends);

export default router;