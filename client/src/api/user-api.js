import $api from "@/api/apiInstance";

const userApi = {
    async getUsers() {
        try {
            return await $api.get('/users');
        } catch (error) {
            if (error.response) {
                alert(`Failed to receive users: ${error.response.data.message}`);
            } else {
                alert(`Failed to receive users: ${error.message || error}`);
            }
        }
    },

    async getUserById(userId) {
        try {
            return await $api.get(`/user/${userId}`);
        } catch (error) {
            if (error.response) {
                alert(`Failed to receive user: ${error.response.data.message}`);
            } else {
                alert(`Failed to receive user: ${error.message || error}`);
            }
        }
    },

    async getUserByToken() {
        try {
            return await $api.get('/user');
        } catch (error) {
            if (error.response) {
                alert(`Failed to receive user: ${error.response.data.message}`);
            } else {
                alert(`Failed to receive user: ${error.message || error}`);
            }
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