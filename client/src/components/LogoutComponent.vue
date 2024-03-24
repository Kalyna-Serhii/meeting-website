<template>

</template>

<script>
import api from '../api';

export default {
  methods: {
    async logout() {
      try {
        await api.authApi.logout();
        localStorage.removeItem('isAuth');
        this.$store.dispatch('logout');
        this.$router.push('/auth');
      } catch (error) {
        this.$store.commit('setError', error?.response?.data.message);
      }
    },
  },
  async mounted() {
    await this.logout();
  },
};
</script>