<template>
  <div>
    <label
      for="phone"
      class="form-label ms-2"
    >Name</label>
    <input
      id="name"
      class="form-control"
      :value="modelValue"
      name="name"
      placeholder="Enter name"
      minlength="2"
      :disabled="readonly"
      pattern="^[A-Z][a-zA-Z]*$"
      required
      @input="$emit('input', $event.target.value)"
    >
    <div class="invalid-feedback">
      Please enter your valid name
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    readonly: Boolean,
  },
};
</script>
