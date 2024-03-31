<template>
  <auth-layout wide="true">
    <alert ref="alert"></alert>
    <form action="#"
          @submit.prevent="submit"
          ref="form"
          class="needs-validation"
          id="register-form"
          novalidate>
      <h2 class="text-center mb-3">Registration</h2>
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="mb-3">
              <name-input></name-input>
            </div>
            <label class="form-label ms-2" for="gender">Gender</label>
            <div class="mb-3">
              <gender-input></gender-input>
            </div>
            <div class="mb-3">
              <age-input></age-input>
            </div>
            <div class="mb-3">
              <phone-input></phone-input>
            </div>
            <div class="mb-3">
              <password-input></password-input>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <photo-input :default-img-url="defaultPhotoUrl"></photo-input>
            <interests-list
                @category-checked="(i) => this.interests = i">
            </interests-list>
          </div>
          <div class="row justify-content-center">
            <div class="d-grid w-100 mt-4 mb-2">
              <button class="btn btn-primary" type="submit">Register</button>
              <router-link
                  to="/login"
                  class="link-secondary mt-2 text-center"
              >
                Log In
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import Alert from "@/UI/Alert.vue";
import api from "@/api";
import helpers from "@/mixins/helpers";
import InterestsList from "@/UI/InterestsList.vue";
import PhotoInput from "@/UI/PhotoInput.vue";
import PasswordInput from "@/UI/PasswordInput.vue";
import PhoneInput from "@/UI/PhoneInput.vue";
import AgeInput from "@/UI/AgeInput.vue";
import GenderInput from "@/UI/GenderInput.vue";
import NameInput from "@/UI/NameInput.vue";

export default {
  components: {NameInput, GenderInput, AgeInput, PhoneInput, PasswordInput, PhotoInput, InterestsList, Alert, AuthLayout},
  mixins: [helpers],
  data() {
    return {
      interests: [],
      defaultPhotoUrl: '/placeholder.jpg'
    }
  },

  methods: {
    async submit() {
      if (this.interests.length === 0) {
        this.$refs.alert.alert('warning', 'Choose at least one interest');
        return;
      }
      if (this.validateForm()) {
        try {
          const formData = new FormData(this.$refs.form);
          formData.append('interests', JSON.stringify(this.interests));
          const response = await api.authApi.register(formData);
          if (response.status === 201) {
            this.$router.push('/');
          }
        } catch (error) {
          this.$refs.alert.alert('danger', 'Something went wrong');
        }
      }
    }
  }
}
</script>