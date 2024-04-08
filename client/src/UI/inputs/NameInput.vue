<template>
  <label for="phone" class="form-label ms-2">Name</label>
  <input class="form-control"
         :value="modelValue"
         @input="$emit('input', $event.target.value)"
         id="name"
         name="name"
         placeholder="Enter name"
         minlength="2"
         :disabled="readonly"
         pattern="^[A-Z][a-zA-Z]*$"
         required>
  <div class="invalid-feedback">
    Please enter your valid name
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    readonly: Boolean
  }
}
</script>