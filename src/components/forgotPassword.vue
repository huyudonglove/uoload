<template>
    <div class="h-div">
		<!-- {{ruleForm}} -->
        <div class="h-login">
          <div class="h-head">{{msg.appName}}</div>
		    <!-- {{ruleForm}} -->
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"  autocomplete="off" style="padding-top:15px;" class="demo" v-if="!show">
			<el-form-item label="输入登录邮箱" prop="email" >
				<el-input v-model="ruleForm.email" :placeholder="msg.emailInput" ></el-input>
			</el-form-item>
			<el-form-item label="输入验证码" prop="code" >
				<input  type="text"  class="is-hidden" />
				<el-input  v-model="ruleForm.code" :placeholder="msg.codeInput"  style="width: 150px" ></el-input>
        <img :src="`data:image/png;base64,${img}`" alt="" width="100px" height="30px" @click="getCode()">
				<!-- <input type="text" v-model="ruleForm.code" :placeholder="msg.codeInput"/> -->
			</el-form-item>

			<div class="btnDiv">
				<input type="button" class="currentBtn "  @click="checkCode()" value="确定" style="margin-right:30px"/>
				<input type="button" @click="cancel()" value="取消">
			</div>

			</el-form>
          <div v-if="show" style="text-align: center">
            <h2>重设密码邮件已发送至您的邮箱</h2>
            请注意查收您的邮箱并重新设置密码
          </div>
        </div>
    </div>
</template>

<script>
import {getCode,sendEmail} from "../http/request";

export default {
		name: "forgotPassword",
        data(){
		var validatePass = (rule, value, callback) => {
			if (value === '') {
			callback(new Error('请输入密码'));
			}else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{8}$/.test(value)){
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
		var validateCode = (rule, value, callback) => {
			if (value === '') {
			callback(new Error('请输入验证码'))
			}
			else {
			callback()
			}
		};

            return{
						ruleForm:{
						email:'',
						code:'',
						pass:'',
						checkPass:''
					},
				rules: {
					email:[
						{required: true, message: '请输入邮箱地址'},
        				{type:'email',message:'邮箱格式不对', trigger: ['blur', 'change']}
					],
					code:[
        				{ required: true,validator: validateCode, trigger: 'blur' }
    				],
					pass: [

						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [

						{ validator: validatePass2, trigger: 'blur' }
					]

        		},
            img:'',
            code:'',
            codeInput:'',
            show:false
            }
        },
        inject:['reload'],
        computed:{

          msg(){
          	return this.$store.state.forgotPassword.msg
          }
		},
		  created(){
			},
			mounted(){
				this.ruleForm.email=''
				this.ruleForm.code=''
				this.ruleForm.pass=''
				this.ruleForm.checkPass=''
        this.getCode();
			},
        methods:{
          getCode(){
            getCode().then(res=>{
              this.img=res.data.image;
              this.code=res.data.code;
            });
          },

		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				 console.log(valid)
				  this.$store.dispatch("forgotPassword/forgot",{loginName:this.ruleForm.email,email:this.ruleForm.email,code:this.ruleForm.code,password:this.ruleForm.pass,surePassword:this.ruleForm.checkPass});
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
      checkCode(){
        let i=this.code.toUpperCase();
        let j=this.ruleForm.code.toUpperCase();
        i==j?sendEmail(this.ruleForm.email).then(res=>{
          res.code?this.$message.error(res.msg):this.show=true;
        }):this.$message.error('验证码错误')&&this.getCode();
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
