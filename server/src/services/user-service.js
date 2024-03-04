import ApiError from "../exceptions/api-error.js";
import UserModel from "../models/user-model.js";
import TokenModel from "../models/token-model.js";
import tokenService from "./token-service.js";
import photoService from "./photo-service.js";

const UserService = {
    async getUsers() {
        const users = await UserModel.findAll();
        return users;
    },

    async updateUser(token, body, photo) {
        if (!token) {
            throw ApiError.UnauthorizedError();
        }

        const {name, gender, phone, interests} = body;
        const interestsArray = JSON.parse(interests)

        const userData = tokenService.validateAccessToken(token);
        const id = userData.id;
        const user = await UserModel.findOne({where: {id}});
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
        if (!token) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateAccessToken(token);
        const id = userData.id;

        const user = await UserModel.findOne({where: {id}});
        if (!user) {
            throw ApiError.BadRequest(`No user found`);
        }
        const userToken = await TokenModel.findOne({where: {userId: id}});
        if (userToken) {
            await userToken.destroy();
        }
        await photoService.deletePhoto(user.photoLink);
        await user.destroy();
    },
};

export default UserService;