import ApiError from '../exceptions/api-error.js';
import tokenService from '../services/token-service.js';

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

function authorizationCheck(req) {
    try {
        const accessToken = req.cookies.accessToken;
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

export default authMiddleware;