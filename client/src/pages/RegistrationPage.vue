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
          <!--        User data -->
          <div class="col-md-6 col-sm-12">

            <!--      Name -->
            <div class="mb-3">
              <label for="phone" class="form-label ms-2">Name</label>
              <input class="form-control"
                     id="name"
                     name="name"
                     placeholder="Enter name"
                     minlength="2"
                     required>
              <div class="invalid-feedback">
                Please enter your name
              </div>
            </div>

            <!--      Gender -->
            <label class="form-label ms-2" for="gender">Gender</label>
            <div class="mb-3 d-flex">
              <div class="form-check" id="gender">
                <input class="form-check-input"
                       type="radio"
                       name="gender"
                       id="man"
                       required
                       value="man"
                >
                <label class="form-check-label" for="man">Man</label>
              </div>
              <div class="form-check ms-3">
                <input class="form-check-input"
                       type="radio"
                       name="gender"
                       id="woman"
                       value="woman"
                >
                <label class="form-check-label" for="woman">Woman</label>
              </div>
              <div class="invalid-feedback">
                Please choose your gender
              </div>
            </div>


              <!--      Age -->
            <div class="mb-3">
              <label for="age" class="form-label ms-2">Age</label>
              <input class="form-control"
                     id="age"
                     name="age"
                     placeholder="Enter age"
                     type="number"
                     min="1" max="99"
                     required>
              <div class="invalid-feedback">
                Please enter your age
              </div>
            </div>

            <!--      Phone number -->
            <div class="mb-3">
              <label for="phone" class="form-label ms-2">Phone</label>
              <input class="form-control"
                     id="phone"
                     name="phone"
                     placeholder="Enter phone"
                     ref="phone"
                     type="tel"
                     pattern="^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$"
                     required>
              <div class="invalid-feedback">
                Please enter phone
              </div>
            </div>

            <!--      Password -->
            <div class="mb-3">
              <label for="password" class="form-label  ms-2">Password</label>
              <input class="form-control"
                     id="password"
                     type="password"
                     name="password"
                     pattern="^(?=.{4,}$).*"
                     placeholder="Enter password"
                     required>
              <div class="invalid-feedback">
                Please enter password
              </div>
            </div>
          </div>

          <!--        Photo -->
          <div class="col-md-6 col-sm-12">
            <div class="row justify-content-center">
              <div class="col-md-8 col-sm-12">
                <img class="img-fluid" v-if="imgUrl" :src="imgUrl" alt="dish">
                <input class="form-control my-2"
                       type="file"
                       name="photo"
                       accept=".jpg, .jpeg, .png"
                       required
                       @change="handleFileChange"
                >
              </div>
            </div>

<!--            Interests -->
            <div class="row" id="categories">
              <label class="form-label text-center" for="categories">
                Categories
              </label>
              <div class="col-5 offset-1 form-check"
                   v-for="(interest, i) in this.$store.state.interests">
                <input class="form-check-input"
                       type="checkbox" :value="interest"
                       :id="`interest-${i}`">
                <label class="form-check-label" :for="`interest-${i}`">{{interest}}</label>
              </div>
            </div>
          </div>

<!--          Buttons -->
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

export default {
  components: {Alert, AuthLayout},
  mixins: [helpers],
  data() {
    return {
      imgUrl: ''
    }
  },

  methods: {
    async submit() {
      const checkedInterests = [];
      document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox =>
          checkedInterests.push(checkbox.value)
      );
      if (checkedInterests.length === 0) {
        this.$refs.alert.alert('warning', 'Choose at least one interest');
        return;
      }
      if (this.validateForm()) {
        try {
          const formData = new FormData(this.$refs.form);
          formData.append('interests', JSON.stringify(checkedInterests));
          // formData.append('photo', this.photo);

          for (const [key, value] of formData) {
            console.log(`key: ${key}, value: ${value}`)
          }

          const response = await api.authApi.register(formData);
          if (response.status === 201) {
            localStorage.setItem('isAuth', true);
            this.$router.push('/');
          }
        } catch (error) {
          this.$refs.alert.alert('danger', 'Something went wrong');
        }
      }
    },
    handleFileChange(event) {
      this.photo = event.target.files[0];
      this.imgUrl = this.photo
          ? URL.createObjectURL(this.photo)
          : this.defaultPhotoUrl;
      },
  },
  computed: {
    defaultPhotoUrl() {
      return '/placeholder.jpg'
    }
  },
  mounted() {
    this.addPhoneMask(this.$refs.phone);
    this.imgUrl = this.defaultPhotoUrl;
  }
}
</script>