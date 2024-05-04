<template>
  <div class="d-flex">
    <div
      :id="`${idPrefix}-gender`"
      class="form-check"
    >
      <input
        :id="`${idPrefix}-man`"
        class="form-check-input"
        :type="type ?? 'radio'"
        name="gender"
        required
        value="man"
        :checked="modelValue === 'man'"
        :disabled="readonly"
        @click="handleChange"
      >
      <label
        class="form-check-label"
        :for="`${idPrefix}-man`"
      >Man</label>
    </div>
    <div class="form-check ms-2">
      <input
        :id="`${idPrefix}-woman`"
        class="form-check-input"
        :type="type ?? 'radio'"
        name="gender"
        value="woman"
        :checked="modelValue === 'woman'"
        :disabled="readonly"
        @click="handleChange"
      >
      <label
        class="form-check-label"
        :for="`${idPrefix}-woman`"
      >Woman</label>
    </div>
    <div class="invalid-feedback">
      Please choose your gender
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    type: String,
    idPrefix: String,
    readonly: Boolean,
  },
  methods: {
    handleChange(event) {
      this.$emit(
        'update:modelValue',
        event.target.value === this.modelValue
          ? 'all'
          : event.target.value,
      );
    },
  },
};
</script>
