import ApiError from "../exceptions/api-error.js";
import FriendRequestModel from "../models/friend-request-model.js";
import tokenService from "./token-service.js";
import userModel from "../models/user-model.js";
import friendRequestModel from "../models/friend-request-model.js";

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

    async sendFriendRequest(token, body){
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

        const sameRequest = await friendRequestModel.findOne({where:  {
            senderId, receiverId
        }});
        const reverseRequest = await friendRequestModel.findOne({where: {
            receiverId: senderId, senderId: receiverId
        }});
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

        const receiver = await userModel.findByPk(receiverId);

        const sender = await userModel.findByPk(senderId);
        if (!sender) {
            throw ApiError.BadRequest('No user found');
        }

        const request = await FriendRequestModel.findOne({where: {
            senderId, receiverId
        }});
        if (!request) {
            throw ApiError.BadRequest('No request found');
        }
        if (request.status !== 'pending') {
            throw ApiError.BadRequest('Request already accepted or rejected');
        }
        if (receiver.friends.includes(senderId)) {
            throw ApiError.BadRequest('Already friends');
        }
        const receiverFriendsArray = [...receiver.friends, senderId];
        const senderFriendsArray = [...sender.friends, receiverId];

        await receiver.update({friends: receiverFriendsArray});
        await sender.update({friends: senderFriendsArray});
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

        const request = await FriendRequestModel.findOne({where: {
                senderId, receiverId
            }});
        if (!request) {
            throw ApiError.BadRequest('No request found');
        }
        if (request.status !== 'pending') {
            throw ApiError.BadRequest(`Request already accepted or rejected on ${request.data}`);
        }

        await request.update({status: 'rejected'});
    },

    async deleteFromFriends (token, body) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const {friendId} = body;
        const user = await userModel.findByPk(userId);
        const friend = await userModel.findByPk(friendId);
        if (!user || !friend) {
            throw ApiError.BadRequest('No user found');
        }
        const userArray = user.friends.slice();
        const friendIndex = userArray.indexOf(friendId);
        const friendArray = friend.friends.slice();
        const userIndex = friendArray.indexOf(userId);

        if (friendIndex !== -1 && userIndex !== -1) {
            userArray.splice(friendIndex, 1);
            friendArray.splice(userIndex, 1);
            await user.update({friends: userArray});
            await friend.update({friends: friendArray});
        } else {
            throw ApiError.BadRequest('Not friends');
        }
    },
};

export default FriendRequestService;