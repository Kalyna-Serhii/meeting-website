<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-sm-12">
      <img class="img-fluid" v-if="imgUrl" :src="imgUrl" alt="dish">
      <input class="form-control my-2"
             type="file"
             name="photo"
             accept=".jpg, .jpeg, .png"
             required
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
     defaultImgUrl: String
   },

   methods: {
     handleFileChange(event) {
       if (event.target.files.length > 0) {
         this.photo = event.target.files[0];
         this.imgUrl = URL.createObjectURL(this.photo);
       } else {
         this.imgUrl = this.defaultImgUrl;
       }
     }
   },

   mounted() {
     this.imgUrl = this.defaultImgUrl;
   }
 }
</script>