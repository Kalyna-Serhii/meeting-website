<template>
  <label for="phone" class="form-label ms-2">Phone</label>
  <input class="form-control"
         :value="modelValue"
         @change="$emit('update:modelValue', $event.target.value)"
         id="phone"
         name="phone"
         placeholder="Enter phone"
         ref="phone"
         type="tel"
         pattern="^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$"
         :disabled="readonly"
         required>
  <div class="invalid-feedback">
    Please enter phone
  </div>
</template>

<script>
import helpers from "@/mixins/helpers";
  export default {
    mixins: [helpers],
    props: {
      modelValue: String,
      readonly: Boolean
    },
    mounted() {
      this.addPhoneMask(this.$refs.phone);
    }
  }
</script>