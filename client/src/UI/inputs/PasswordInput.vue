<template>
  <div>
    <label
      for="password"
      class="form-label  ms-2"
    >Password</label>
    <input
      id="password"
      class="form-control"
      type="password"
      name="password"
      pattern="^(?=.{8,20}$).*"
      :placeholder="placeholder ?? 'Enter password'"
      :value="modelValue"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <div class="invalid-feedback">
      Please enter password (8-20 signs)
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: String,
    required: Boolean,
  },
};
</script>
