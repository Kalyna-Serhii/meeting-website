<template>
  <div>
    <alert ref="alert"></alert>
    <main-layout>
      <div class="container-xxl container-fluid my-5">
        <div class="row">
          <div class="col-md-8 col-sm-12">
            <div class="main-block">
              <div class="row justify-content-center justify-content-sm-start">

<!--                On mobile parameters-->
                <div class="d-md-none d-flex mb-3">
                  <div class="col-4 pe-2">
                    <dropdown-menu :name="'Gender'"
                         @dropdown-closed="getUsers(true)">
                      <gender-input v-model="this.filters.gender"
                          :type="'checkbox'">
                      </gender-input>
                    </dropdown-menu>
                  </div>
                  <div class="col-4">
                    <dropdown-menu :name="'Age'"
                        @dropdown-closed="getUsers(true)">
                      <age-input v-model:value="this.filters.minAge"
                           :placeholder="'Age from'">
                      </age-input>
                      <div class="mt-2">
                        <age-input v-model:value="this.filters.maxAge"
                             :placeholder="'Age to'">
                        </age-input>
                      </div>
                    </dropdown-menu>
                  </div>
                  <div class="col-4 ps-2">
                    <dropdown-menu :name="'Interests'"
                          @dropdown-closed="getUsers(true)">
                        <interests-list :one-column="true"
                            @interest-checked="(categories) => this.filters.interests = categories">
                        </interests-list>
                    </dropdown-menu>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 col-10"
                     v-for="user in this.users" :key="user.id">
                  <div class="card mb-4">
                    <img :src="`${serverURL}/photos/${user.photoLink}`"
                         class="card-img-top"
                         alt="User photo"
                         style="height: 15rem; object-fit: cover;">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{user.name}}</h5>
                        <div class="text-nowrap">{{user.age}} y.o</div>
                      </div>
                      <div>{{user.gender}}</div>
                      <div class="d-grid mt-2" style="margin: -0.5rem;">
                        <button class="btn btn-primary">Add to friends</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--        pagination -->
              <div class="d-flex justify-content-center"
                  v-if="this.totalPages > 1">
                <ul class="pagination pagination-md">
                  <li v-for="page in this.totalPages" :key="page"
                      :class="['page-item', page === this.filters.pageNumber ? 'active' : '']">
                    <span class="page-link" v-if="page === this.filters.pageNumber">{{ page }}</span>
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
                <gender-input v-model="this.filters.gender" :type="'checkbox'"></gender-input>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col-6">
                    <age-input v-model:value="this.filters.minAge"
                         :placeholder="'Age from'">
                    </age-input>
                  </div>
                  <div class="col-6">
                    <age-input v-model:value="this.filters.maxAge"
                         :placeholder="'Age to'">
                    </age-input>
                  </div>
                </div>
              </div>
              <interests-list
                  @interest-checked="(categories) => this.filters.interests = categories">
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
import InterestsList from "@/UI/InterestsList.vue";
import GenderInput from "@/UI/GenderInput.vue";
import AgeInput from "@/UI/AgeInput.vue";
import api from "@/api";
import {serverURL} from "@/api/axiosInstance";
import Alert from "@/UI/Alert.vue";
import DropdownMenu from "@/UI/DropdownMenu.vue";
import logger from "@fortawesome/vue-fontawesome/src/logger";

export default {
  components: {DropdownMenu, Alert, AgeInput, GenderInput, InterestsList, MainLayout},
  data() {
    return {
      serverURL,
      filters: {
        gender: 'all',
        minAge: '',
        maxAge: '',
        interests: [],
        pageNumber: 1,
        pageSize: 6,
      },
      totalPages: null,
      users: []
    }
  },

  methods: {
    logger,
    async getUsers(search) {
      try {
        if (search) {
          this.filters.pageNumber = 1;
        }
        const response = await api.userApi.getUsers({params: this.filters});
        if (response) {
          this.users = response.users;
          this.totalPages = Math.ceil(response.totalCount / this.filters.pageSize);
        }
      } catch  {
        this.$refs.alert.alert('danger',
            'Failed to search users with provided parameters');
      }
    },
    async toPage(page) {
      this.filters.pageNumber = page;
      await this.getUsers();
    }
  },

  async created() {
    await this.getUsers();
  }
}
</script>