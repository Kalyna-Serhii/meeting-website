import $api from "@/api/apiInstance";

const userApi = {
    async getUsers(options) {
        try {
            return await $api.get('/users', options);
        } catch (error) {}
    },

    async getUserById(userId) {
        try {
            return await $api.get(`/user/${userId}`);
        } catch (error) {
        }
    },

    async getUserByToken() {
        try {
            return await $api.get('/user');
        } catch (error) {
        }
    },

    async updateUser(body) {
        try {
            return await $api.patch('/user', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to update user: ${error.response.data.message}`);
            } else {
                alert(`Failed to update user: ${error.message || error}`);
            }
        }
    },

    async deleteUser() {
        try {
            return await $api.delete('/user');
        } catch (error) {
            if (error.response) {
                alert(`Failed to delete user: ${error.response.data.message}`);
            } else {
                alert(`Failed to delete user: ${error.message || error}`);
            }
        }
    },
};

export default userApi;