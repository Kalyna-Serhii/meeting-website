<template>
  <header-component></header-component>
  <logout-component></logout-component>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {HeaderComponent, LogoutComponent, FooterComponent}
}
</script>