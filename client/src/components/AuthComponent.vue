<template>
  <div class="content">
    <div class="content-title">Registration</div>
    <form ref="registerForm" @submit.prevent="submitRegisterForm" id="register-form">
      <div class="column1">
        <div class="block-title">Name</div>
        <div class="block">
          <div class="block-item">
            <input type="text" name="name" required>
          </div>
        </div>
        <div class="block-title">Gender</div>
        <div class="block-flex">
          <div class="block-item">
            <input type="radio" name="gender" value="man" required>
            <label for="man">Man</label>
          </div>
          <div class="block-item">
            <input type="radio" name="gender" value="woman" required>
            <label for="woman">Woman</label>
          </div>
        </div>
        <div class="block-title">Age</div>
        <div class="block">
          <div class="block-item">
            <input type="number" name="age" required>
          </div>
        </div>
        <div class="block-title">Phone</div>
        <div class="block">
          <div class="block-item">
            <input type="tel" name="phone" ref="phone1" required>
          </div>
        </div>
        <div class="block-title">Password</div>
        <div class="block">
          <div class="block-item">
            <input type="password" name="password" required>
          </div>
        </div>
        <div class="block-title">Photo</div>
        <div class="block">
          <div class="block-item">
            <input type="file" name="photo" accept="image/*"
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

  <div class="sidebar">
    <div class="content-title">Login</div>
    <form ref="loginForm" @submit.prevent="submitLoginForm" id="login-form">
      <div class="block-title">Phone</div>
      <div class="block">
        <div class="block-item">
          <input type="tel" name="phone" ref="phone2" required>
        </div>
      </div>
      <div class="block-title">Password</div>
      <div class="block">
        <div class="block-item">
          <input type="password" name="password" required>
        </div>
      </div>
      <div class="block block-button">
        <div class="block-item">
          <button type="submit">Login</button>
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
      interests: ['sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
    }
  },
  methods: {
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
    async submitLoginForm() {
      const formData = new FormData(this.$refs.loginForm);
      const response = await api.authApi.login({
        phone: formData.get('phone'),
        password: formData.get('password')
      });
      if (response && response.status === 204) {
        localStorage.setItem('isAuth', true);
        this.$router.push('/');
      }
    },
  },
  mounted() {
    initInputMask(this.$refs.phone1);
    initInputMask(this.$refs.phone2);
  }
}
</script>