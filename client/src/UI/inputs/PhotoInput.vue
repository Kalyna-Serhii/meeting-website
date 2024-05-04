<template>
  <div :class="['row', `justify-content-${justify ?? 'center'}`]">
    <div class="col-md-8 col-sm-12">
      <img
        v-if="imgUrl"
        :class="['img-fluid object-fit-cover rounded-4 w-100', readonly ? 'my-2' : '']"
        style="max-height: 25rem;"
        :src="imgUrl"
        alt="user"
      >
      <input
        v-if="!readonly"
        class="form-control my-2"
        type="file"
        name="photo"
        accept=".jpg, .jpeg, .png"
        :required="required"
        @change="handleFileChange"
      >
    </div>
  </div>
</template>

<script>
export default {

  props: {
    defaultImgUrl: String,
    userImg: String,
    justify: String,
    readonly: Boolean,
    required: Boolean,
  },
  data() {
    return {
      imgUrl: '',
    };
  },

  mounted() {
    this.imgUrl = this.userImg ?? this.defaultImgUrl;
  },

  methods: {
    handleFileChange(event) {
      const photo = event.target.files[0];
      this.imgUrl = !photo
        ? this.userImg ?? this.defaultImgUrl
        : URL.createObjectURL(photo);
      this.$emit('updated', this.imgUrl);
    },
  },
};
</script>
