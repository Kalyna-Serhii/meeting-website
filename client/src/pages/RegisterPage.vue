<template>
  <header-component></header-component>
  <register-component></register-component>
  <footer-component></footer-component>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {HeaderComponent, RegisterComponent, FooterComponent}
}
</script>