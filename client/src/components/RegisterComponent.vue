<template>
  <div class="content">
    <form ref="registerForm" @submit.prevent="submitRegisterForm" id="register-form">
      <div class="column1">
        <div class="block-title">Name</div>
        <div class="block">
          <div class="block-item">
            <input type="text" name="name" v-model="registerForm.name" required>
          </div>
        </div>
        <div class="block-title">Gender</div>
        <div class="block-flex">
          <div class="block-item">
            <input type="radio" name="gender" value="man" v-model="registerForm.gender" required>
            <label for="man">Man</label>
          </div>
          <div class="block-item">
            <input type="radio" name="gender" value="woman" v-model="registerForm.gender" required>
            <label for="woman">Woman</label>
          </div>
        </div>
        <div class="block-title">Age</div>
        <div class="block">
          <div class="block-item">
            <input type="number" name="age" v-model="registerForm.age" required>
          </div>
        </div>
        <div class="block-title">Phone</div>
        <div class="block">
          <div class="block-item">
            <input type="tel" name="phone" ref="phone" v-model.lazy="registerForm.phone" required>
          </div>
        </div>
        <div class="block-title">Password</div>
        <div class="block">
          <div class="block-item">
            <input type="password" name="password" v-model="registerForm.password" required>
          </div>
        </div>
        <div class="block-title">Photo</div>
        <div class="block">
          <div class="block-item">
            <input type="file" name="photo" accept="image/*" v-on:change="photoAdded()"
                   required>
          </div>
        </div>
      </div>
      <div class="column2">
        <div class="block-title">Interests</div>
        <div class="block">
          <div v-for="(interest, index) in interests" :key="index" class="block-item">
            <input type="checkbox" :value="interest">
            <label :for="interest">{{ interest }}</label>
          </div>
        </div>
        <div class="block block-button">
          <div class="block-item">
            <button type="submit">Register</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import api from '@/api';
import initInputMask from '../assets/initInputMask';

export default {
  data() {
    return {
      registerForm: {
        photo: false,
      },
      interests: ['sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
    }
  },
  methods: {
    photoAdded() {
      this.registerForm.photo = true;
    },
    async submitRegisterForm() {
      let checkedInterests = [];
      document.querySelectorAll('.block-item input[type="checkbox"]').forEach(function (checkbox) {
        if (checkbox.checked) {
          checkedInterests.push(checkbox.value);
        }
      });
      const formData = new FormData(this.$refs.registerForm);
      formData.append('interests', JSON.stringify(checkedInterests));
      const response = await api.authApi.register(formData);
      if (response && response.status === 201) {
        localStorage.setItem('isAuth', true);
        this.$router.push('/');
      }
    },
  },
  mounted() {
    initInputMask(this.$refs.phone);
  }
}
</script>