<template>
  <label for="age" v-if="!placeholder" class="form-label ms-2">Age</label>
  <input class="form-control"
         name="age"
         :placeholder="placeholder ?? 'Enter age'"
         :value="value"
         @input="$emit('update:value', $event.target.value)"
         type="number"
         min="1" max="99"
         required>
  <div class="invalid-feedback">
    Please enter your age
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      placeholder: String
    }
  }
</script>