<template>
  <div class="content profile">
    <div class="content-title">Profile</div>
    <form ref="form" @submit.prevent="submitForm" id="profile-form">
      <div class="column1">
        <div class="block-title">Name</div>
        <div class="block">
          <div class="block-item">
            <input type="text" name="name" v-model="formData.name" required>
          </div>
        </div>
        <div class="block-title">Gender</div>
        <div class="block-flex">
          <div class="block-item">
            <input type="radio" name="gender" value="man" v-model="formData.gender" required>
            <label for="man">Man</label>
          </div>
          <div class="block-item">
            <input type="radio" name="gender" value="woman" v-model="formData.gender" required>
            <label for="woman">Woman</label>
          </div>
        </div>
        <div class="block-title">Age</div>
        <div class="block">
          <div class="block-item">
            <input type="number" name="age" min="1" max="99" v-model="formData.age" required>
          </div>
        </div>
        <div class="block-title">Phone</div>
        <div class="block">
          <div class="block-item">
            <input type="tel" name="phone" ref="phone" v-model="formData.phone" required>
          </div>
        </div>
        <div class="block-title">New password</div>
        <div class="block">
          <div class="block-item">
            <input type="password" name="newPassword">
          </div>
        </div>
        <div class="block-title">Avatar</div>
        <label v-if="!formData.newPhoto" class="block-flex" for="newPhoto">
          Press to choose new avatar
        </label>
        <label v-else class="block-flex" for="newPhoto">
          Avatar chosen
        </label>
        <input
            type="file"
            id="newPhoto"
            name="photo"
            accept="image/*"
            v-on:change="fileAdded()"
            style="display: none"
        />
      </div>

      <div class="column2">
        <div class="block-title">Interests</div>
        <div class="block">
          <div v-for="(interest, index) in interests" :key="index" class="block-item">
            <input type="checkbox" v-if="formData.interests && formData.interests.includes(interest)" :value="interest"
                   checked>
            <input type="checkbox" v-else :value="interest">
            <label :for="interest">{{ interest }}</label>
          </div>
        </div>
        <div class="block block-button">
          <button type="submit">Save</button>
        </div>
        <div class="block block-button tooltip-container">
          <button class="red-button" @click.prevent="warning = true">Delete account</button>
        </div>
        <v-dialog v-model="warning" max-width="500">
          <v-card>
            <v-card-title>Warning!</v-card-title>
            <v-card-text>
              Are you sure? it is irreversible!
            </v-card-text>
            <div class="block-flex block-button dialog-button">
              <button @click="warning = false">NO</button>
              <button class="red-button" @click="deleteUser(formData.id)">YES</button>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </form>
    <error-component></error-component>
  </div>

  <div class="sidebar">
    <div class="content-title">Received friend requests</div>
    <div class="block" v-if="usersData.length > 0">
      <div class="block-item-flex" v-for="(user, index) in usersData" :key="index">
        <router-link :to="/user/ + user.id">
          <img :src="serverURL + /photos/ + user.photoLink" alt="avatar" class="avatar">
        </router-link>
        <p>{{ user.name }}</p>
        <div class="card-button">
          <p @click="acceptFriendRequest(user.id)">Accept</p>
          <hr>
          <p @click="rejectFriendRequest(user.id)">Reject</p>
        </div>
      </div>
    </div>
    <div v-else class="block-flex">
      No friend requests
    </div>
  </div>
</template>
<script>
import api from "../api";
import {serverURL} from "@/api/axiosInstance";
import initInputMask from '../assets/initInputMask';
import ErrorComponent from './ErrorComponent.vue'

export default {
  data() {
    return {
      serverURL,
      formData: {
        id: null,
        photoLink: null,
        newPhoto: null,
        name: null,
        gender: null,
        age: null,
        phone: null,
        interests: null,
      },
      interests: ['sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
      usersData: [],
      error: false,
      errorMessage: null,
      warning: false,
    };
  },
  methods: {
    async getUser() {
      try {
        const user = await api.userApi.getUserByToken();
        this.formData.id = user.id;
        this.formData.photoLink = user.photoLink;
        this.formData.name = user.name;
        this.formData.gender = user.gender;
        this.formData.age = user.age;
        this.formData.phone = user.phone;
        this.formData.interests = user.interests;
      } catch (error) {
        this.$store.commit('setError', error?.response?.data.message);
      }
    },
    fileAdded() {
      this.formData.newPhoto = true;
    },
    async submitForm() {
      let checkedInterests = [];
      document.querySelectorAll('.block-item input[type="checkbox"]:checked').forEach(checkbox =>
          checkedInterests.push(checkbox.value)
      );
      const formData = new FormData(this.$refs.form);
      formData.append('interests', JSON.stringify(checkedInterests));
      try {
        const response = await api.userApi.updateUser(formData);
        if (response?.status === 200) {
          this.$router.push('/');
        }
      } catch (error) {
        this.$store.commit('setError', error?.response?.data.message);
      }
    },
    async getUsersData() {
      const usersIds = this.$store.state.senders;
      for (const userId of usersIds) {
        try {
          const user = await api.userApi.getUserById(userId);
          this.usersData.push(user);
        } catch (error) {
          this.$store.commit('setError', error?.response?.data.message);
        }
      }
    },
    async acceptFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.acceptFriendRequest({senderId});
        if (response?.status === 204) {
          this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
          this.$store.commit('setCurrentUser', {
            ...this.$store.state.currentUser,
            friends: [...this.$store.state.currentUser.friends, senderId]
          });
          this.usersData = this.usersData.filter(user => user.id !== senderId);
        }
      } catch (error) {
        this.$store.commit('setError', error?.response?.data.message);
      }
    },
    async rejectFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.rejectFriendRequest({senderId});
        if (response?.status === 204) {
          this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
          this.usersData = this.usersData.filter(user => user.id !== senderId);
        }
      } catch (error) {
        this.$store.commit('setError', error?.response?.data.message);
      }
    },
    async deleteUser(userId) {
      try {
        const response = await api.userApi.deleteUser({userId});
        if (response?.status === 204) {
          localStorage.removeItem('isAuth');
          this.$store.dispatch('logout');
          this.$router.push('/auth');
        }
      } catch (error) {
        this.$store.commit('setError', error?.response?.data.message);
      }
    }
  },
  async mounted() {
    await this.getUser();
    initInputMask(this.$refs.phone);
    await this.getUsersData();
  },
  components: {
    ErrorComponent
  },
};
</script>