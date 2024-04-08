<template>
  <button class="btn btn-link link-success p-0 ms-1"
          v-if="small"
          @click="acceptFriendRequest(id)">
    <font-awesome-icon :icon="['far', 'circle-check']" size="xl"/>
  </button>
  <button class="btn btn-primary text-white w-50"
          v-else
          @click.prevent="acceptFriendRequest(id)">
    Accept
  </button>
</template>

<script>
import api from "@/api";
export default {
  emits: 'accepted',

  props: {
    id: {String, Number},
    small: Boolean
  },

  methods: {
    async acceptFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.acceptFriendRequest({senderId});
        if (response?.status === 204) {
          this.$store.dispatch('acceptFriendRequest', senderId);
          this.$emit('accepted');
        }
      } catch (error) {
        this.$emit('error', 'Failed to reject friendship request');
      }
    },
  }
}
</script>