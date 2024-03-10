import $api from "@/api/apiInstance";

const authApi = {
    async register(body) {
        try {
            return await $api.post('/register', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to register: ${error.response.data.message}`);
            } else {
                alert(`Failed to register: ${error.message || error}`);
            }
        }
    },

    async login(body) {
        try {
            return await $api.post('/login', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to login: ${error.response.data.message}`);
            } else {
                alert(`Failed to login: ${error.message || error}`);
            }
        }
    },

    async logout() {
        try {
            return await $api.post('/logout', {});
        } catch (error) {
        }
    },
};

export default authApi;