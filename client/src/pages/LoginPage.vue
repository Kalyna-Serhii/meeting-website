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
        <phone-input v-model="logData.phone"></phone-input>
      </div>
      <div class="mb-3">
        <password-input v-model="logData.password" :required="true"></password-input>
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
import PhoneInput from "@/UI/inputs/PhoneInput.vue";
import PasswordInput from "@/UI/inputs/PasswordInput.vue";

export default {
  components: {PasswordInput, PhoneInput, Alert, AuthLayout},
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
            const redirect = this.$router.currentRoute.value.query.redirect;
            this.$router.push(redirect ? redirect : '/');
          }
        } catch (error) {
          this.$refs.alert.alert('danger',
              `${error.response.data.message ?? 'Something went wrong'}`);
        }
      }
    }
  }
}
</script>