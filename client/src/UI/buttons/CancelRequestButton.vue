<template>
  <button
    class="btn btn-info text-white"
    @click.prevent="cancelFriendRequest(id)"
  >
    Cancel request
  </button>
</template>

<script>
import api from '@/api';

export default {
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  methods: {
    async cancelFriendRequest(receiverId) {
      try {
        const response = await api.friendRequestApi.cancelFriendRequest({ receiverId });
        if (response?.status === 204) {
          this.$store.dispatch('cancelFriendRequest', receiverId);
        }
      } catch (error) {
        this.$emit('error', 'Failed to reject friendship request');
      }
    },
  },
};
</script>
