<template>
  <div
    id="interests"
    class="row"
  >
    <p
      v-if="!oneColumn"
      class="form-label text-center"
    >
      Interests
    </p>
    <div
      v-for="(interest, i) in $store.state.interests"
      :key="i"
      :class="[oneColumn ? 'col-10 offset-1' : `col-5 offset-${i % 2 === 0 ? '2' : ''}`, 'form-check']"
    >
      <input
        :id="`interest-${oneColumn ? '1' : '2'}-${i}`"
        class="form-check-input"
        type="checkbox"
        :value="interest"
        :checked="interests?.includes(interest)"
        :disabled="readonly"
        @change="onCheck"
      >
      <label
        class="form-check-label"
        :for="`interest-${oneColumn ? '1' : '2'}-${i}`"
      >
        {{ interest }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    oneColumn: Boolean,
    interests: Array,
    readonly: Boolean,
  },

  methods: {
    onCheck() {
      const checkedInterests = [];
      document.querySelectorAll('#interests input[type="checkbox"]:checked')
        .forEach((checkbox) => checkedInterests.push(checkbox.value));
      this.$emit('interest-checked', checkedInterests);
    },
  },
};
</script>
