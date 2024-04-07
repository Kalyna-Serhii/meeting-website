<template>
  <div :class="['row', `justify-content-${justify ?? 'center'}`]">
    <div class="col-md-8 col-sm-12">
      <img :class="['img-fluid object-fit-cover rounded-4 w-100', readonly ? 'my-2' : '']"
           style="max-height: 25rem;"
           v-if="imgUrl" :src="imgUrl" alt="user">
      <input class="form-control my-2"
             type="file"
             name="photo"
             accept=".jpg, .jpeg, .png"
             :required="required"
             v-if="!readonly"
             @change="handleFileChange"
      >
    </div>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       imgUrl: ''
     }
   },

   props: {
     defaultImgUrl: String,
     userImg: String,
     justify: String,
     readonly: Boolean,
     required: Boolean,
   },

   methods: {
     handleFileChange(event) {
       if (event.target.files.length > 0) {
         this.photo = event.target.files[0];
         this.imgUrl = URL.createObjectURL(this.photo);
       } else {
         this.imgUrl = this.userImg ?? this.defaultImgUrl;
       }
     }
   },

   mounted() {
     this.imgUrl = this.userImg ?? this.defaultImgUrl;
   }
 }
</script>