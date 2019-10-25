<template>
  <div >
    <div style="position:absolute;left:50%;top:50%;transform: translate(-50%,-50%);text-align: center;">
      404
      <div>
        找不到该页面
      </div>
      <div>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "notFind"
    }
</script>

<style scoped>

</style>
