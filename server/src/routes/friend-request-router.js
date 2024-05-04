import express from 'express';
import friendRequestController from '../controllers/friend-request-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {
  senderFriendRequestValidation,
  receiverFriendRequestValidation,
  handleValidationErrors,
} from '../utils/index.js';

const router = express.Router();

router.get(
  '/received-friend-requests',
  authMiddleware.onlyAuthorized,
  friendRequestController.getReceivedFriendRequests,
);
router.get('/sent-friend-requests', authMiddleware.onlyAuthorized, friendRequestController.getSentFriendRequests);
router.post(
  '/send-friend-request',
  authMiddleware.onlyAuthorized,
  receiverFriendRequestValidation,
  handleValidationErrors,
  friendRequestController.sendFriendRequest,
);
router.post(
  '/cancel-friend-request',
  authMiddleware.onlyAuthorized,
  receiverFriendRequestValidation,
  handleValidationErrors,
  friendRequestController.cancelFriendRequest,
);
router.post(
  '/accept-friend-request',
  authMiddleware.onlyAuthorized,
  senderFriendRequestValidation,
  handleValidationErrors,
  friendRequestController.acceptFriendRequest,
);
router.post(
  '/reject-friend-request',
  authMiddleware.onlyAuthorized,
  senderFriendRequestValidation,
  handleValidationErrors,
  friendRequestController.rejectFriendRequest,
);
router.delete(
  '/delete-from-friends',
  authMiddleware.onlyAuthorized,
  friendRequestController.deleteFromFriends,
);

export default router;
