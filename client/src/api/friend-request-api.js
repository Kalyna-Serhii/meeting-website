import $api from "@/api/apiInstance";

const friendRequestApi = {
    async getReceivedFriendRequests() {
        try {
            return await $api.get('/received-friend-requests');
        } catch (error) {
        }
    },

    async getSentFriendRequests() {
        try {
            return await $api.get('/sent-friend-requests');
        } catch (error) {
        }
    },

    async sendFriendRequest(body) {
        try {
            return await $api.post('/send-friend-request', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to send friend request: ${error.response.data.message}`);
            } else {
                alert(`Failed to send friend request: ${error.message || error}`);
            }
        }
    },

    async cancelFriendRequest(body) {
        try {
            return await $api.post('/cancel-friend-request', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to cancel friend request: ${error.response.data.message}`);
            } else {
                alert(`Failed to cancel friend request: ${error.message || error}`);
            }
        }
    },

    async acceptFriendRequest(body) {
        try {
            return await $api.post('/accept-friend-request', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to accept friend request: ${error.response.data.message}`);
            } else {
                alert(`Failed to accept friend request: ${error.message || error}`);
            }
        }
    },

    async rejectFriendRequest(body) {
        try {
            return await $api.post('/reject-friend-request', body);
        } catch (error) {
            if (error.response) {
                alert(`Failed to reject friend request: ${error.response.data.message}`);
            } else {
                alert(`Failed to reject friend request: ${error.message || error}`);
            }
        }
    },

    async deleteFromFriends(options) {
        try {
            return await $api.delete('/delete-from-friends', options);
        } catch (error) {
            if (error.response) {
                alert(`Failed to delete from friends: ${error.response.data.message}`);
            } else {
                alert(`Failed to delete from friends: ${error.message || error}`);
            }
        }
    },
};

export default friendRequestApi;