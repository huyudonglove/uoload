<template>
  <div>
    <div v-if="$route.name=='createImageL'||$route.name=='createImageT'||$route.name=='createImageR'">
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">创建图库</span>
      </div>
      <el-card class="box-card">
        <el-form ref="form" :model="formSize" label-width="150px" class="form">
          <el-form-item label="调用次数：">
            <span>无限次</span>
          </el-form-item>
          <el-form-item label="图库大小：">
            <span>1万张</span>
          </el-form-item>
           <el-form-item label="使用期限：">
            <span>无限制</span>
          </el-form-item>
           <el-form-item label="图库名称：">
            <el-input v-model="imgName" placeholder="请输入不超过64位非空字符" ></el-input>
            <i :class="{'msg':true,'iSuccess':msg=='success'}" ref="iMsg">{{msg}}</i>
          </el-form-item>
          </el-form>
      </el-card>
      <div style="width:200px;margin:20px auto 0">
        <el-button type="primary" @click="create()" >立即新增</el-button >
        <el-button  @click="goTo()">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'
import { constants } from 'fs';
export default {
  data(){
    return{
      formSize:{
        name:'',
        serviceType:null,
        state:1,
        capacity:10000,
        expireDate:'',
        notExpireDate:1,
        callCountLimit:0,
      },
      msg:'',
      routerName:'',
      imgName:''
    }
  },
  created(){
      let query=this.$route.query
      this.routerName=query.serverType
      this.formSize.serviceType=query.serverType
  },
  methods:{
    ...mapActions('createImage',['check','add','save']),
    create(){
      if(!this.formSize.name){
        this.$alert("请填写名称", "提示", {
          confirmButtonText: "确定"
        });
        return;
      };
      if(this.msg!='success'){
        if(this.msg==='正在验证...'){
          this.$alert('正在验证图库名称', "提示", {
            confirmButtonText: "确定"
          });
        }
        return;
      };
		  this.add(this.formSize).then(v=>{this.routerType})
	},
	 goTo(){this.routerType}
  },
  
  watch:{
     imgName(){
       this.msg='正在验证...'
       this.formSize.name=this.imgName;
  if(!this.imgName){
      this.msg='名称不能为空'
    }else if(this.imgName.length>=64){
      this.msg='名称不能超过64位' 
    }else{
      this.check({name:this.imgName}).then(v=>{
        this.msg=v.msg
      })
    }
  },
  },
  computed:{
    routerType(){
      return this.routerName==1? this.$router.push({path:'/productServices/imageIdentified/imageTracking',query:JSON.parse(this.$route.query.msg)}):this.routerName==2?this.$router.push({path:'/productServices/imageIdentified/imageLocation',query:JSON.parse(this.$route.query.msg)}):this.$router.push({path:'/productServices/imageIdentified/imageRetrieval',query:JSON.parse(this.$route.query.msg)})
    }
  }
}
</script>
<style scoped>
.form span{width:230px;height: 38px;display: block;background: #bebebe;text-align: center;line-height: 40px;color:#fff;
}
.msg{
color:#f56c6c;font-size:12px;display: block;height: 20px;line-height: 20px;
}
.iSuccess{
  color:#67c23a
}
</style>
