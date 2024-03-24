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
    <error-component></error-component>
  </header>
</template>

<script>
import api from '../api';
import {serverURL} from "@/api/axiosInstance";
import ErrorComponent from './ErrorComponent.vue'

export default {
  data() {
    return {
      serverURL,
      isAuth: localStorage.getItem('isAuth') || null,
      error: false,
      errorMessage: null,
    };
  },
  methods: {
    async getUser() {
      try {
        const user = await api.userApi.getUserByToken();
        if (user) {
          this.$store.commit('setCurrentUser', user);
        }
      } catch (error) {
        if (error?.response.status !== 401) {
          this.$store.commit('setError', error?.response?.data.message);
        }
      }
    },
    async getFriendsRequests() {
      try {
        const senders = await api.friendRequestApi.getReceivedFriendRequests();
        this.$store.commit('setReceivedFriendRequests', senders);
      } catch (error) {
        if (error?.response.status !== 401) {
          this.$store.commit('setError', error?.response?.data.message);
        }
      }

      try {
        const receivers = await api.friendRequestApi.getSentFriendRequests();
        this.$store.commit('setSentFriendRequests', receivers);
      } catch (error) {
        if (error?.response.status !== 401) {
          this.$store.commit('setError', error?.response?.data.message);
        }
      }
    },
  },
  async mounted() {
    this.getUser();
    await this.getFriendsRequests();
  },
  components: {
    ErrorComponent
  },
};
</script>