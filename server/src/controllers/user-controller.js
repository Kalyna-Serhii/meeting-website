import userService from "../services/user-service.js";

const UserController = {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
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
}

export default UserController;