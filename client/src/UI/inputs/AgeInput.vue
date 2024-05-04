<template>
  <div>
    <label
      v-if="!placeholder"
      :for="id"
      class="form-label ms-2"
    >Age</label>
    <input
      :id="id"
      class="form-control"
      name="age"
      :placeholder="placeholder ?? 'Enter age'"
      :value="modelValue"
      type="number"
      min="14"
      max="99"
      :disabled="readonly"
      required
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('changed', $event.target.value)"
    >
    <div class="invalid-feedback">
      Please enter your age
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
      validator: (value) => typeof value === 'string' || typeof value === 'number',
    },
    placeholder: String,
    id: String,
    readonly: Boolean,
  },
  emits: ['changed', 'update:modelValue'],
};
</script>
