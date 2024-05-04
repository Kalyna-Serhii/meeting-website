<template>
  <auth-layout>
    <alert ref="alert" />
    <form
      id="login-form"

      ref="form"
      action="#"
      class="needs-validation"
      novalidate
      @submit.prevent="submit"
    >
      <h2 class="text-center mb-3">
        Log in
      </h2>
      <div class="mb-3">
        <phone-input v-model="logData.phone" />
      </div>
      <div class="mb-3">
        <password-input
          v-model="logData.password"
          :required="true"
        />
      </div>
      <div class="d-grid mt-4 mb-2">
        <button
          class="btn btn-primary"
          type="submit"
        >
          Log in
        </button>
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
import AuthLayout from '@/layouts/AuthLayout.vue';
import Alert from '@/UI/Alert.vue';
import api from '@/api';
import helpers from '@/mixins/helpers';
import PhoneInput from '@/UI/inputs/PhoneInput.vue';
import PasswordInput from '@/UI/inputs/PasswordInput.vue';

export default {
  components: { PasswordInput, PhoneInput, Alert, AuthLayout },
  mixins: [helpers],

  data() {
    return {
      logData: {
        phone: '',
        password: '',
      },
    };
  },

  methods: {
    async submit() {
      if (this.validateForm()) {
        try {
          const response = await api.authApi.login(this.logData);
          if (response?.status === 204) {
            const { redirect } = this.$router.currentRoute.value.query;
            this.$router.push(redirect || '/');
          }
        } catch (error) {
          this.$refs.alert.alert(
            'danger',
            `${error.response.data.message ?? 'Something went wrong'}`,
          );
        }
      }
    },
  },
};
</script>
