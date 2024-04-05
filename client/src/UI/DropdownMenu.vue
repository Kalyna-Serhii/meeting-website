<template>
  <div class="dropdown d-grid" ref="dropdown">
    <button :class="[`form-select bg-${bg}`]"
            type="button"
            id="dropdownMenuButton"
            @click="toggleDropdown">
      {{name}}
    </button>
    <div class="dropdown-menu px-2 w-100"
         :class="{ 'show': dropdownOpen }" id="dropdownMenu"
    >
      <slot></slot>
      <button class="btn btn-primary btn-sm mt-2 w-100"
            v-if="search"
            @click="closeDropdown">
        Search
      </button>
    </div>
  </div>
</template>

<script>
import InterestsList from "@/UI/InterestsList.vue";

export default {
  components: {InterestsList},

  props: {
    name: String,
    bg: String,
    w: String,
    search: Boolean
  },

  data() {
    return {
      dropdownOpen: false
    };
  },

  methods: {
    toggleDropdown() {
      this.dropdownOpen
          ? this.closeDropdown()
          : this.openDropdown();
    },

    openDropdown() {
        this.dropdownOpen = true;
        document.addEventListener('click', this.handleClickOutside);
    },

    closeDropdown() {
      this.dropdownOpen = false;
      document.removeEventListener('click', this.handleClickOutside);
      this.$emit('dropdown-closed');
    },

    handleClickOutside(event) {
      if (this.$refs.dropdown
          && !this.$refs.dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    }
  },
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
}

.dropdown-menu.show {
  display: block;
}
</style>