import $api from "@/api/apiInstance";

const userApi = {
    async getUsers(options) {
        return await $api.get('/users', options);
    },

    async getUserById(userId) {
        return await $api.get(`/user/${userId}`);
    },

    async getUserByToken() {
        return await $api.get('/user');
    },

    async updateUser(body) {
        return await $api.patch('/user', body);
    },

    async deleteUser() {
        return await $api.delete('/user');
    },
};

export default userApi;