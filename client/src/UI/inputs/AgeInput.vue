<template>
  <label :for="id" v-if="!placeholder" class="form-label ms-2">Age</label>
  <input class="form-control"
         name="age"
         :placeholder="placeholder ?? 'Enter age'"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         @change="$emit('changed', $event.target.value)"
         type="number"
         min="14" max="99"
         :id="id"
         :disabled="readonly"
         required>
  <div class="invalid-feedback">
    Please enter your age
  </div>
</template>

<script>
  export default {
    emits: ['changed', 'update:modelValue'],
    props: {
      modelValue: {
        type: [String, Number],
        default: '',
        validator: (value) => {
          return typeof value === 'string' || typeof value === 'number';
        },
      },
      placeholder: String,
      id: String,
      readonly: Boolean,
    }
  }
</script>