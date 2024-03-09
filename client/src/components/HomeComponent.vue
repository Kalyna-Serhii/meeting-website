<template>
  <div class="content">
    <div class="content-title">Questionnaires</div>
    <div class="content-cards">
      <div class="card" v-for="(user, index) in users" :key="index">
        <router-link :to="users/user.id">
          <img :src="serverURL + /photos/ + user.photoLink" alt="User photo" class="card-img">
        </router-link>
        <div class="card-content">
          <div class="card-title">
            {{ user.name }}
          </div>
        </div>
        <div class="card-info">
          <div class="card-gender">
            {{ user.gender }}
          </div>
          <div class="card-age">
            {{ user.age }}
          </div>
        </div>
        <div class="card-friend-button">
          Send request
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import api from '@/api';
import {serverURL} from "@/api/axiosInstance";

export default {
  data() {
    return {
      serverURL,
      users: [],
      filter: {
        gender: null,
      },
    };
  },
  methods: {
    async getUsers() {
      this.users = await api.userApi.getUsers();
    },
  },
  async mounted() {
    await this.getUsers();
  },
}
</script>