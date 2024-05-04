<template>
  <div>
    <alert ref="alert" />
    <main-layout>
      <div class="container-xxl container-fluid my-5">
        <div class="row">
          <div class="col-md-8 col-sm-12">
            <div class="main-block h-100">
              <div class="row justify-content-center justify-content-sm-start">
                <!--                On mobile parameters-->
                <div class="d-md-none d-flex mb-3">
                  <div class="col-4 pe-2">
                    <dropdown-menu
                      :name="'Gender'"
                      :search="true"
                      @dropdown-closed="getUsers(true)"
                    >
                      <gender-input
                        v-model="newFilters.gender"
                        :type="'checkbox'"
                        :id-prefix="'mob-param'"
                      />
                    </dropdown-menu>
                  </div>
                  <div class="col-4">
                    <dropdown-menu
                      :name="'Age'"
                      :search="true"
                      @dropdown-closed="getUsers(true)"
                    >
                      <AgeFilter
                        v-model:min-age="newFilters.minAge"
                        v-model:max-age="newFilters.maxAge"
                        :inline="false"
                      />
                    </dropdown-menu>
                  </div>
                  <div class="col-4 ps-2">
                    <dropdown-menu
                      :name="'Interests'"
                      :search="true"
                      @dropdown-closed="getUsers(true)"
                    >
                      <interests-list
                        :one-column="true"
                        @interest-checked="(categories) => newFilters.interests = categories"
                      />
                    </dropdown-menu>
                  </div>
                </div>

                <!--                card -->
                <div
                  v-for="user in users"
                  v-if="users.length > 0"
                  :key="user.id"
                  class="col-lg-4 col-md-6 col-sm-6 col-10"
                >
                  <div class="card mb-4">
                    <router-link :to="`/user/${user.id}`">
                      <img
                        :src="serverPhotoUrl + user.photoLink"
                        class="card-img-top object-fit-cover"
                        alt="User photo"
                        style="height: 15rem;"
                      >
                    </router-link>
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <h5 class="card-title">
                          {{ user.name }}
                        </h5>
                        <div class="text-nowrap text-body-secondary">
                          {{ user.age }} y.o
                        </div>
                      </div>
                      <div class="text-body-secondary">
                        {{ user.gender }}
                      </div>
                      <div
                        class="d-grid mt-2"
                        style="margin: -0.5rem;"
                      >
                        <DeleteFromFriendsButton
                          v-if="$store.state.currentUser?.friends.includes(user.id)"
                          :id="user.id"
                          @error="message => $refs.alert.alert('danger', message)"
                        />
                        <div
                          v-else-if="$store.state.friendshipRequests?.includes(user.id)"
                          class="btn-group d-flex"
                        >
                          <AcceptFriendshipButton
                            :id="user.id"
                            @error="message => $refs.alert.alert('danger', message)"
                          />
                          <RejectFriendshipButton
                            :id="user.id"
                            @error="message => $refs.alert.alert('danger', message)"
                          />
                        </div>
                        <CancelRequestButton
                          v-else-if="$store.state.userFriendshipRequests?.includes(user.id)"
                          :id="user.id"
                          @error="message => $refs.alert.alert('danger', message)"
                        />
                        <AddFriendButton
                          v-else
                          :id="user.id"
                          @error="message => $refs.alert.alert('danger', message)"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="text-center"
                >
                  Nobody found
                </div>
              </div>

              <!--        pagination -->
              <div
                v-if="totalPages > 1"
                class="d-flex justify-content-center"
              >
                <ul class="pagination pagination-md">
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    :class="['page-item', page === pageNumber ? 'active' : '']"
                  >
                    <span
                      v-if="page === pageNumber"
                      class="page-link"
                    >{{ page }}</span>
                    <button
                      v-else
                      class="page-link"
                      @click="toPage(page)"
                    >
                      {{ page }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 d-none d-md-flex">
            <div class="main-block">
              <h5 class="text-center mb-3">
                Choose parameters:
              </h5>
              <div class="mb-3">
                <gender-input
                  v-model="newFilters.gender"
                  :type="'checkbox'"
                  :id-prefix="'param'"
                />
              </div>
              <div class="mb-3">
                <div class="row">
                  <AgeFilter
                    v-model:min-age="newFilters.minAge"
                    v-model:max-age="newFilters.maxAge"
                    :inline="true"
                  />
                </div>
              </div>
              <interests-list
                @interest-checked="(categories) => newFilters.interests = categories"
              />
              <div class="d-grid mt-3">
                <button
                  class="btn btn-primary"
                  @click="getUsers(true)"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import InterestsList from '@/UI/inputs/InterestsList.vue';
import GenderInput from '@/UI/inputs/GenderInput.vue';
import api from '@/api';
import Alert from '@/UI/Alert.vue';
import DropdownMenu from '@/UI/DropdownMenu.vue';
import helpers from '@/mixins/helpers';
import AddFriendButton from '@/UI/buttons/AddFriendButton.vue';
import CancelRequestButton from '@/UI/buttons/CancelRequestButton.vue';
import AcceptFriendshipButton from '@/UI/buttons/AcceptFriendshipButton.vue';
import RejectFriendshipButton from '@/UI/buttons/RejectFriendshipButton.vue';
import DeleteFromFriendsButton from '@/UI/buttons/DeleteFromFriendsButton.vue';
import AgeFilter from '@/UI/AgeFilter.vue';

export default {
  components: {
    AgeFilter,
    DeleteFromFriendsButton,
    RejectFriendshipButton,
    AcceptFriendshipButton,
    CancelRequestButton,
    AddFriendButton,
    DropdownMenu,
    Alert,
    GenderInput,
    InterestsList,
    MainLayout,
  },
  mixins: [helpers],

  data() {
    return {
      newFilters: {
        gender: 'all',
        minAge: null,
        maxAge: null,
        interests: [],
      },
      filters: {},
      pageNumber: 1,
      pageSize: 6,
      totalPages: null,
      users: [],
    };
  },

  async created() {
    await this.getUsers();
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
        if (!this.filters.minAge) {
          delete this.filters.minAge;
        }
        if (!this.filters.maxAge) {
          delete this.filters.maxAge;
        }
        const response = await api.userApi.getUsers({ params: this.filters });
        if (response) {
          this.users = response.users;
          this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        }
      } catch {
        this.$refs.alert.alert(
          'danger',
          'Failed to search users with provided parameters',
        );
      }
    },
    async toPage(page) {
      this.pageNumber = page;
      await this.getUsers();
    },
  },
};
</script>
