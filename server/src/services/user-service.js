import ApiError from "../exceptions/api-error.js";
import UserModel from "../models/user-model.js";
import TokenModel from "../models/token-model.js";
import tokenService from "./token-service.js";
import photoService from "./photo-service.js";
import {Op} from "sequelize";

const UserService = {
    async getUsers(token) {
        const userId = tokenService.validateAccessToken(token).id;
        const user = await UserModel.findByPk(userId);
        const users = await UserModel.findAll({where: {id: {[Op.not]: userId}}});
        users.forEach(userFromArray => {
            if (!user.friends.includes(userFromArray.id)) {
                userFromArray.phone = 'hidden';
            }
        })
        return users;
    },

    async getUserByToken(token) {
        const userId = tokenService.validateAccessToken(token).id;
        const user = await UserModel.findByPk(userId);
        return user;
    },

    async updateUser(token, body, photo) {
        const {name, gender, phone, interests} = body;
        const interestsArray = JSON.parse(interests)

        const userData = tokenService.validateAccessToken(token);
        const id = userData.id;
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw ApiError.BadRequest(`No user found`);
        }
        const userWithSamePhone = await UserModel.findOne({where: {phone}});
        if (userWithSamePhone && userWithSamePhone.id !== parseInt(id)) {
            throw ApiError.BadRequest(`User with ${phone} phone number already exists`);
        }

        const updatedFields = {};
        updatedFields.name = name;
        updatedFields.gender = gender;
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