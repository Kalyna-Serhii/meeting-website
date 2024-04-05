<template>
  <button class="btn btn-primary"
          @click.prevent="sendFriendRequest(id)">
    Add to friends
  </button>
</template>

<script>
import api from "@/api";

export default {
  props: {
    id: {Number, String}
  },

  methods: {
    async sendFriendRequest(receiverId) {
      try {
        const response = await api.friendRequestApi.sendFriendRequest({receiverId});
        if (response?.status === 204) {
          this.$store.dispatch('addFriend', receiverId);
        }
      } catch (error) {
        this.$emit('error', 'Failed to reject friendship request');
      }
    },
  }
}
</script>