<template>
  <div>
    <main-layout>
      <h1>Test</h1>
    </main-layout>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import MainLayout from "@/layouts/MainLayout.vue";

export default {
  components: {MainLayout, FooterComponent, HeaderComponent}

}
</script>

<style lang="scss" scoped>

</style>