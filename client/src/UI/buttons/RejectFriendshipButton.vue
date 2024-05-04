<template>
  <button
    v-if="small"
    class="btn btn-link link-danger p-0 ms-1"
    @click="rejectFriendRequest(id)"
  >
    <font-awesome-icon
      :icon="['far', 'circle-xmark']"
      size="xl"
    />
  </button>
  <button
    v-else
    class="btn btn-info text-white w-50"
    @click.prevent="rejectFriendRequest(id)"
  >
    Reject
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
    small: Boolean,
  },
  emits: 'rejected',

  methods: {
    async rejectFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.rejectFriendRequest({ senderId });
        if (response?.status === 204) {
          this.$store.dispatch('rejectFriendRequest', senderId);
          this.$emit('rejected');
        }
      } catch (error) {
        this.$emit('error', 'Failed to reject friendship request');
      }
    },
  },
};
</script>
