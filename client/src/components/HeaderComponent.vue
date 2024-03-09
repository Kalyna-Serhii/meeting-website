<template>
  <div class="component">
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
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
      <i class="fa-solid fa-bars mobile-menu"></i>
    </header>
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
    // localStorage.setItem('isAuth', true);
    // localStorage.removeItem('isAuth');

    // await api.authApi.login({
    //       phone: '0689225160',
    //       password: '12345678'
    //     }
    // )
    // await api.authApi.logout()
  },
};
</script>