<template>
  <div>
    <alert ref="alert"></alert>
    <main-layout>
      <div class="container-xxl container-fluid my-5">
        <div class="row">
          <div class="col-md-8 col-sm-12">
            <div class="main-block h-100">
              <div class="row justify-content-center justify-content-sm-start">

<!--                On mobile parameters-->
                <div class="d-md-none d-flex mb-3">
                  <div class="col-4 pe-2">
                    <dropdown-menu :name="'Gender'"
                         :search="true"
                         @dropdown-closed="getUsers(true)">
                      <gender-input v-model="this.newFilters.gender"
                          :type="'checkbox'"
                          :id-prefix="'mob-param'">
                      </gender-input>
                    </dropdown-menu>
                  </div>
                  <div class="col-4">
                    <dropdown-menu :name="'Age'"
                        :search="true"
                        @dropdown-closed="getUsers(true)">
                      <AgeFilter
                          v-model:min-age="this.newFilters.minAge"
                          v-model:max-age="this.newFilters.maxAge"
                          :inline="false">
                      </AgeFilter>
                    </dropdown-menu>
                  </div>
                  <div class="col-4 ps-2">
                    <dropdown-menu :name="'Interests'"
                          :search="true"
                          @dropdown-closed="getUsers(true)">
                        <interests-list :one-column="true"
                            @interest-checked="(categories) => this.newFilters.interests = categories">
                        </interests-list>
                    </dropdown-menu>
                  </div>
                </div>

<!--                card -->
                <div class="col-lg-4 col-md-6 col-sm-6 col-10"
                     v-if="this.users.length > 0"
                     v-for="user in this.users" :key="user.id">
                  <div class="card mb-4">
                    <router-link :to="`/user/${user.id}`">
                      <img :src="this.serverPhotoUrl + user.photoLink"
                           class="card-img-top object-fit-cover"
                           alt="User photo"
                           style="height: 15rem;">
                    </router-link>
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{user.name}}</h5>
                        <div class="text-nowrap text-body-secondary">{{user.age}} y.o</div>
                      </div>
                      <div class="text-body-secondary">{{user.gender}}</div>
                      <div class="d-grid mt-2" style="margin: -0.5rem;">
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
                    </div>
                  </div>
                </div>

                <div v-else class="text-center">
                  Nobody found
                </div>
              </div>

              <!--        pagination -->
              <div class="d-flex justify-content-center"
                  v-if="this.totalPages > 1">
                <ul class="pagination pagination-md">
                  <li v-for="page in this.totalPages" :key="page"
                      :class="['page-item', page === this.pageNumber ? 'active' : '']">
                    <span class="page-link" v-if="page === this.pageNumber">{{ page }}</span>
                    <button class="page-link" v-else @click="toPage(page)">{{ page }}</button>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <div class="col-md-4 d-none d-md-flex">
            <div class="main-block">
              <h5 class="text-center mb-3">Choose parameters:</h5>
              <div class="mb-3">
                <gender-input v-model="this.newFilters.gender"
                    :type="'checkbox'"
                    :id-prefix="'param'">
                </gender-input>
              </div>
              <div class="mb-3">
                <div class="row">
                  <AgeFilter
                    v-model:min-age="this.newFilters.minAge"
                    v-model:max-age="this.newFilters.maxAge"
                    :inline="true">
                  </AgeFilter>
                </div>
              </div>
              <interests-list
                  @interest-checked="(categories) => this.newFilters.interests = categories">
              </interests-list>
              <div class="d-grid mt-3">
                <button class="btn btn-primary" @click="getUsers(true)">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import InterestsList from "@/UI/inputs/InterestsList.vue";
import GenderInput from "@/UI/inputs/GenderInput.vue";
import AgeInput from "@/UI/inputs/AgeInput.vue";
import api from "@/api";
import Alert from "@/UI/Alert.vue";
import DropdownMenu from "@/UI/DropdownMenu.vue";
import helpers from "@/mixins/helpers";
import AddFriendButton from "@/UI/buttons/AddFriendButton.vue";
import CancelRequestButton from "@/UI/buttons/CancelRequestButton.vue";
import AcceptFriendshipButton from "@/UI/buttons/AcceptFriendshipButton.vue";
import RejectFriendshipButton from "@/UI/buttons/RejectFriendshipButton.vue";
import DeleteFromFriendsButton from "@/UI/buttons/DeleteFromFriendsButton.vue";
import AgeFilter from "@/UI/AgeFilter.vue";

export default {
  components: {
    AgeFilter,
    DeleteFromFriendsButton,
    RejectFriendshipButton,
    AcceptFriendshipButton,
    CancelRequestButton,
    AddFriendButton, DropdownMenu, Alert, AgeInput, GenderInput, InterestsList, MainLayout},
  mixins: [helpers],

  data() {
    return {
      newFilters: {
        gender: 'all',
        minAge: null,
        maxAge: null,
        interests: []
      },
      filters: {},
      pageNumber: 1,
      pageSize: 6,
      totalPages: null,
      users: []
    }
  },

  methods: {
    async getUsers(search) {
      try {
        if (search) {
          this.filters = JSON.parse(JSON.stringify(this.newFilters));
          this.pageNumber = 1;
        }
        this.filters.pageNumber = this.pageNumber;
        this.filters.pageSize = this.pageSize;
        const response = await api.userApi.getUsers({params: this.filters});
        if (response) {
          this.users = response.users;
          this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        }
      } catch  {
        this.$refs.alert.alert('danger',
            'Failed to search users with provided parameters');
      }
    },
    async toPage(page) {
      this.pageNumber = page;
      await this.getUsers();
    },
  },

  async created() {
    await this.getUsers();
  }
}
</script>
