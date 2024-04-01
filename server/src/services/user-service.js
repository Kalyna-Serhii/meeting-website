import UserModel from "../models/user-model.js";
import InterestModel from "../models/interest-model.js";
import UserInterestModel from "../models/user-interest-model.js";
import UserFriendModel from "../models/user-friend-model.js";
import {Op} from "sequelize";
import tokenService from "./token-service.js";
import photoService from "./photo-service.js";
import bcrypt from "bcrypt";
import ApiError from "../exceptions/api-error.js";

const UserService = {
    async getUsers(token, params) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;

        const {gender, minAge = 0, maxAge = 100, interests, pageNumber = 1, pageSize = 100} = params;

        const genderFilter = gender && gender !== 'all' ? {gender} : {};
        const ageFilter = minAge || maxAge ? {age: {[Op.between]: [minAge, maxAge]}} : {};
        const offset = (pageNumber - 1) * pageSize;

        let interestsFilter = {};
        if (interests) {
            let interestsIds = [];
            interestsIds = await InterestModel.findAll({
                where: {name: {[Op.in]: interests}}
            });
            interestsIds = interestsIds.map(interest => interest.id);

            interestsFilter = interests ? {
                include: [
                    {
                        model: InterestModel,
                        as: 'Interests',
                        through: {attributes: []},
                        where: {id: {[Op.in]: interestsIds}},
                        attributes: ['id'],
                        required: true,
                    },
                ]
            } : {};
        }

        const {rows: users, count: totalCount} = await UserModel.findAndCountAll({
            ...interestsFilter,
            where: {
                id: {[Op.not]: userId},
                ...genderFilter,
                ...ageFilter,
            },
            offset,
            limit: pageSize,
            distinct: true,
        });

        const friends = await UserFriendModel.findAll({
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

        return {users, totalCount};
    },

    async getUserById(token, targetUserId) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const targetUser = await UserModel.findByPk(targetUserId);

        if (!targetUser) {
            throw ApiError.BadRequest(`No user found`);
        }

        const isFriends = await UserFriendModel.findOne({
            where: {
                [Op.or]: [{user1Id: userId, user2Id: targetUserId}, {user1Id: targetUserId, user2Id: userId}]
            }
        });
        if (!isFriends) {
            targetUser.phone = 'hidden';
        }

        const interestsFromDb = await UserInterestModel.findAll({where: {UserId: targetUserId}});
        let interests = [];
        for (const interestRow of interestsFromDb) {
            const interestId = interestRow.InterestId;
            const interest = await InterestModel.findByPk(interestId);
            interests.push(interest.name);
        }
        targetUser.dataValues.interests = interests;

        delete targetUser.dataValues.password;

        return targetUser;
    },

    async getUserByToken(token) {
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;

        const user = await UserModel.findByPk(userId);
        const friends = await UserFriendModel.findAll({
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

        const interestsFromDb = await UserInterestModel.findAll({where: {UserId: userId}});
        let interests = [];
        for (const interestRow of interestsFromDb) {
            const interestId = interestRow.InterestId;
            const interest = await InterestModel.findByPk(interestId);
            interests.push(interest.name);
        }
        user.dataValues.interests = interests;

        delete user.dataValues.password;

        return user;
    },

    async updateUser(token, body, photo) {
        const {name, gender, age, phone, newPassword, interests} = body;
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

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 3);
            updatedFields.password = hashedPassword;
        }

        if (photo) {
            updatedFields.photoLink = photo.filename;
            await photoService.deletePhoto(user.photoLink);
        }

        const userInterests = await UserInterestModel.findAll({where: {UserId: userId}});
        for (const userInterest of userInterests) {
            await userInterest.destroy();
        }
        for (const interest of interestsArray) {
            let existsInterest = await InterestModel.findOne({where: {name: interest}});
            if (!existsInterest) {
                existsInterest = await InterestModel.create({name: interest});
            }

            await UserInterestModel.create({
                UserId: user.id,
                InterestId: existsInterest.id
            });
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