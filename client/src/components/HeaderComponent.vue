<template>
  <div>
    <alert ref="alert" />

    <header>
      <nav class="navbar bg-body-tertiary">
        <div class="container-xxl container-fluid">
          <router-link
            class="navbar-brand"
            to="/"
          >
            <img
              src="/ico.png"
              width="30"
              height="30"
              class="d-inline-block align-text-top"
              alt="ico"
            >
            <span class="fw-semibold  ms-2">Meetings</span>
          </router-link>
          <div class="d-flex">
            <a
              class="btn btn-secondary link-underline
              link-underline-opacity-0"
              @click="logout"
            >
              Logout
            </a>
            <router-link
              to="/my-account"
              class="position-relative"
            >
              <img
                :src="$store.state.userPhoto ?? serverPhotoUrl + user.photoLink"
                width="40"
                height="40"
                class="d-inline-block align-text-top object-fit-cover rounded-5 ms-3"
                alt="user photo"
              >
              <span
                v-if="$store.getters.friendshipRequestsCount > 0"
                class="position-absolute translate-middle badge rounded-pill bg-danger"
                style="top: 20%; left: 85%;"
              >
                {{ $store.getters.friendshipRequestsCount }}
              </span>
            </router-link>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers';

export default {
  mixins: [helpers],

  data() {
    return {
      user: '',
    };
  },
  created() {
    this.user = this.$store.state.currentUser;
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
