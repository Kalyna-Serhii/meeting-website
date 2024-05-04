<template>
  <div>
    <label
      for="phone"
      class="form-label ms-2"
    >Phone</label>
    <input
      id="phone"
      ref="phone"
      class="form-control"
      :value="modelValue"
      name="phone"
      placeholder="Enter phone"
      type="tel"
      pattern="^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$"
      :disabled="readonly"
      required
      @change="$emit('update:modelValue', $event.target.value)"
    >
    <div class="invalid-feedback">
      Please enter phone
    </div>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers';

export default {
  mixins: [helpers],
  props: {
    modelValue: String,
    readonly: Boolean,
  },
  mounted() {
    this.addPhoneMask(this.$refs.phone);
  },
};
</script>
