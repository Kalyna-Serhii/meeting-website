import ApiError from "../exceptions/api-error.js";
import FriendRequestModel from "../models/friend-request-model.js";
import friendRequestModel from "../models/friend-request-model.js";
import UserFriendModel from "../models/user-friend-model.js";
import tokenService from "./token-service.js";
import userModel from "../models/user-model.js";
import {Op} from "sequelize";

const FriendRequestService = {
    async getReceivedFriendRequests(token) {
        const userData = tokenService.validateAccessToken(token);
        const id = userData.id;

        const requests = await FriendRequestModel.findAll({where: {receiverId: id}})
        return requests;
    },

    async getSentFriendRequests(token) {
        const userData = tokenService.validateAccessToken(token);
        const id = userData.id;

        const requests = await FriendRequestModel.findAll({where: {senderId: id}})
        return requests;
    },

    async sendFriendRequest(token, body) {
        const userData = tokenService.validateAccessToken(token);
        const senderId = userData.id;
        const {receiverId} = body;
        const user = await userModel.findByPk(receiverId);
        if (!user) {
            throw ApiError.BadRequest('No user found');
        }
        if (senderId === receiverId) {
            throw ApiError.BadRequest('Request to yourself');
        }

        const alreadyFriends = await UserFriendModel.findOne({
            where: {
                [Op.or]: [{user1Id: senderId, user2Id: receiverId}, {user1Id: receiverId, user2Id: senderId}]
            }
        });
        if (alreadyFriends) {
            throw ApiError.BadRequest('Already friends');
        }

        const sameRequest = await friendRequestModel.findOne({
            where: {
                senderId, receiverId, status: 'pending'
            }
        });
        const reverseRequest = await friendRequestModel.findOne({
            where: {
                receiverId: senderId, senderId: receiverId, status: 'pending'
            }
        });
        if (sameRequest) {
            throw ApiError.BadRequest('Same request already exists');
        }
        if (reverseRequest) {
            throw ApiError.BadRequest('Reverse request already exists');
        }

        await FriendRequestModel.create({senderId, receiverId});
    },

    async acceptFriendRequest(token, body) {
        const receiverData = tokenService.validateAccessToken(token);
        const receiverId = receiverData.id;
        const {senderId} = body;

        const sender = await userModel.findByPk(senderId);
        if (!sender) {
            throw ApiError.BadRequest('No user found');
        }

        const request = await FriendRequestModel.findOne({
            where: {
                senderId, receiverId, status: 'pending'
            }
        });
        if (!request) {
            throw ApiError.BadRequest('No request found');
        }

        const alreadyFriends = await UserFriendModel.findOne({
            where: {
                [Op.or]: [{user1Id: senderId, user2Id: receiverId}, {user1Id: receiverId, user2Id: senderId}]
            }
        });
        if (alreadyFriends) {
            throw ApiError.BadRequest('Already friends');
        }

        await UserFriendModel.create({user1Id: senderId, user2Id: receiverId});
        await request.update({status: 'accepted'});
    },

    async rejectFriendRequest(token, body) {
        const receiverData = tokenService.validateAccessToken(token);
        const receiverId = receiverData.id;
        const {senderId} = body;

        const sender = await userModel.findByPk(senderId);
        if (!sender) {
            throw ApiError.BadRequest('No user found');
        }

        const request = await FriendRequestModel.findOne({
            where: {
                senderId, receiverId
            }
        });
        if (!request) {
            throw ApiError.BadRequest('No request found');
        }
        if (request.status !== 'pending') {
            throw ApiError.BadRequest(`Request already accepted or rejected on ${request.data}`);
        }

        await request.update({status: 'rejected'});
    },

    async deleteFromFriends(token, body) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const {friendId} = body;

        const user = await userModel.findByPk(userId);
        const friend = await userModel.findByPk(friendId);
        if (!user || !friend) {
            throw ApiError.BadRequest('No user found');
        }
        if (userId === friendId) {
            throw ApiError.BadRequest('Request to yourself');
        }
        const friends = await UserFriendModel.findOne({
            where: {
                [Op.or]: [{user1Id: userId, user2Id: friendId}, {user1Id: friendId, user2Id: userId}]
            }
        });
        if (!friends) {
            throw ApiError.BadRequest('Not friends');
        }

        await friends.destroy();
    },
};

export default FriendRequestService;