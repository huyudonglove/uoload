<template>
  <div class="h-div">
    <!-- {{ruleForm}} -->
    <div class="h-login">
      <div class="h-head">locus开发者平台</div>
      <!-- {{ruleForm}} -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"  autocomplete="off" style="padding-top:15px;" class="demo" >
        <el-form-item label="设置新密码"  prop="pass" >
          <el-input v-model="ruleForm.pass" :disabled="dis" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码"  prop="checkPass" >
          <input  type="text"  class="is-hidden" />
          <el-input   v-model="ruleForm.checkPass" :disabled="dis" type="password"></el-input>
        </el-form-item>

        <div class="btnDiv" style="text-align: center">
          <input type="button" class="currentBtn "   value="确定" @click="pass('ruleForm')"/>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import {checkTime,pass} from "../http/request";

export default {
        name: "revisePassword",
        data(){
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{8}$/.test(value)){
              callback(new Error('字母+数字不等于8位'));
            }
            else {
              if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
              }
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
          return{
            rules: {
              pass: [
                {required: true,validator: validatePass, trigger: 'blur'}
              ],
              checkPass: [
                {required: true,validator: validatePass2, trigger: 'blur'}
              ]
            },
            ruleForm:{
              pass:'',
              checkPass:''
            },
            dis:true
          }
        },
        methods:{
          checkTime(msg){
              checkTime(msg).then(res=>{
                //console.log(res)
                res.code?this.$message.error(res.message):this.dis=false;
              }).catch(err=>{
                this.$message.error(err.message);
              })
          },
          pass(formName){
             this.$refs[formName].validate((valid) => {
              if (valid) {
              let apple={
                password:this.ruleForm.pass,
                code:this.$route.query.code
              }
              pass(apple).then(res=>{
                res.code?this.$message.error(res.msg):this.$message.success('修改成功')&&this.$router.push('/login')
              })
              } else {
                console.log('error submit!!');
                return false;
              }
        });

          }
        },
        mounted() {
          this.checkTime({code:this.$route.query.code});
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
    border-radius:10px;
  }

  .h-head{
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    height:90px;
    line-height: 90px;
    font-size:24px;
    color:#FF644E
  }

  /* input[type="text"]{
     width:200px;
     border: 0;
   outline: none;
   border: 1px solid #e5e5e5;
     line-height: 24px;
     font-size: 14px
    }
    input[type="passWord"]{
     width:280px;
     border: 0;
   outline: none;
   border: 1px solid #e5e5e5;
     line-height: 24px;
     font-size: 14px;
    } */
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

    background:rgb(253, 98, 77);
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
  ::-webkit-input-placeholder{
    color: #DFDCDC
  }    /* 使用webkit内核的浏览器 */
  :-moz-placeholder{	color: #DFDCDC}                  /* Firefox版本4-18 */
  ::-moz-placeholder{	color: #DFDCDC}                  /* Firefox版本19+ */
  :-ms-input-placeholder{	color: #DFDCDC}           /* IE浏览器 */
  /* .el-form-item__label{
       text-align: right;
   font-size: 16px !important;
   color: #606266;
   line-height: 40px;
   padding: 0 12px 0 0;
   -webkit-box-sizing: border-box;
   box-sizing: border-box
   } */
  .is-hidden {
    position: absolute;
    left: -10000px;
    top: -10000px;
  }
</style>
