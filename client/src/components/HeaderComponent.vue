<template>
  <header>
    <div class="logo">Logo</div>
    <nav class="menu">
      <router-link to="/">Home</router-link>
    </nav>
    <nav v-if="isAuth" class="auth">
      <router-link to="/logout">Logout</router-link>
      <router-link to="/profile">
        <img :src="serverURL + /photos/ + user.photoLink" alt="avatar" class="avatar">
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
      user: {},
      isAuth: localStorage.getItem('isAuth') || null,
    };
  },
  methods: {
    async getUser() {
      this.user = await api.userApi.getUserByToken();
    },
  },
  async mounted() {
    await this.getUser();
  },
};
</script>