<template>
  <div class="container-fluid">
    <div v-for="user in friendshipRequestsUsers" :key="user.id">
      <div class="row main-block py-3 px-0 mb-3" style="background-color: #ebeced">
        <div class="col-9 overflow-hidden">
          <router-link class="navbar-brand d-flex" :to="`/user/${user.id}`">
            <img :src="this.serverPhotoUrl + user.photoLink"
                 width="40" height="40"
                 class="d-inline-block align-text-top object-fit-cover rounded-circle mt-2">
            <div class="d-grid">
              <div class="ms-2 fs-5">{{user.name}}</div>
              <div class="ms-2 fs-6 text-body-secondary">{{user.gender}} {{user.age}} y.o</div>
            </div>
          </router-link>
        </div>
        <div class="col-3 d-flex mt-2 ps-0">
          <AcceptFriendshipButton :id="user.id" class="ms-auto"
                :small="true"
                @accepted="$emit('accepted', user.id)">
          </AcceptFriendshipButton>
          <RejectFriendshipButton :id="user.id"
                :small="true"
                @rejected="$emit('rejected', user.id)">
          </RejectFriendshipButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "@/mixins/helpers";
import RejectFriendshipButton from "@/UI/buttons/RejectFriendshipButton.vue";
import AcceptFriendshipButton from "@/UI/buttons/AcceptFriendshipButton.vue";

export default {
  components: {AcceptFriendshipButton, RejectFriendshipButton},
  mixins: [helpers],
  props: {
    friendshipRequestsUsers: Array,
  }
}
</script>