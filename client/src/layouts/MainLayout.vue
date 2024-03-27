<template>
  <div class="page">
    <header-component></header-component>
    <main class="content">
      <slot></slot>
    </main>
    <footer-component class="footer"></footer-component>
  </div>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>