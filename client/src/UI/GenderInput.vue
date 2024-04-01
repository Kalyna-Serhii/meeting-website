<template>
  <div class="d-flex">
    <div class="form-check" id="gender">
      <input class="form-check-input"
             :type="type ?? 'radio'"
             name="gender"
             id="man"
             required
             value="man"
             :checked="modelValue === 'man'"
             @click="handleChange">
      <label class="form-check-label" for="man">Man</label>
    </div>
    <div class="form-check ms-2">
      <input class="form-check-input"
             :type="type ?? 'radio'"
             name="gender"
             id="woman"
             value="woman"
             :checked="modelValue === 'woman'"
             @click="handleChange">
      <label class="form-check-label" for="woman">Woman</label>
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
    type: String
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
