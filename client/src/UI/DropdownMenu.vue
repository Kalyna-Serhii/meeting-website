<template>
  <div
    ref="dropdown"
    class="dropdown d-grid"
  >
    <button
      id="dropdownMenuButton"
      :class="[`form-select bg-${bg}`]"
      type="button"
      @click="toggleDropdown"
    >
      {{ name }}
    </button>
    <div
      id="dropdownMenu"
      class="dropdown-menu px-2 w-100"
      :class="{ 'show': dropdownOpen }"
    >
      <slot />
      <button
        v-if="search"
        class="btn btn-primary btn-sm mt-2 w-100"
        @click="closeDropdown"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    name: String,
    bg: String,
    search: Boolean,
  },

  data() {
    return {
      dropdownOpen: false,
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
    },
  },
};
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
