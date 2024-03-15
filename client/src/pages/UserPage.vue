<template>
  <header-component></header-component>
  <user-component></user-component>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserComponent from "@/components/UserComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {HeaderComponent, UserComponent, FooterComponent}
}
</script>