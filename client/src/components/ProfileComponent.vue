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
            <input type="password" name="newPassword" required>
          </div>
        </div>
        <div class="block-title">Avatar</div>
        <div class="block-flex">
          <div class="block-item">
            <img v-if="!formData.newPhoto" :src="serverURL + /photos/ + formData.photoLink" alt="avatar" class="avatar">
            <img v-else :src="serverURL + /photos/ + formData.photoLink" alt="avatar" class="avatar grey-avatar">
          </div>
        </div>
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
          <div class="block-item">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="sidebar">
    <div class="content-title">Received friend requests</div>
    <div class="block-flex" v-if="usersData.length > 0">
      <div class="block-item" v-for="(user, index) in usersData" :key="index">
        <img :src="serverURL + /photos/ + user.photoLink" alt="avatar" class="avatar">
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

export default {
  data() {
    return {
      serverURL,
      formData: {
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
    };
  },
  methods: {
    async getUser() {
      const user = await api.userApi.getUserByToken();
      this.formData.photoLink = user.photoLink;
      this.formData.name = user.name;
      this.formData.gender = user.gender;
      this.formData.age = user.age;
      this.formData.phone = user.phone;
      this.formData.interests = user.interests;
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
      const response = await api.userApi.updateUser(formData);
      if (response && response.status === 200) {
        this.$router.push('/');
      }
    },
    async getUsersData() {
      const usersIds = this.$store.state.senders;
      for (const userId of usersIds) {
        const user = await api.userApi.getUserById(userId);
        this.usersData.push(user);
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
        this.usersData = this.usersData.filter(user => user.id !== senderId);
      }
    },
    async rejectFriendRequest(senderId) {
      const response = await api.friendRequestApi.rejectFriendRequest({senderId});
      if (response && response.status === 204) {
        this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
        this.usersData = this.usersData.filter(user => user.id !== senderId);
      }
    },
  },
  async mounted() {
    await this.getUser();
    initInputMask(this.$refs.phone);
    await this.getUsersData();
  },
};
</script>