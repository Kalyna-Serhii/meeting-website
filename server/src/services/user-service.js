import ApiError from "../exceptions/api-error.js";
import UserModel from "../models/user-model.js";
import FriendsModel from "../models/friends-model.js";
import tokenService from "./token-service.js";
import photoService from "./photo-service.js";
import {Op} from "sequelize";

const UserService = {
    async getUsers(token, body) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;

        const {gender, minAge = 0, maxAge = 100, interests} = body;

        const genderFilter = gender && gender !== 'all' ? {gender} : {};
        const ageFilter = minAge || maxAge ? {age: {[Op.between]: [minAge, maxAge]}} : {};
        const interestsFilter = interests ? {interests: {[Op.contains]: interests}} : {};

        const users = await UserModel.findAll({
            where: {
                id: {[Op.not]: userId},
                ...genderFilter,
                ...ageFilter,
                ...interestsFilter
            }
        });

        const friends = await FriendsModel.findAll({
            where: {
                [Op.or]: [{user1Id: userId}, {user2Id: userId}]
            }
        });

        let userFriendsIds = [];
        friends.forEach(friendsRow => {
            if (friendsRow.user1Id === userId) {
                userFriendsIds.push(friendsRow.user2Id)
            } else {
                userFriendsIds.push(friendsRow.user1Id)
            }
        });
        users.forEach(userFromArray => {
            if (!userFriendsIds.includes(userFromArray.id)) {
                userFromArray.phone = 'hidden';
            }
            delete userFromArray.dataValues.password;
        });
        return users;
    },

    async getUserById(token, targetUserId) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const targetUser = await UserModel.findByPk(targetUserId);

        if (!targetUser) {
            throw ApiError.BadRequest(`No user found`);
        }

        const isFriends = await FriendsModel.findOne({
            where: {
                [Op.or]: [{user1Id: userId, user2Id: targetUserId}, {user1Id: targetUserId, user2Id: userId}]
            }
        });
        if (!isFriends) {
            targetUser.phone = 'hidden';
        }

        delete targetUser.dataValues.password;

        return targetUser;
    },

    async getUserByToken(token) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;

        const user = await UserModel.findByPk(userId);
        const friends = await FriendsModel.findAll({
            where: {
                [Op.or]: [{user1Id: userId}, {user2Id: userId}]
            }
        });

        let friendsIds = [];
        friends.forEach(friendsRow => {
            if (friendsRow.user1Id === userId) {
                friendsIds.push(friendsRow.user2Id)
            } else {
                friendsIds.push(friendsRow.user1Id)
            }
        });
        user.dataValues.friends = friendsIds;
        delete user.dataValues.password;

        return user;
    },

    async updateUser(token, body, photo) {
        const {name, gender, age, phone, interests} = body;
        const interestsArray = JSON.parse(interests)

        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const user = await UserModel.findByPk(userId);
        if (!user) {
            throw ApiError.BadRequest(`No user found`);
        }
        const userWithSamePhone = await UserModel.findOne({where: {phone}});
        if (userWithSamePhone && userWithSamePhone.id !== parseInt(userId)) {
            throw ApiError.BadRequest(`User with ${phone} phone number already exists`);
        }

        const updatedFields = {};
        updatedFields.name = name;
        updatedFields.gender = gender;
        updatedFields.age = age;
        updatedFields.phone = phone;
        updatedFields.interests = interestsArray;

        if (photo) {
            updatedFields.photoLink = photo.filename;
            await photoService.deletePhoto(user.photoLink);
        }

        await user.update(updatedFields);
    },

    async deleteUser(token) {
        const userData = tokenService.validateAccessToken(token);
        const id = userData.id;

        const user = await UserModel.findByPk(id);
        if (!user) {
            throw ApiError.BadRequest(`No user found`);
        }

        await photoService.deletePhoto(user.photoLink);
        await user.destroy();
    },
};

export default UserService;