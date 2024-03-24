import $api from "@/api/apiInstance";

const friendRequestApi = {
    async getReceivedFriendRequests() {
        return await $api.get('/received-friend-requests');
    },

    async getSentFriendRequests() {
        return await $api.get('/sent-friend-requests');
    },

    async sendFriendRequest(body) {
        return await $api.post('/send-friend-request', body);
    },

    async cancelFriendRequest(body) {
        return await $api.post('/cancel-friend-request', body);
    },

    async acceptFriendRequest(body) {
        return await $api.post('/accept-friend-request', body);
    },

    async rejectFriendRequest(body) {
        return await $api.post('/reject-friend-request', body);
    },

    async deleteFromFriends(options) {
        return await $api.delete('/delete-from-friends', options);
    },
};

export default friendRequestApi;