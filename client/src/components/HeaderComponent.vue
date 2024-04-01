<template>
  <alert ref="alert"></alert>
  <header>
    <nav class="navbar bg-body-tertiary">
      <div class="container-xxl container-fluid">
        <router-link class="navbar-brand" to="/">
          <img src="/ico.png"
               width="30" height="30"
               class="d-inline-block align-text-top">
            <span class="fw-semibold  ms-2">Meetings</span>
        </router-link>
        <div class="d-flex">
          <a class="btn btn-secondary link-underline
              link-underline-opacity-0"
              @click="logout">
            Logout
          </a>
          <router-link to="/my-account" class="position-relative">
            <img :src="this.serverPhotoUrl + user.photoLink" width="40" height="40"
               class="d-inline-block align-text-top object-fit-cover rounded-5 ms-3">
            <span class="position-absolute translate-middle badge rounded-pill bg-danger"
                  v-if="this.$store.getters.friendshipRequestsCount > 0"
                style="top: 20%; left: 85%;">
              {{this.$store.getters.friendshipRequestsCount}}
            </span>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import helpers from "@/mixins/helpers";
import api from "@/api";

export default {
  mixins: [helpers],

  data() {
    return {
      user: ''
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    async getFriendsRequests() {
      try {
        this.$store.state.friendshipRequests =
            await api.friendRequestApi.getReceivedFriendRequests();
        this.$store.state.userFriendshipRequests =
            await api.friendRequestApi.getSentFriendRequests();
      } catch (error) {
        this.$refs.alert.alert('danger', 'Failed to load friendship requests')
      }
    }
  },
  created() {
    this.user = this.$store.state.currentUser;
    this.getFriendsRequests();
  },
}
</script>