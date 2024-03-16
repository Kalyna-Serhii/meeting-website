<template>
  <div class="content">
    <div class="content-title">Questionnaires</div>
    <div class="content-cards" v-if="users && users.length > 0">
      <div class="card" v-for="(user, index) in users" :key="index">
        <router-link :to="/user/ + user.id">
          <img v-if="user.photoLink" :src="serverURL + /photos/ + user.photoLink" alt="User photo" class="card-img">
        </router-link>
        <div class="card-content">
          <div class="card-title">
            {{ user.name }}
          </div>
        </div>
        <div class="card-info">
          <div class="card-gender">
            {{ user.gender }}
          </div>
          <div class="card-age">
            {{ user.age }} y.o.
          </div>
        </div>
        <div class="card-button">
          <p v-if="$store.state.currentUser?.friends.includes(user.id)"
             @click="deleteFromFriends(user.id)">Delete from friends</p>
          <div
              v-else-if="$store.state?.senders && $store.state?.senders.includes(user.id)">
            <p @click="acceptFriendRequest(user.id)">Accept</p>
            <hr>
            <p @click="rejectFriendRequest(user.id)">Reject request</p>
          </div>
          <p v-else-if="$store.state?.receivers && $store.state?.receivers.includes(user.id)"
             @click="cancelFriendRequest(user.id)">
            Cancel request
          </p>
          <p v-else @click="sendFriendRequest(user.id)">Add to friends</p>
        </div>
      </div>
    </div>

    <div class="content-title content-cards" v-else>
      No questionnaires found
    </div>

    <div class="pagination">
      <button @click="pageNumber = 1; getUsers()" :disabled="pageNumber === 1" class="card-button">First</button>
      <button @click="pageNumber -= 1; getUsers()" :disabled="pageNumber === 1" class="card-button">Previous</button>
      <button @click="pageNumber += 1; getUsers()" :disabled="pageNumber * pageSize >= totalCount" class="card-button">Next</button>
    </div>

  </div>

  <div class="sidebar">
    <form ref="form" @submit.prevent="getUsers">
      <div class="block-title">Gender</div>
      <div class="block-flex">
        <div class="block-item">
          <input type="radio" name="all" value="all" v-model="filter.gender" checked>
          <label for="all">All</label>
        </div>
        <div class="block-item">
          <input type="radio" name="man" value="man" v-model="filter.gender">
          <label for="man">Man</label>
        </div>
        <div class="block-item">
          <input type="radio" name="woman" value="woman" v-model="filter.gender">
          <label for="woman">Woman</label>
        </div>
      </div>
      <div class="block-title">Age</div>
      <div class="block-flex">
        <div class="block-item">
          <label for="min-age">From</label>
          <input type="number" name="min-age" value="minAge" min="1" max="99" v-model="filter.minAge">
        </div>
        <div class="block-item">
          <label for="max-age">To</label>
          <input type="number" name="max-age" value="maxAge" min="1" max="99" v-model="filter.maxAge">
        </div>
      </div>
      <div class="block-title">Interests</div>
      <div class="block">
        <div v-for="(interest, index) in interests" :key="index" class="block-item">
          <input type="checkbox" :name="interest" :value="interest">
          <label :for="interest">{{ interest }}</label>
        </div>
      </div>
      <div class="block block-button">
          <button type="submit">Search</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/api';
import {serverURL} from "@/api/axiosInstance";

export default {
  data() {
    return {
      serverURL,
      users: [],
      interests: ['sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
        'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
        'religion', 'philosophy'],
      filter: {
        gender: 'all',
        minAge: null,
        maxAge: null,
        interests: [],
      },
      pageNumber: 1,
      pageSize: 8,
      totalCount: 0,
    };
  },
  methods: {
    async getUsers() {
      let checkedInterests = [];
      document.querySelectorAll('.block-item input[type="checkbox"]:checked').forEach(checkbox =>
          checkedInterests.push(checkbox.value)
      );
      this.calculatePageSize();
      const options = {
        params: {
          gender: this.filter.gender,
          minAge: this.filter.minAge,
          maxAge: this.filter.maxAge,
          interests: checkedInterests,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        }
      };
      const response = await api.userApi.getUsers(options);
      this.users = response.users;
      this.totalCount = response.totalCount;
      window.scrollTo(0, 0);
    },
    async sendFriendRequest(receiverId) {
      const response = await api.friendRequestApi.sendFriendRequest({receiverId});
      if (response && response.status === 204) {
        this.$store.commit('setSentFriendRequests', [...this.$store.state.receivers, receiverId]);
      }
    },
    async cancelFriendRequest(receiverId) {
      const response = await api.friendRequestApi.cancelFriendRequest({receiverId});
      if (response && response.status === 204) {
        this.$store.commit('setSentFriendRequests', this.$store.state.receivers.filter(id => id !== receiverId));
      }
    },
    async acceptFriendRequest(senderId) {
      const response = await api.friendRequestApi.acceptFriendRequest({senderId});
      if (response && response.status === 204) {
        this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
        this.$store.commit('setCurrentUser', {
          ...this.$store.state.currentUser,
          friends: [...this.$store.state.currentUser.friends, senderId]
        });
      }
    },
    async rejectFriendRequest(senderId) {
      const response = await api.friendRequestApi.rejectFriendRequest({senderId});
      if (response && response.status === 204) {
        this.$store.commit('setReceivedFriendRequests', this.$store.state.senders.filter(id => id !== senderId));
      }
    },
    async deleteFromFriends(friendId) {
      const options = {
        params: {
          friendId,
        }
      };
      const response = await api.friendRequestApi.deleteFromFriends(options);
      if (response && response.status === 204) {
        this.$store.commit('setCurrentUser', {
          ...this.$store.state.currentUser,
          friends: this.$store.state.currentUser.friends.filter(id => id !== friendId)
        });
      }
    },
    calculatePageSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 980) {
        this.pageSize = 4;
      } else if (screenWidth < 1190) {
        this.pageSize = 6;
      } else {
        this.pageSize = 8;
      }
    },
  },
  async mounted() {
    await this.getUsers();
  },
}
</script>