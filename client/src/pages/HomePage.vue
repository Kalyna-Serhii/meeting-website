<template>
  <header-component></header-component>
  <home-component></home-component>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import HomeComponent from "@/components/HomeComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {HeaderComponent, HomeComponent, FooterComponent}
}
</script>