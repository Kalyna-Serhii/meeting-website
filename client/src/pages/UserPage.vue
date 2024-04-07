<template>
  <alert ref="alert"></alert>

  <main-layout>
    <div class="container-xxl container-fluid my-5">
      <div class="row">
        <div class="col-10 offset-1">
          <div class="main-block h-100">
            <div v-if="user">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 col-md-5 col-sm-12">
                    <div class="mb-3">
                      <name-input v-model="user.name"
                          :readonly="true">
                      </name-input>
                    </div>
                    <label class="form-label ms-2" for="user-gender">Gender</label>
                    <div class="mb-3">
                      <gender-input v-model="user.gender"
                          id-prefix="user"
                          :readonly="true">
                      </gender-input>
                    </div>
                    <div class="mb-3">
                      <age-input v-model="user.age"
                           :id="'user-age'"
                           :readonly="true">
                      </age-input>
                    </div>
                    <div class="mb-3">
                      <phone-input v-model="user.phone"
                           :readonly="true">
                      </phone-input>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-7 col-sm-12">
                    <photo-input v-if="user.photoLink !== ''"
                       :default-img-url="defaultPhotoUrl"
                       :user-img="this.serverPhotoUrl + user.photoLink"
                       :readonly="true"
                       :required="false">
                    </photo-input>
                    <interests-list
                        @interest-checked="(i) => this.user.interests = i"
                        :interests="user.interests"
                        :readonly="true">
                    </interests-list>
                  </div>

                  <div class="row justify-content-center">
                    <div class="d-grid w-100 mt-4 mb-2">
                      <div class="d-grid">
                        <DeleteFromFriendsButton
                            :id="user.id"
                            v-if="this.$store.state.currentUser?.friends.includes(user.id)"
                            @error="message => $refs.alert.alert('danger', message)">
                        </DeleteFromFriendsButton>
                        <div class="btn-group d-flex"
                             v-else-if="this.$store.state.friendshipRequests?.includes(user.id)">
                          <AcceptFriendshipButton
                              :id="user.id"
                              @error="message => $refs.alert.alert('danger', message)">
                          </AcceptFriendshipButton>
                          <RejectFriendshipButton
                              :id="user.id"
                              @error="message => $refs.alert.alert('danger', message)">
                          </RejectFriendshipButton>
                        </div>
                        <CancelRequestButton
                            v-else-if="this.$store.state.userFriendshipRequests?.includes(user.id)"
                            :id="user.id"
                            @error="message => $refs.alert.alert('danger', message)">
                        </CancelRequestButton>
                        <AddFriendButton
                            v-else
                            :id="user.id"
                            @error="message => $refs.alert.alert('danger', message)">
                        </AddFriendButton>
                      </div>
                      <router-link to="/"
                                   class="link-secondary mt-2 text-center">
                        Home
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">User was not found</div>
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

export default {
  components: {
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
    }
  },

  async created() {
    const id = this.$route.params.id;
    if (id === `${this.$store.state.currentUser.id}`) {
      this.$router.push('/my-account');
    }
    this.user = await this.getUserById(id);
  }
}
</script>