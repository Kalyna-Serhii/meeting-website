import friendRequestService from '../services/friend-request-service.js';

const FriendRequestController = {
  async getReceivedFriendRequests(req, res, next) {
    try {
      const requests = await friendRequestService.getReceivedFriendRequests(req.cookies.accessToken);
      return res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  },

  async getSentFriendRequests(req, res, next) {
    try {
      const requests = await friendRequestService.getSentFriendRequests(req.cookies.accessToken);
      return res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  },

  async sendFriendRequest(req, res, next) {
    try {
      await friendRequestService.sendFriendRequest(req.cookies.accessToken, req.body);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async cancelFriendRequest(req, res, next) {
    try {
      await friendRequestService.cancelFriendRequest(req.cookies.accessToken, req.body);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async acceptFriendRequest(req, res, next) {
    try {
      await friendRequestService.acceptFriendRequest(req.cookies.accessToken, req.body);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async rejectFriendRequest(req, res, next) {
    try {
      await friendRequestService.rejectFriendRequest(req.cookies.accessToken, req.body);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async deleteFromFriends(req, res, next) {
    try {
      await friendRequestService.deleteFromFriends(req.cookies.accessToken, req.query);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default FriendRequestController;
