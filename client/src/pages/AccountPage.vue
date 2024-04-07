<template>
  <alert ref="alert"></alert>
  <confirmation-modal @confirmed="deleteAccount"></confirmation-modal>

  <main-layout>
    <div class="container-xxl container-fluid my-5">
      <div class="row">
        <div class="col-lg-8 col-sm-12">
          <div class="container mb-3 d-lg-none d-block px-3">
            <DropdownMenu :name="'Friendship Requests'" :bg="'light'" :search="false">
              <FriendshipRequests
                  v-if="friendshipRequestsUsers.length > 0"
                  :friendship-requests-users="friendshipRequestsUsers"
                  @accepted="id => acceptFriendRequest(id)"
                  @rejected="id => rejectFriendRequest(id)"
                  @error="message => $refs.alert.alert('danger', message)">
              </FriendshipRequests>
              <p v-else class="text-center">No friendship requests yet</p>
            </DropdownMenu>
          </div>
          <div class="main-block h-100">
            <form action="#"
                  @submit.prevent="submit"
                  ref="form"
                  class="needs-validation"
                  id="account-form"
                  novalidate
                  v-if="user">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 col-md-5 col-sm-12">
                    <div class="mb-3">
                      <name-input v-model="user.name"/>
                    </div>
                    <label class="form-label ms-2" for="user-gender">Gender</label>
                    <div class="mb-3">
                      <gender-input v-model="user.gender" id-prefix="user"/>
                    </div>
                    <div class="mb-3">
                      <age-input v-model="user.age" :id="'user-age'"/>
                    </div>
                    <div class="mb-3">
                      <phone-input v-model="user.phone"/>
                    </div>
                    <div class="mb-3">
                      <password-input v-model="user.password"
                          :placeholder="'Enter new password'"
                          :required="false">
                      </password-input>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-7 col-sm-12">
                    <photo-input v-if="user.photoLink !== ''"
                       :default-img-url="defaultPhotoUrl"
                       :user-img="this.serverPhotoUrl + user.photoLink"
                       :required="false">
                    </photo-input>
                    <interests-list
                        @interest-checked="(i) => this.user.interests = i"
                        :interests="user.interests">
                    </interests-list>
                  </div>

                  <div class="row justify-content-center">
                    <div class="d-grid w-100 mt-4 mb-2">
                      <div class="d-grid">
                        <button class="btn btn-primary" type="submit">
                          Submit changes
                        </button>
                        <button class="btn btn-danger mt-2"
                                data-bs-toggle="modal" data-bs-target="#confirmModal"
                                @click.prevent>
                          Delete account
                        </button>
                      </div>
                      <router-link to="/" class="link-secondary mt-2 text-center">
                        Home
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div v-else class="text-center">User was not found</div>
          </div>
        </div>

        <div class="col-lg-4 d-lg-flex d-none">
          <div class="main-block w-100">
            <div class="overflow-y-auto" style="max-height: 40rem;">
              <h5 class="text-center mb-4">Friendship requests</h5>
              <FriendshipRequests
                  :friendship-requests-users="friendshipRequestsUsers"
                  @accepted="id => acceptFriendRequest(id)"
                  @rejected="id => rejectFriendRequest(id)"
                  @error="message => $refs.alert.alert('danger', message)">
              </FriendshipRequests>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main-layout>
</template>

<script>
import Alert from "@/UI/Alert.vue";
import PhotoInput from "@/UI/inputs/PhotoInput.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import api from "@/api";
import PhoneInput from "@/UI/inputs/PhoneInput.vue";
import PasswordInput from "@/UI/inputs/PasswordInput.vue";
import GenderInput from "@/UI/inputs/GenderInput.vue";
import AgeInput from "@/UI/inputs/AgeInput.vue";
import InterestsList from "@/UI/inputs/InterestsList.vue";
import NameInput from "@/UI/inputs/NameInput.vue";
import helpers from "@/mixins/helpers";
import AddFriendButton from "@/UI/buttons/AddFriendButton.vue";
import CancelRequestButton from "@/UI/buttons/CancelRequestButton.vue";
import DropdownMenu from "@/UI/DropdownMenu.vue";
import FriendshipRequests from "@/UI/FriendshipRequests.vue";
import AcceptFriendshipButton from "@/UI/buttons/AcceptFriendshipButton.vue";
import RejectFriendshipButton from "@/UI/buttons/RejectFriendshipButton.vue";
import DeleteFromFriendsButton from "@/UI/buttons/DeleteFromFriendsButton.vue";
import ConfirmationModal from "@/UI/ConfirmationModal.vue";

export default {
  components: {
    ConfirmationModal,
    DeleteFromFriendsButton,
    RejectFriendshipButton,
    AcceptFriendshipButton,
    FriendshipRequests,
    DropdownMenu,
    CancelRequestButton,
    AddFriendButton,
    NameInput, InterestsList, AgeInput, GenderInput, PasswordInput, PhoneInput, MainLayout, Alert, PhotoInput},
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
        return await api.userApi.getUserById(id)
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
      this.friendshipRequestsUsers =
          this.friendshipRequestsUsers.filter(user => user.id !== senderId);
    },
    async rejectFriendRequest(senderId) {
      this.friendshipRequestsUsers =
          this.friendshipRequestsUsers.filter(user => user.id !== senderId);
    },
    async submit() {
      if (this.user.interests.length === 0) {
        this.$refs.alert.alert('warning', 'Choose at least one interest');
        return;
      }
      if (this.validateForm()) {
        try {
          const formData = new FormData(this.$refs.form);
          formData.append('interests', JSON.stringify(this.user.interests));
          await api.userApi.updateUser(formData);
          this.$refs.alert.alert('success', 'Successfully updated user');
        } catch (error) {
          this.$refs.alert.alert('danger',
              `${error.response.data.message ?? 'Something went wrong'}`);
        }
      }
    },
    async deleteAccount() {
      try {
        await api.userApi.deleteUser();
        this.$router.push('/login');
      } catch {
        this.$refs.alert.alert('danger', 'Failed to delete your account');
      }
    }
  },

  async created() {
    this.user = this.$store.state.currentUser;
    this.friendshipRequestsUsers = await this.getFriendshipRequests();
  }
}
</script>