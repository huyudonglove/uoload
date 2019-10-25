<template>
  <div>
    888888
  </div>
</template>

<script>
  export default {
    name: "logout",
    created() {
      
      this.$cookies.remove('tokendev');
       function getCookie(name)
            {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
            }
            let  status = getCookie('status')
          if(status){
              this.$cookies.remove('status');
              console.log(888,status)
          }
      this.$router.push('/login')
    }
  }
</script>

<style scoped>

</style>
