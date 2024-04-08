<template>
  <div class="page bg-lightblue">
    <div class="container content d-flex align-items-center py-5">
      <div :class="[`col-lg-${wide ? '8' : '6'}`, `offset-lg-${wide ? '2' : '3'}`,
                  `col-md-${wide ? '10' : '8'}`, `offset-md-${wide ? '1' : '2'}`,
                  'col-12', 'offset-0']">
        <div class="main-block">
          <slot></slot>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {FooterComponent},
  props: {
    wide: false
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
}
</style>
