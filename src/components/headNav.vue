<template>
  <div class="nav-common">
    <div class="nav-common" >
      <div class="logo">
        <div>乐巴扎AR管理中台</div>
      </div>
      <div class="user">
        <span class="logoTitle">LOCUS开发者平台</span>
        <i class="el-icon-question"></i>
        <span>帮助</span>
        <span>{{userRole}}</span>
        <span>{{userEmail}}</span>
        <span class="btn_logout cur"  @click="logOut()">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64';
export default {
  name: "headNav",
  data() {
    return {
        userRole:'',
        userEmail:'',
        loginName:''
    };
  },
  created(){

    function getCookie(name) 
    { 
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
  　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    }
    let  token = getCookie('tokendev')
    if(token){
    let arr=token.split('.')
    let tokenMsg=arr[1];
    let tokens = Base64.decode(tokenMsg);
    let Obj=JSON.parse(tokens)
    this.loginName=Obj.loginName
    this.userRole = Obj.roleName
    this.userEmail = Obj.email
     }

  },
  computed:{

  },
  methods: {
      logOut(){
        this.$confirm('确认退出locus吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path:'/logout'
          })
        }).catch(() => {
          return
        });
      }

  },

};
</script>

<style scoped>
.nav-common{background:#fff;color: #FF644E; overflow: hidden; height:60px;overflow:hidden}
  .logo{ float:left; width: 210px;background: #fff;height:59px;border-bottom:2px solid #f0f0f0}
  .logo div{ background: url("../assets/logo.png") no-repeat center  center;text-indent:-999px;width: 100%; height: 100%;}


  .user{padding-left:200px;margin-top:20px;text-align: right; font-size: 14px;border-bottom: 2px solid #f0f0f0;height: 39px; line-height: 22px}
  .logoTitle{
    font-size:22px;font-weight: 500;text-align: left;float: left;margin-left: 20px
  }
  .user span{margin-right:10px;position:relative; }
  .user span.logout{ font-size:16px}
  .cur{ cursor: pointer;
  }

</style>
