<template>
  <button class="btn btn-danger"
          @click.prevent="deleteFromFriends(id)">
    Delete from friends
  </button>
</template>

<script>
import api from "@/api";

export default {
  props: {
    id: {String, Number}
  },
  methods: {
    async deleteFromFriends(friendId) {
      const options = {params: {friendId}};
      try {
        const response = await api.friendRequestApi.deleteFromFriends(options);
        if (response.status === 204) {
          this.$store.dispatch('deleteFromFriends', friendId)
        }
      } catch (error) {
        this.$emit('error', 'Failed to delete from friends');
      }
    },
  }
}
</script>