import authService from '../services/auth-service.js';
import photoService from '../services/photo-service.js';

const AuthController = {
  async register(req, res, next) {
    try {
      const newUser = await authService.register(req.body, req.file);
      res.cookie('accessToken', newUser.accessToken);
      res.cookie('refreshToken', newUser.refreshToken, { httpOnly: true });
      return res.status(201).send();
    } catch (error) {
      try {
        await photoService.deletePhoto(req.file);
      } catch (photoError) {
        next(photoError);
      }
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const userData = await authService.login(req.body);
      res.cookie('accessToken', userData.accessToken);
      res.cookie('refreshToken', userData.refreshToken, { httpOnly: true });
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      await authService.logout(req.cookies.refreshToken);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async refresh(req, res, next) {
    try {
      const { accessToken, refreshToken } = await authService.refresh(req.cookies.refreshToken);
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
