<template>
  <label for="password" class="form-label  ms-2">Password</label>
  <input class="form-control"
         id="password"
         type="password"
         name="password"
         pattern="^(?=.{8,20}$).*"
         :placeholder="placeholder ?? 'Enter password'"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         :required="required">
  <div class="invalid-feedback">
    Please enter password (8-20 signs)
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: String,
      placeholder: String,
      required: Boolean
    }
  }
</script>