<template>
  <div class="h-div">
    <div class="h-login">
      <div class="h-head">{{msg.appName}}</div>
      <div>
        <el-input  :placeholder="msg.nameInput" class="h-input" v-model="inputC.userName" style="display: none"></el-input>
        <i class="h-user"></i>
        <input type="text" :placeholder="msg.nameInput" v-model="inputC.userName" >
      </div>
      <div>
        <!--            <el-input type="password"  :placeholder="msg.passInput" class="h-input" v-model="inputC.password"></el-input>-->
        <i class="h-pass"></i>
        <input type="password" :placeholder="msg.passInput" v-model="inputC.password">
      </div>
      <div style="padding-left: 20px">
        <input type="text" :placeholder="msg.checkCode" style="width: 150px" v-model="codeInput">
        <img :src="`data:image/png;base64,${img}`" alt="" width="100px" height="30px" @click="getCode()">
      </div>

      <div class="btnDiv" >
        <input  type="button"  @click="checkCode()"  class="h-l" :value="msg.login" />
      </div>
      <div style="display: flex;justify-content: space-between;padding-left: 40px;padding-right: 40px;">
        <div class="h-size" style="display: none">
          <el-checkbox v-model="inputC.remberPassword"></el-checkbox>
          {{msg.keepPass}}
        </div>

        <div @click="$router.push({path:'/forgotPassword'})" class="cur" style="font-size: 13px"> {{msg.forgetPass}}</div>
        <div @click="$router.push('/register')" style="cursor: pointer">
          {{msg.register}}
        </div>
      </div>
      <div @click="$router.push({path:'/register'})" class="cur btnDiv" style="display: none">{{msg.register}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
  import {getCode} from "../http/request";

  export default {
    name: "login",
    data(){
      return{
        inputC:{},
        img:'',
        code:'',
        codeInput:''
      }
    },
    inject:['reload'],
    computed:{
      ...mapState('login',['msg','input'])
    },
    methods:{
      ...mapActions('login',['login']),
      checkLogin(){
        //const token=sessionStorage.getItem('token');
        const token=this.$cookies.get('tokendev')
        if(token){
          this.$router.push('/home')
        }else {
          this.$router.push('/login')
        }
      },
      exportPassword(){
        let local=window.localStorage;
        console.log(local.getItem('userName'))
        this.inputC.userName=local.getItem('userName');
        this.inputC.password=local.getItem('password');
        if(this.inputC.userName){
          this.inputC.remberPassword=false;
        }
      },
      checkUserAgent(){
        //console.log(navigator.userAgent,1111111111)
        if(navigator.userAgent.indexOf('Trident')>-1){
          alert('在IE模式下打开本网站可能会出现错误，推荐使用谷歌浏览器或者将浏览器切换至极速模式')
        }
      },
      getCode(){
        getCode().then(res=>{
          this.img=res.data.image;
          this.code=res.data.code;
        });
      },
      checkCode(){
        let i=this.code.toUpperCase();
        let j=this.codeInput.toUpperCase();
        i==j?this.login(this.inputC):this.$message.error('验证码错误')&&this.getCode();
      }
    },
    mounted() {
      this.inputC=this.input;
      this.checkLogin();
      //this.exportPassword();
      this.checkUserAgent();
      this.getCode();
    }
  }
</script>

<style scoped>
  .h-div{
    background: url("../assets/bg.png") no-repeat center  center;
    background-size:100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .h-login{
    position: relative;
    width: 360px;
    padding-bottom: 20px;
    background: rgb(250,250,250);
    left: 50%;
    margin-left:-220px;
    top: 20%;
    box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius:10px;
  }
  .h-login>div{
    height: 60px;
    line-height: 60px;
  }
  .h-login div.h-head{
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    height:90px;
    line-height: 90px;
    font-size:24px;
    color:#FF644E
  }
  .h-input{
    width:280px;
  }
  .cur{
    cursor: pointer;
    color: #ff644e;
  }
  .h-size{
    color: #9F9795;
    font-size: 13px;
  }
  input[type="button"]{
    width: 300px;
    height:50px;
    line-height: 50px;
    background: #ff644e;
    color: white;
    border-radius:10px;
    font-size: 18px;
    border:0px none;
    cursor: pointer;
  }

  input[type="text"]{
    width:250px;
    border: 0;
    outline: none;
    border-bottom: 1px solid #e5e5e5;
    line-height: 24px;
    font-size: 14px;
    padding-left: 40px;
    margin-left: 15px
  }
  input[type="password"]{
    width:250px;
    border: 0;
    outline: none;
    border-bottom: 1px solid #e5e5e5;
    line-height: 24px;
    font-size: 14px;
    padding-left: 40px;
    margin-left: 15px
  }
  ::-webkit-input-placeholder{
      color: #DFDCDC
  } /* 使用webkit内核的浏览器 */
  :-moz-placeholder{  color: #DFDCDC} /* Firefox版本4-18 */
  ::-moz-placeholder{ color: #DFDCDC} /* Firefox版本19+ */
  :-ms-input-placeholder{ color: #DFDCDC}
  .h-user{
    background: url("../assets/login_icon_user.png") no-repeat center;
    background-size: 80%;
    display: inline-block;
    width: 17px;
    height: 20px;
    position:relative;
    top: 6px;
    left: 40px;

  }
  .h-pass{
    background: url("../assets/login_icon_pw.png") no-repeat center;
    background-size: 80%;
    display: inline-block;
    width: 17px;
    height: 20px;
    position:relative;
    top: 6px;
    left: 40px;
  }
  .btnDiv{
    clear: both;
    text-align: center;
  }
</style>
