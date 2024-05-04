<template>
  <div
    v-if="inline"
    class="row"
  >
    <div class="col-6">
      <age-input
        :model-value="minAge"
        :placeholder="'Age from'"
        @update:modelValue="$emit('update:minAge', $event)"
        @changed="newValue => handleMinAgeChange(newValue)"
      />
    </div>
    <div class="col-6">
      <age-input
        :model-value="maxAge"
        :placeholder="'Age to'"
        @update:modelValue="$emit('update:maxAge', $event)"
        @changed="newValue => handleMaxAgeChange(newValue)"
      />
    </div>
  </div>

  <div v-else>
    <age-input
      :model-value="minAge"
      :placeholder="'Age from'"
      @update:modelValue="$emit('update:minAge', $event)"
      @changed="newValue => handleMinAgeChange(newValue)"
    />
    <div class="mt-2">
      <age-input
        :model-value="maxAge"
        :placeholder="'Age to'"
        @update:modelValue="$emit('update:maxAge', $event)"
        @changed="newValue => handleMaxAgeChange(newValue)"
      />
    </div>
  </div>
</template>

<script>
import AgeInput from '@/UI/inputs/AgeInput.vue';

export default {
  components: { AgeInput },

  props: {
    minAge: { String, Number },
    maxAge: { String, Number },
    inline: Boolean,
  },

  methods: {
    handleMinAgeChange(newValue) {
      let updatedValue = newValue;
      if (parseInt(newValue, 10) > parseInt(this.maxAge, 10)) {
        updatedValue = this.maxAge;
      }

      this.$emit('update:minAge', updatedValue);
    },
    handleMaxAgeChange(newValue) {
      let updatedValue = newValue;
      if (parseInt(newValue, 10) < this.minAge) {
        updatedValue = this.minAge;
      }
      this.$emit('update:maxAge', updatedValue);
    },

  },
};
</script>
