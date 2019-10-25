<template>
  <div class="h-div">
    <div class="h-login">
      <div class="h-head">{{msg.appName}}</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" style="padding-top:15px">
        <el-form-item label="请输入用户名" prop="code" >
          <el-input  v-model="ruleForm.code" :placeholder="msg.codeInput"></el-input>
        </el-form-item>
        <el-form-item label="输入邮箱" prop="email" >
          <el-input v-model="ruleForm.email" :placeholder="msg.emailInput" ></el-input>
<!--          <input type="button"  class="code" @click="getCode()"  :disabled="msg.disabled" :value="msg.codeBtn" ref="code">-->
        </el-form-item>

        <el-form-item label="输入密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :placeholder="msg.password"></el-input>
              </el-form-item>
<!--              <el-form-item label="确认密码" prop="checkPass">-->
<!--                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" :placeholder="msg.rePassword"></el-input>-->
<!--        </el-form-item>-->
        <div class="btnDiv">
          <input type="button" class="currentBtn " @click="submitForm('ruleForm')" value="确定" style="margin-right:30px"/>
          <input type="button" @click="cancel()" value="取消">
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {register,login} from '../http/request'
  export default {
    name: "register",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{8}$/.test(value)){
           callback(new Error('字母+数字不等于8位'));
        }else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        }
        //  else if (value != 1111) {
        // callback(new Error('验证码不正确!'))
        // }
        else {
          callback()
        }
      };

      return{
        rules: {
          email:[
            {required: true, message: '请输入邮箱地址'},
            {type:'email',message:'邮箱格式不对', trigger: ['blur', 'change']}
          ],
          code:[
            {required: true, message: '请输入用户名'},
            { validator: validateCode, trigger: 'blur' }
          ],
          pass: [
            {required: true, message: '请输入密码'},
          	{ validator: validatePass, trigger: 'blur' }
          ],
          // checkPass: [

          // 	{ validator: validatePass2, trigger: 'blur' }
          // ]

        }
      }
    },
    computed:{

      ruleForm(){
        return this.$store.state.register.input
      },

      msg(){
        return this.$store.state.register.msg
      }
      // codeImg(){
      //   return url
      // }
    },
    created(){
      this.ruleForm.email=''
      this.ruleForm.code=''
    },

    methods:{
      // 		changeCodeImg(){
      // 　　　　var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
      // 　　　　this.codeImg='url?'+num;
      // 　　},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            //this.$store.dispatch("register/init",{loginName:this.ruleForm.email,email:this.ruleForm.email,code:this.ruleForm.code,password:this.ruleForm.pass,surePassword:this.ruleForm.checkPass});
            register(this.ruleForm).then(v=>{
              v.code?this.$message.error(v.msg):(()=>{
                this.$message.success('注册成功');
                console.log(this.ruleForm,8888)
                let apple={
                  loginName:this.ruleForm.email,
                  password:this.ruleForm.pass
                }
                login(apple).then(res=>{
                  if(Boolean(res.code)){
                    this.$message({
                      message: res.msg,
                      type: 'error',
                      duration:'2000'
                    })
                  }else {
                    this.$router.push({
                      path:'/home'
                    }) ;
                    //sessionStorage.setItem("token", res.data.token);
                    this.$cookies.set('tokendev', res.data.token)
                    this.$cookies.set('status', res.data.status)
                  }
                })
              }
              )();

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel(){
        this.$router.push(
          {
            path: '/login'
          }
        )
      },
      getCode(){

        let reg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if(this.ruleForm.email==''){
          this.$message.error('邮箱不能为空');
        }else if(reg.test(this.ruleForm.email)==false){
          this.$message.error('请输入正确的邮箱');
        }else{
          this.$store.dispatch("register/code",{email:this.ruleForm.email,httpVue:this});
        }


      }
    }
  }
</script>

<style scoped>
  .h-div{
    background: url("../assets/bg.png") no-repeat center  center;
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    position: absolute
  }
  .h-login{
    position: relative;
    width: 440px;
    padding-bottom: 20px;
    background: rgba(250,250,250);
    left: 50%;
    margin-left:-220px;
    top: 20%;
    box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius:10px ;
  }

  .h-head{
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    height:90px;
    line-height: 90px;
    font-size:24px;
    color:#FF644E
  }

  .btnDiv	input[type="button"]{
    width:160px;
    height:50px;
    background:rgba(223,220,220,1);
    box-shadow:0px 4px 10px 0px rgba(223,220,220,0.3);
    border-radius:10px;
    font-size: 18px;
    border:0px none;
    cursor: pointer;
  }
  .h-login .el-input{
    width:280px;

  }

  .btnDiv input.currentBtn{

    background:rgba(255,100,78,1);
    border:2px solid rgba(255,100,78,1);
    box-shadow:0px 4px 10px 0px rgba(255,100,78,0.3);
    color:#fff
  }
  .code{
    width:68px;
    text-align: center;
    /* color:#fff; */
    height:36px;
    line-height: 36px;
    /* background:rgba(245,124,4,1); */
    /* border-radius:10px; */
    position:absolute;
    right:40px;
    font-size:14px;
    top:4px;
    cursor: pointer;
    /* border: 1px solid #ff644e */
  }
  .posR{
    position:relative
  }
  .btnDiv{
    clear: both;
    text-align: center;
  }
</style>
