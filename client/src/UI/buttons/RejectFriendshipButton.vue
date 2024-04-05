<template>
  <button class="btn btn-link link-danger p-0 ms-1"
          v-if="small"
          @click="rejectFriendRequest(id)">
    <font-awesome-icon :icon="['far', 'circle-xmark']" size="xl"/>
  </button>
  <button class="btn btn-info text-white w-50"
          v-else
          @click.prevent="rejectFriendRequest(id)">
    Reject
  </button>
</template>

<script>
import api from "@/api";
export default {
  emits: 'rejected',

  props: {
    id: {String, Number},
    small: Boolean
  },

  methods: {
    async rejectFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.rejectFriendRequest({senderId});
        if (response?.status === 204) {
          this.$store.dispatch('rejectFriendRequest', senderId);
          this.$emit('rejected')
        }
      } catch (error) {
        this.$emit('error', 'Failed to reject friendship request');
      }
    }
  }
}
</script>