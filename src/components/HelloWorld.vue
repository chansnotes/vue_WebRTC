<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
    <v-flex>
          <video  autoplay playsinline ref="video" id="video" width="300" height="200"></video>
      <span> Video Player </span>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    video: {}
  }),
  method: {

  },
  mounted() {
    this.video = this.$refs.video;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video:true}).then(stream => {
          this.video.srcObject = stream;
          this.video.play();
      }).catch(error => {console.log('navigator.getUserMedia error: ', error )})
    }
  }
};
</script>
