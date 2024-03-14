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
            <input type="number" name="age" v-model="formData.age" required>
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
        friends: null,
      },
      interests: ['sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
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
      this.formData.friends = user.friends;
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
  },
  async mounted() {
    await this.getUser();
    initInputMask(this.$refs.phone);
  },
};
</script>