<template>
  <div class="page bg-lightblue">
    <div class="container content d-flex align-items-center">
      <div class="col-lg-6 offset-lg-3 col-10 offset-1">
        <div class="main-block">
          <slot></slot>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script setup>
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<style scoped>
.page {
  min-height: 100vh; /* Минимальная высота равная высоте видимой области (viewport) */
}
</style>
