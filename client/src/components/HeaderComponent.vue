<template>
  <header>
    <div class="logo">Logo</div>
    <nav class="menu">
      <router-link to="/">Home</router-link>
    </nav>
    <nav v-if="isAuth && $store.state.currentUser?.photoLink" class="auth">
      <router-link to="/logout">Logout</router-link>
      <router-link to="/profile" class="avatar-container">
        <img :src="serverURL + /photos/ + $store.state.currentUser?.photoLink" alt="avatar" class="avatar">
        <span v-if="$store.state?.senders && $store.state?.senders.length>0" class="badge">
          {{ $store.state.senders.length }}
        </span>
      </router-link>
    </nav>
    <nav v-else class="auth">
      <router-link to="/auth">Auth</router-link>
    </nav>
  </header>
</template>

<script>
import api from '../api';
import {serverURL} from "@/api/axiosInstance";

export default {
  data() {
    return {
      serverURL,
      isAuth: localStorage.getItem('isAuth') || null,
    };
  },
  methods: {
    async getUser() {
      const user = await api.userApi.getUserByToken();
      if (user) {
        this.$store.commit('setCurrentUser', user);
      }
    },
    async getFriendsRequests() {
      const senders = await api.friendRequestApi.getReceivedFriendRequests();
      const receivers = await api.friendRequestApi.getSentFriendRequests();

      this.$store.commit('setReceivedFriendRequests', senders);
      this.$store.commit('setSentFriendRequests', receivers);
    },
  },
  async mounted() {
    this.getUser();
    await this.getFriendsRequests();
  },
};
</script>