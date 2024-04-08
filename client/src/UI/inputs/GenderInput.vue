<template>
  <div class="d-flex">
    <div class="form-check" :id="`${idPrefix}-gender`">
      <input class="form-check-input"
             :type="type ?? 'radio'"
             name="gender"
             :id="`${idPrefix}-man`"
             required
             value="man"
             :checked="modelValue === 'man'"
             @click="handleChange"
             :disabled="readonly">
      <label class="form-check-label" :for="`${idPrefix}-man`">Man</label>
    </div>
    <div class="form-check ms-2">
      <input class="form-check-input"
             :type="type ?? 'radio'"
             name="gender"
             :id="`${idPrefix}-woman`"
             value="woman"
             :checked="modelValue === 'woman'"
             @click="handleChange"
             :disabled="readonly">
      <label class="form-check-label" :for="`${idPrefix}-woman`">Woman</label>
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
    readonly: Boolean
  },
  methods: {
    handleChange(event) {
      this.$emit('update:modelValue',
          event.target.value === this.modelValue
            ? 'all'
            : event.target.value);
    }
  }
}
</script>
