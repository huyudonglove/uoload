<template>
    <div>
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;"> 账户信息</span>
      </div>
      <div style="margin-top: 10px;height: 200px">
        <div style="height: 30px;line-height: 30px;background: #F3F3F7;padding-left: 10px;font-size: 1.1rem">基本信息</div>
        <div style="padding-left: 20px">
          <div  class="h-d1">
            用户名&nbsp;&nbsp;
            <span style="display:inline-block;width: 200px;margin-left: 10px;color: #999999;">{{name}}</span>
          </div>
          <div class="h-d1">
            注册邮箱
          <span style="display:inline-block;width: 200px;margin-left: 10px;color: #999999;">{{email}}</span>
          </div>
        </div>
      </div>
      <div>
        <div style="height: 30px;line-height: 30px;background: #F3F3F7;padding-left: 10px;font-size: 1.1rem">安全信息</div>
        <div style="padding-left: 20px">
          <div class="h-d1">
            <span>邮箱绑定</span>
            <span style="display:inline-block;width: 200px;margin-left: 10px;color: #999999;">{{email}}</span>
            <span @click="emailShow=true" style="color: #21B4E0;font-size: .9rem;cursor: pointer">修改</span>
          </div>
          <div class="h-d1">
            <span>登录密码</span>
            <span style="display:inline-block;width: 200px;margin-left: 10px;color: #999999;">*******</span>
            <span @click="passShow=true;newPass='';oldPass='';checkNewPass='';" style="color: #21B4E0;font-size: .9rem;cursor: pointer">重置密码</span>
          </div>
        </div>
      </div>
      <div>
        <el-dialog
          title="修改邮箱"
          :visible.sync="emailShow"
          width="30%"
          >
          <h3>为了保证您的账号安全，更换绑定邮箱前请进行安全验证</h3>
          <div >
            <div style="height: 40px;">
              <span style="display: inline-block;width: 80px">原邮箱</span>
              <span>{{email}}</span>
            </div>
            <div style="height: 40px;">
              <span style="display: inline-block;width: 80px">验证码</span>
              <span><el-input style="width: 150px" v-model="firstCode"></el-input></span>
              <span><el-button @click="reviseEmail" :disabled="code">获取验证码{{num?`(${this.num}s)`:''}}</el-button></span>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top: 20px;text-align: center">
              <el-button @click="emailShow = false">取 消</el-button>
              <el-button type="primary" @click="checkEmail(email)">确 定</el-button>
          </div>
          </div>
        </el-dialog>
        <el-dialog
          title="绑定邮箱"
          :visible.sync="emailSecond"
          width="30%"
        >
          <div>
            <div style="height: 60px">
              <span style="display: inline-block;width: 80px">新邮箱</span>
              <span><el-input v-model="emailSecondInput" style="width: 300px"> </el-input></span>
            </div>
            <div style="height: 60px">
              <span style="display: inline-block;width: 80px">验证码</span>
              <span><el-input style="width: 150px" v-model="emailSecondCode"></el-input></span>
              <span><el-button @click="reviseSecond" :disabled="secondCode">获取验证码{{secondNum?`(${this.secondNum}s)`:''}}</el-button></span>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: center">
              <el-button @click="emailSecond = false">取 消</el-button>
              <el-button type="primary" @click="switchEmail()">确 定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-dialog
          title="重设密码"
          :visible.sync="passShow"
          width="30%"
        >
          <div>
            <span style="display: inline-block;width: 80px">原密码</span>
            <span><el-input style="width: 300px" v-model="oldPass" type="password"></el-input></span>
          </div>
          <div style="color:red;">{{this.oldMsg}}</div>
          <div style="margin-top: 20px">
            <span style="display: inline-block;width: 80px">新密码</span>
            <span><el-input style="width: 300px" v-model="newPass" type="password"></el-input></span>
          </div>
          <div style="color:red;">{{this.newMsg}}</div>
          <div style="margin-top: 20px">
            <span style="display: inline-block;width: 80px">再次输入新密码</span>
            <span><el-input style="width: 300px" v-model="checkNewPass" type="password"></el-input></span>
          </div>
          <div style="color:red;">{{this.checkNewMsg}}</div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="passShow = false">取 消</el-button>
              <el-button type="primary" @click="newPassApi()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
import {getSelf,reviseEmail,checkFirstEmail,switchEmail,newPassApi} from "../../http/request";

export default {
        name: "account",
        inject:['reload'],
        data(){
          return{
            id:'',
            name:'',
            email:'',
            password:'',
            emailShow:false,
            code:false,
            passShow:false,
            num:'',
            time:'',
            firstCode:'',
            emailSecond:false,
            emailSecondInput:'',
            emailSecondCode:'',
            secondCode:false,
            secondNum:'',
            secondTime:'',
            oldPass:'',
            newPass:'',
            checkNewPass:'',
            oldMsg:'',
            newMsg:'',
            checkNewMsg:'',
          }
        },
        methods:{
          getSelf(){
            getSelf().then(v=>{
              v.code?this.$message.error(v.msg): (()=> {

                this.name=v.data.userName;
                this.email=v.data.email;
                this.password=v.data.password;
                this.id=v.data.id;
              })();
            })
          },
          reviseEmail(){
            reviseEmail(this.email).then(res=>{
              res.code?this.$message.error(res.msg):
                (()=>{
                  var  self=this;
                  this.$message.success('验证码发送成功');
                  this.code=true;
                  setTimeout(function () {
                    self.code=false
                  },30000);
                  var i=30;
                  this.time=  setInterval(function () {
                    i=i-1;
                    console.log(i)
                    self.num=i;
                  },1000)
                })()
            });
          },
          checkEmail(){
            let msg={
              code:this.firstCode,
              email:this.email
            }
            checkFirstEmail(msg).then(v=>{
              v.code?this.$message.error(v.msg):(()=>{
                v.data?(()=>{
                    this.emailShow=false;
                    this.emailSecond=true;
                  })():this.$message.error('验证码错误或已过期')

              })()
            })
          },
          reviseSecond(){
            reviseEmail(this.emailSecondInput).then(res=>{
              res.code?this.$message.error(res.msg):
                (()=>{
                  var  self=this;
                  this.$message.success('验证码发送成功');
                  this.secondCode=true;
                  setTimeout(function () {
                    self.secondCode=false
                  },30000);
                  var i=30;
                  this.secondTime=  setInterval(function () {
                    i=i-1;
                    console.log(i)
                    self.secondNum=i;
                  },1000)
                })()
            });
          },
          switchEmail(){
            let msg={
                id:this.id,
                code:this.emailSecondCode,
                email:this.emailSecondInput
            }
            switchEmail(msg).then(res=>{
              res.code?this.$message.error(res.msg):(()=>{
                this.$message.success('修改成功');
                this.emailSecond=false;
                this.$alert('即将跳回登录页面', 'locus提醒您', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push('/logout');
                  }
                });

              })();
            })
          },
          newPassApi(){
            if(!this.oldPass){
              this.oldMsg = '不能为空'
            }
            if(!this.newPass){
              this.newMsg = '不能为空'
            }
            if(!this.checkNewPass){
              this.checkNewMsg='不能为空';
            }
            if(this.oldMsg===''&&this.newMsg===''&&this.checkNewMsg===''){
              let msg={
                  loginName:this.name,
                  oldPassword:this.oldPass,
                  password:this.newPass,
                  confirmPassword:this.checkNewPass
                }
                newPassApi(msg).then(res=>{
                  res.code?(()=>{
                    this.$message.error(res.msg)
                  })():(()=>{
                    this.$message.success(res.msg);
                    this.passShow=false;
                    this.$alert('即将跳回登录页面', 'locus提醒您', {
                      confirmButtonText: '确定',
                      callback: action => {
                        this.$router.push('/logout');
                      }
                    });
                  })();
                })
            }

          }
        },
        created() {
          this.getSelf();
        },
        watch:{
          num(){
            if (this.num<=0){
              clearTimeout(this.time)
            }
          },
          secondNum(){
            if (this.secondNum<=0){
              clearTimeout(this.secondTime)
            }
          },
          passShow(){
            if(!this.passShow){
              this.oldMsg='';
              this.newMsg='';
              this.checkNewMsg='';
            }
          },
          oldPass(){
            if(this.oldPass!==''){
              let isOk = /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{8}$/.test(this.oldPass);
              if(isOk){
                this.oldMsg='';
              }else{
                this.oldMsg = '字母+数字不等于8位'
              }
            }
          },
          newPass(){
            if(this.newPass!==''){
              let isOk = /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9]{8}$/.test(this.newPass);
              if(isOk){
                this.newMsg='';
              }else{
                this.newMsg = '字母+数字不等于8位'
              }
            }
            if(this.checkNewPass &&this.newPass!==this.checkNewPass){
              this.checkNewMsg='密码不一致';
            }else{
              this.checkNewMsg='';
            }
          },
          checkNewPass(){
            if(this.newPass!==this.checkNewPass){
              this.checkNewMsg='密码不一致';
            }else{
              this.checkNewMsg='';
            }
          }
        }
}
</script>

<style scoped>
.h-d1{
  height: 50px;
  line-height: 50px;
}
</style>
