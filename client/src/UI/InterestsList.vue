<template>
  <div class="row" id="interests">
    <label class="form-label text-center" for="interests">
      Interests
    </label>
    <div class="col-5 offset-1 form-check"
         v-for="(interest, i) in this.$store.state.interests" :key="i">
      <input class="form-check-input"
             type="checkbox" :value="interest"
             :id="`interest-${i}`"
             @change="onCheck">
      <label class="form-check-label" :for="`interest-${i}`">{{interest}}</label>
    </div>
  </div>
</template>

<script>
export default {
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