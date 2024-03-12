<template>
  <header>
    <div class="logo">Logo</div>
    <nav class="menu">
      <router-link to="/">Home</router-link>
    </nav>
    <nav v-if="isAuth" class="auth">
      <router-link to="/logout">Logout</router-link>
      <router-link to="/profile">
        <img :src="serverURL + /photos/ + $store.state.currentUser?.photoLink" alt="avatar" class="avatar">
      </router-link>
    </nav>
    <nav v-else class="auth">
      <router-link to="/auth">Auth</router-link>
    </nav>
    <i class="fa-solid fa-bars mobile-menu"></i>
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
  },
  async mounted() {
    await this.getUser();
  },
};
</script>