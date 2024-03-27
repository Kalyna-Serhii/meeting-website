<template>
  <header>
    <nav class="navbar bg-body-tertiary">
      <div class="container-xxl container-fluid">
        <router-link class="navbar-brand" to="/home">
          <img src="/ico.png" width="30" height="30"
               class="d-inline-block align-text-top">
            <span class="fw-semibold  ms-2">Meetings</span>
        </router-link>
        <div class="d-flex">
          <a class="btn btn-secondary link-underline
              link-underline-opacity-0"
              @click="logout">
            Logout
          </a>
          <router-link to="/my-account">
            <img src="/avatar.png" width="30" height="30"
               class="d-inline-block align-text-top ms-3 mt-1">
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>