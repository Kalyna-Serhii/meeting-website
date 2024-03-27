<template>
  <auth-layout>
    <alert ref="alert"></alert>
    <form action="#"
          @submit.prevent="submit"
          ref="form"
          class="needs-validation"
          id="login-form"
          novalidate>
      <h2 class="text-center mb-3">Log in</h2>
      <div class="mb-3">
        <label for="phone" class="form-label ms-2">Phone</label>
        <input class="form-control"
               v-model.lazy="logData.phone"
               id="phone"
               placeholder="Enter phone"
               ref="phone"
               type="tel"
               pattern="^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$"
               required>
        <div class="invalid-feedback">
          Please enter phone
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label  ms-2">Password</label>
        <input class="form-control"
               v-model="logData.password"
               id="password"
               type="password"
               placeholder="Enter password"
               pattern="^(?=.{4,}$).*"
               required>
        <div class="invalid-feedback">
          Please enter password
        </div>
      </div>
      <div class="d-grid mt-4 mb-2">
        <button class="btn btn-primary" type="submit">Log in</button>
        <router-link
            to="/register"
            class="link-secondary mt-2 text-center"
        >
          Register
        </router-link>
      </div>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import Alert from "@/UI/Alert.vue";
import api from "@/api";
import helpers from "@/mixins/helpers";

export default {
  components: {Alert, AuthLayout},
  mixins: [helpers],

  data() {
    return {
      logData : {
        phone: '',
        password: ''
      }
    }
  },

  methods: {
    async submit() {
      if (this.validateForm()) {
        try {
          const response = await api.authApi.login(this.logData);
          if (response?.status === 204) {
            localStorage.setItem('isAuth', true);
            const redirect = this.$router.currentRoute.value.query.redirect;
            console.log(redirect)
            this.$router.push(redirect ? redirect : '/');
          }
        } catch (error) {
          this.$refs.alert.alert('danger', 'Invalid username or password');
        }
      }
    }
  },

  mounted() {
    this.addPhoneMask(this.$refs.phone)
  }
}
</script>