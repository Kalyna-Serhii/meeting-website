<template>
  <div class="row" id="interests">
    <label class="form-label text-center" for="interests"
        v-if="!oneColumn">
      Interests
    </label>
    <div :class="[oneColumn ? 'col-10 offset-1' : 'col-5 offset-1', 'form-check']"
         v-for="(interest, i) in this.$store.state.interests" :key="i">
      <input class="form-check-input"
             type="checkbox" :value="interest"
             :id="`interest-${oneColumn ? '1' : '2'}-${i}`"
             @change="onCheck">
      <label class="form-check-label"
             :for="`interest-${oneColumn ? '1' : '2'}-${i}`">
        {{interest}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    oneColumn: Boolean
  },

  methods: {
    onCheck() {
      const checkedInterests = [];
      document.querySelectorAll('#interests input[type="checkbox"]:checked')
        .forEach(checkbox =>
          checkedInterests.push(checkbox.value)
      );
      this.$emit('interest-checked', checkedInterests);
    }
  }
}
</script>