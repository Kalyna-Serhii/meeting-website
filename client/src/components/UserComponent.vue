<template>
  <div class="content profile">
    <div class="content-title">User</div>
    <div id="user-form">
      <div class="column1">
        <div class="block-title">Avatar</div>
        <div class="block-flex">
          <div class="block-item">
            <img :src="serverURL + /photos/ + user.photoLink" alt="avatar" class="avatar">
          </div>
        </div>
        <div class="block-title">Name</div>
        <div class="block-flex">
          <div class="block-item">
            {{ user.name }}
          </div>
        </div>
        <div class="block-title">Gender</div>
        <div class="block-flex">
          <div class="block-item">
            {{ user.gender }}
          </div>
        </div>
        <div class="block-title">Age</div>
        <div class="block-flex">
          <div class="block-item">
            {{ user.age }}
          </div>
        </div>
        <div class="block-title">Phone</div>
        <div class="block-flex">
          <div class="block-item">
            {{ user.phone }}
          </div>
        </div>
      </div>
      <div class="column2">
        <div class="block-title">Interests</div>
        <div class="block">
          <div v-for="(interest, index) in interests" :key="index" class="block-item">
            <input type="checkbox" v-if="user.interests && user.interests.includes(interest)" :value="interest"
                   checked class="disabled-checkbox">
            <input type="checkbox" v-else :value="interest" class="disabled-checkbox">
            <label :for="interest">{{ interest }}</label>
          </div>
        </div>
        <div class="block block-button">
          <div class="block-item">
            <button v-if="$store.state.currentUser?.friends.includes(user.id)"
                    @click="deleteFromFriends(user.id)">Delete from friends
            </button>
            <div class="block-2-button"
                v-else-if="$store.state?.senders && $store.state?.senders.includes(user.id)">
              <button @click="acceptFriendRequest(user.id)">Accept</button>
              <button @click="rejectFriendRequest(user.id)">Reject</button>
            </div>
            <button v-else-if="$store.state?.receivers && $store.state?.receivers.includes(user.id)"
                    @click="cancelFriendRequest(user.id)">
              Cancel
            </button>
            <button v-else @click="sendFriendRequest(user.id)">Add to friends</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sidebar">

  </div>
</template>
<script>
import api from '../api';
import {serverURL} from "@/api/axiosInstance";

export default {
  data() {
    return {
      serverURL,
      user: {},
      interests: ['sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
    }
  },
  methods: {
    async getUser() {
      this.user = await api.userApi.getUserById(this.$route.params.id);
    },
    async sendFriendRequest(receiverId) {
      const response = await api.friendRequestApi.sendFriendRequest({receiverId});
      if (response && response.status === 204) {
        this.$store.commit('setSentFriendRequests', [...this.$store.state.receivers, receiverId]);
      }
    },
    async cancelFriendRequest(receiverId) {
      const response = await api.friendRequestApi.cancelFriendRequest({receiverId});
      if (response && response.status === 204) {
        this.$store.commit('setSentFriendRequests', this.$store.state.receivers.filter(id => id !== receiverId));
      }
    },
    async acceptFriendRequest(senderId) {
      const response = await api.friendRequestApi.acceptFriendRequest({senderId});
      if (response && response.status === 204) {
        this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
        this.$store.commit('setCurrentUser', {
          ...this.$store.state.currentUser,
          friends: [...this.$store.state.currentUser.friends, senderId]
        });
      }
    },
    async rejectFriendRequest(senderId) {
      const response = await api.friendRequestApi.rejectFriendRequest({senderId});
      if (response && response.status === 204) {
        this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
      }
    },
    async deleteFromFriends(friendId) {
      const options = {
        params: {
          friendId,
        }
      };
      const response = await api.friendRequestApi.deleteFromFriends(options);
      if (response && response.status === 204) {
        this.$store.commit('setCurrentUser', {
          ...this.$store.state.currentUser,
          friends: this.$store.state.currentUser.friends.filter(id => id !== friendId)
        });
      }
    },
  },
  mounted() {
    this.getUser();
  },
}
</script>