<template>
  <div class="content">
    <div class="content-title">Questionnaires</div>
    <div class="content-cards" v-if="users.length > 0">
      <div class="card" v-for="(user, index) in users" :key="index">
        <router-link :to="/users/ + user.id">
          <img v-if="user.photoLink" :src="serverURL + /photos/ + user.photoLink" alt="User photo" class="card-img">
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
        <div class="card-button">
          Send request
        </div>
      </div>
    </div>

    <div class="content-title" v-else>
        No questionnaires found
    </div>
  </div>

  <div class="sidebar">
    <form ref="form" @submit.prevent="submitForm">
      <div class="block-title">Gender</div>
      <div class="block-flex">
        <div class="block-item">
          <input type="radio" name="all" value="all" v-model="filter.gender" checked>
          <label for="all">All</label>
        </div>
        <div class="block-item">
          <input type="radio" name="man" value="man" v-model="filter.gender">
          <label for="man">Man</label>
        </div>
        <div class="block-item">
          <input type="radio" name="woman" value="woman" v-model="filter.gender">
          <label for="woman">Woman</label>
        </div>
      </div>
      <div class="block-title">Age</div>
      <div class="block-flex">
        <div class="block-item">
          <label for="min-age">From</label>
          <input type="number" name="min-age" value="minAge" min="1" max="99" v-model="filter.minAge">
        </div>
        <div class="block-item">
          <label for="max-age">To</label>
          <input type="number" name="max-age" value="maxAge" min="1" max="99" v-model="filter.maxAge">
        </div>
      </div>
      <div class="block-title">Interests</div>
      <div class="block">
        <div v-for="(interest, index) in interests" :key="index" class="block-item">
          <input type="checkbox" :name="interest" :value="interest">
          <label :for="interest">{{interest}}</label>
        </div>
      </div>
      <div class="block block-button">
        <div class="block-item">
          <button type="submit">Search</button>
        </div>
      </div>
    </form>
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
      interests: ['interest1', 'interest3', 'sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
      filter: {
        gender: 'all',
        minAge: null,
        maxAge: null,
        interests: [],
      },
    };
  },
  methods: {
    async getUsers() {
      this.users = await api.userApi.getUsers();
    },
    async submitForm() {
      let checkedInterests = [];
      document.querySelectorAll('.block-item input[type="checkbox"]').forEach(function(checkbox) {
        if (checkbox.checked) {
          checkedInterests.push(checkbox.value);
        }
      });
      const options = {
        params: {
          gender: this.filter.gender,
          minAge: this.filter.minAge,
          maxAge: this.filter.maxAge,
          interests: checkedInterests,
        }
      };
      this.users = await api.userApi.getUsers(options);
    },
  },
  async mounted() {
    await this.getUsers();
  },
}
</script>