import ApiError from '../exceptions/api-error.js';
import tokenService from '../services/token-service.js';

function authorizationCheck(req) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return;
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return;
    }
    const user = userData;
    return user;
  } catch (error) {
    return null;
  }
}

const authMiddleware = {
  onlyAuthorized(req, res, next) {
    try {
      const user = authorizationCheck(req);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      next();
    } catch (error) {
      return next(ApiError.UnauthorizedError());
    }
  },
};

export default authMiddleware;
