<template>
  <div class="page">
    <header-component />
    <main class="content">
      <slot />
    </main>
    <footer-component class="footer" />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>
