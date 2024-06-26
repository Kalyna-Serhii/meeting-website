import userService from '../services/user-service.js';

const UserController = {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers(req.cookies.accessToken, req.query);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.cookies.accessToken, req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async getUserByToken(req, res, next) {
    try {
      const user = await userService.getUserByToken(req.cookies.accessToken);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      await userService.updateUser(req.cookies.accessToken, req.body, req.file);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.cookies.accessToken);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
