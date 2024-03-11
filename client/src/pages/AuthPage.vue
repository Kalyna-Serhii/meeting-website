<template>
  <header-component></header-component>
  <auth-component></auth-component>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import AuthComponent from "@/components/AuthComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {HeaderComponent, AuthComponent, FooterComponent}
}
</script>