<template>
  <label for="password" class="form-label  ms-2">Password</label>
  <input class="form-control"
         id="password"
         type="password"
         name="password"
         pattern="^(?=.{4,}$).*"
         placeholder="Enter password"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         required>
  <div class="invalid-feedback">
    Please enter password
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: String
    }
  }
</script>