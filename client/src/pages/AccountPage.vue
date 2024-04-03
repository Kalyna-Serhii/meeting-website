<template>
  <alert ref="alert"></alert>
  <main-layout>
    <div class="container-xxl container-fluid my-5">
      <div class="row">
        <div :class="[currentUserProfile ? 'col-md-8 col-sm-12' : 'col-10 offset-1']">
          <div class="main-block h-100">
            <form action="#"
                  @submit.prevent="submit"
                  ref="form"
                  class="needs-validation"
                  id="account-form"
                  novalidate>
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 col-md-5 col-sm-12">
                    <div class="mb-3">
                      <name-input v-model="user.name"
                          :readonly="!currentUserProfile">
                      </name-input>
                    </div>
                    <label class="form-label ms-2" for="user-gender">Gender</label>
                    <div class="mb-3">
                      <gender-input v-model="user.gender"
                          id-prefix="user"
                          :readonly="!currentUserProfile">
                      </gender-input>
                    </div>
                    <div class="mb-3">
                      <age-input v-model="user.age"
                           :id="'user-age'"
                           :readonly="!currentUserProfile">
                      </age-input>
                    </div>
                    <div class="mb-3">
                      <phone-input v-model="user.phone"
                             :readonly="!currentUserProfile">
                      </phone-input>
                    </div>
                    <div class="mb-3" v-if="currentUserProfile">
                      <password-input v-model="user.password"
                              :placeholder="'Enter new password'">
                      </password-input>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-7 col-sm-12">
                    <photo-input v-if="user.photoLink !== ''"
                         :default-img-url="defaultPhotoUrl"
                         :user-img="this.serverPhotoUrl + user.photoLink"
                         :readonly="!currentUserProfile">
                    </photo-input>
                    <interests-list
                        @interest-checked="(i) => this.interests = i"
                        :interests="user.interests"
                        :readonly="!currentUserProfile">
                    </interests-list>
                  </div>
                  <div class="row justify-content-center">
                    <div class="d-grid w-100 mt-4 mb-2">
                      <button class="btn btn-primary" type="submit"
                              v-if="currentUserProfile">
                        Submit changes
                      </button>
                      <router-link to="/"
                           :class="[currentUserProfile ? 'link-secondary mt-2 text-center'
                                                       : 'btn btn-primary']">
                        Home
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div :class="[currentUserProfile ? 'col-md-4' : 'd-none']">
          <div class="main-block h-100">
            <h5 class="text-center mb-4">Friendship requests</h5>
            <div v-for="user in friendshipRequestsUsers" :key="user.id" class="container-fluid">
              <div class="row main-block py-3 px-0 mb-3" style="background-color: #ebeced">
                <div class="col-9 overflow-hidden">
                  <router-link class="navbar-brand d-flex" :to="`/user/${user.id}`">
                    <img :src="this.serverPhotoUrl + user.photoLink"
                         width="40" height="40"
                         class="d-inline-block align-text-top object-fit-cover rounded-circle">
                    <div class="mt-2 ms-2 fs-6">{{user.name}}</div>
                  </router-link>
                </div>
                <div class="col-3 d-flex mt-2">
                  <button class="btn btn-link link-success ms-auto p-0"
                      @click="acceptFriendRequest(user.id)">
                    <font-awesome-icon :icon="['far', 'circle-check']" size="xl" />
                  </button>
                  <button class="btn btn-link link-danger p-0 ms-2"
                      @click="rejectFriendRequest(user.id)">
                    <font-awesome-icon :icon="['far', 'circle-xmark']" size="xl"/>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import Alert from "@/UI/Alert.vue";
import PhotoInput from "@/UI/PhotoInput.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import api from "@/api";
import PhoneInput from "@/UI/PhoneInput.vue";
import PasswordInput from "@/UI/PasswordInput.vue";
import GenderInput from "@/UI/GenderInput.vue";
import AgeInput from "@/UI/AgeInput.vue";
import InterestsList from "@/UI/InterestsList.vue";
import NameInput from "@/UI/NameInput.vue";
import helpers from "@/mixins/helpers";

export default {
  components: {NameInput, InterestsList, AgeInput, GenderInput, PasswordInput, PhoneInput, MainLayout, Alert, PhotoInput},
  mixins: [helpers],

  data() {
    return {
      user: {
        id: '',
        name: '',
        gender: '',
        age: '',
        phone: '',
        photoLink: '',
        interests: []
      },
      friendshipRequestsUsers: [],
      defaultPhotoUrl: '/placeholder.jpg'
    }
  },

  methods: {
    async getUserById(id) {
      try {
        return api.userApi.getUserById(id)
      } catch {
        this.$refs.alert.alert('danger', `Failed to fetch user`)
      }
    },
    async getFriendshipRequests() {
      try {
        const userIds = this.$store.state.friendshipRequests;
        const userPromises = userIds.map(id => this.getUserById(id));
        return Promise.all(userPromises);
      } catch {
        this.$refs.alert.alert('danger', 'Failed to load friendship requests');
      }
    },
    async acceptFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.acceptFriendRequest({senderId});
        if (response?.status === 204) {
          this.$store.dispatch('acceptFriendRequest', senderId);
          this.friendshipRequestsUsers =
              this.friendshipRequestsUsers.filter(user => user.id !== senderId);
        }
      } catch (error) {
        this.$refs.alert.alert('danger', 'Failed to accept friendship request');
      }
    },
    async rejectFriendRequest(senderId) {
      try {
        const response = await api.friendRequestApi.rejectFriendRequest({senderId});
        if (response?.status === 204) {
          this.$store.dispatch('rejectFriendRequest', senderId);
          this.friendshipRequestsUsers =
              this.friendshipRequestsUsers.filter(user => user.id !== senderId);
        }
      } catch (error) {
        this.$refs.alert.alert('danger', 'Failed to reject friendship request');
      }
    }
  },

  computed: {
    currentUserProfile() {
      return this.$route.params.id === undefined;
    }
  },

  async created() {
    this.user = this.currentUserProfile
        ? this.$store.state.currentUser
        : await this.getUserById(this.$route.params.id);
    this.friendshipRequestsUsers = await this.getFriendshipRequests();
  }
}
</script>