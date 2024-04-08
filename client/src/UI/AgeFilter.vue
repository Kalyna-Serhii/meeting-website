<template>
  <div class="row" v-if="inline">
    <div class="col-6">
      <age-input :modelValue="minAge"
          @update:modelValue="$emit('update:minAge', $event)"
          @changed="newValue => handleMinAgeChange(newValue)"
          :placeholder="'Age from'">
      </age-input>
    </div>
    <div class="col-6">
      <age-input :modelValue="maxAge"
          @update:modelValue="$emit('update:maxAge', $event)"
          @changed="newValue => handleMaxAgeChange(newValue)"
          :placeholder="'Age to'">
      </age-input>
    </div>
  </div>

  <div v-else>
    <age-input :modelValue="minAge"
       @update:modelValue="$emit('update:minAge', $event)"
       @changed="newValue => handleMinAgeChange(newValue)"
       :placeholder="'Age from'">
    </age-input>
    <div class="mt-2">
      <age-input :modelValue="maxAge"
         @update:modelValue="$emit('update:maxAge', $event)"
         @changed="newValue => handleMaxAgeChange(newValue)"
         :placeholder="'Age to'">
      </age-input>
    </div>
  </div>
</template>

<script>
import AgeInput from "@/UI/inputs/AgeInput.vue";

export default {
  components: {AgeInput},

  props: {
    minAge: {String, Number},
    maxAge: {String, Number},
    inline: Boolean
  },

  methods: {
    handleMinAgeChange(newValue) {
      if (parseInt(newValue) > parseInt(this.maxAge)) {
        newValue = this.maxAge;
      }
      this.$emit('update:minAge', newValue)
    },
    handleMaxAgeChange(newValue) {
      if (parseInt(newValue) < this.minAge) {
        newValue = this.minAge;
      }
      this.$emit('update:maxAge', newValue)
    },

  }
}
</script>
