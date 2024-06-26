import bcrypt from 'bcrypt';
import UserModel from '../models/user-model.js';
import InterestModel from '../models/interest-model.js';
import UserInterestModel from '../models/user-interest-model.js';
import { sequelize } from '../database/database.config.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';

const AuthService = {
  async register(body, photo) {
    const { name, gender, age, phone, password, interests } = body;
    const interestsArray = JSON.parse(interests);

    const userWithSamePhone = await UserModel.findOne({ where: { phone } });
    if (userWithSamePhone) {
      throw ApiError.BadRequest(`User with ${phone} phone number already exists`);
    }

    const transaction = await sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(password, 3);
      const newUser = await UserModel.create({
        name,
        gender,
        age,
        phone,
        password: hashedPassword,
        photoLink: photo.filename || photo,
      }, { transaction });

      for (const interest of interestsArray) {
        let existsInterest = await InterestModel.findOne({ where: { name: interest } }, { transaction });
        if (!existsInterest) {
          existsInterest = await InterestModel.create({ name: interest }, { transaction });
        }

        await UserInterestModel.create({
          UserId: newUser.id,
          InterestId: existsInterest.id,
        }, { transaction });
      }

      await transaction.commit();

      const userDto = new UserDto(newUser);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async login(body) {
    const { phone, password } = body;
    const user = await UserModel.findOne({ where: { phone } });
    if (!user) {
      throw ApiError.BadRequest(`No user found with ${phone} phone number`);
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest(`Wrong password for user with ${phone} phone number`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  },

  async logout(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    await tokenService.removeToken(refreshToken);
  },

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
  },
};

export default AuthService;
