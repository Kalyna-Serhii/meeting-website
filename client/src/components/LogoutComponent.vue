<template>

</template>

<script>
import api from '../api';

export default {
  methods: {
    async logout() {
      await api.authApi.logout();
      localStorage.removeItem('isAuth');
      this.$store.dispatch('logout');
      this.$router.push('/auth');
    },
  },
  async mounted() {
    await this.logout();
  },
};
</script>