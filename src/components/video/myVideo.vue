<template>
  <div>
    <router-view></router-view>
    <uploadVideo></uploadVideo>
  </div>
</template>

<script>
  import uploadVideo from './uploadVideo'
  export default {
    name: "myVideo",
    components:{
      uploadVideo
    }
  }
</script>

<style scoped>

</style>
