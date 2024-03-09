<template>
  <header-component></header-component>
  <home-component></home-component>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import HomeComponent from "@/components/HomeComponent.vue";

export default {
  components: {HeaderComponent, HomeComponent}
}
</script>