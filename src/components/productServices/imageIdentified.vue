<template>
  <div>
    <div v-if="$route.name=='imageIdentified'">
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;"> 图像识别</span>
      </div>
      <div class="head">
        简介
      </div>
      <div class="text">
        图像识别功能赋予系统对用户视觉所感知到的内容进行分析与增强，识别的对象可以是用户视野范围内的图片、logo、或三维物体。
      </div>
      <div class="text">
        通过图像识别，系统可感知到用户所看到的图像和物体，并对其激活已设定的互动，提供内容增强信息的推送、用户兴趣点分析等功能。图像识别是做图像追踪的前提功能。
      </div>
      <div style="padding: 20px;padding-top: 50px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="d1">
                <div style="color: white;padding-top: 60px;font-size: 1.2rem">图像检索</div>
                <div style="color: white;padding: 30px;font-size: .9rem">
                  对图像的颜色、纹理、布局等进行分析和检索的图像检索技术
                </div>
              </div>
              <div class="h-button" v-if="service[3]=='1'">
                <el-button type="info" plain disabled="disabled">已开通</el-button>
                <el-button style="margin-right: 10px;color: #FF644E;" type="text" @click="$router.push('/productServices/imageIdentified/imageRetrieval')">去使用></el-button>
              </div>
              <div v-else class="h-b">
                <el-button @click="openServiceD(3)">
                  授权并开通
                </el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="d2">
                <div style="color: white;padding-top: 60px;font-size: 1.2rem">图像追踪</div>
                <div style="color: white;padding: 30px;font-size: .9rem">
                  通过追踪功能把虚拟的物体依附在这个识别出来内容上
                </div>
              </div>
              <div class="h-button" v-if="service[1]=='1'">
                <el-button type="info" plain disabled="disabled">已开通</el-button>
                <el-button style="margin-right: 10px;color: #FF644E;" type="text" @click="$router.push('/productServices/imageIdentified/imageTracking')">去使用></el-button>
              </div>
              <div v-else class="h-b">
                <el-button @click="openServiceD(1)" >
                  授权并开通
                </el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="d3">
                <div style="color: white;padding-top: 60px;font-size: 1.2rem">图像定位</div>
                <div style="color: white;padding: 30px;font-size: .9rem">
                  利用图像定位技术，对定位空间进行“构图”
                </div>
              </div>
              <div class="h-button" v-if="service[2]=='1'">
                <el-button type="info" plain disabled="disabled">已开通</el-button>
                <el-button style="margin-right: 10px;color: #FF644E;" type="text" @click="$router.push('/productServices/imageIdentified/imageLocation')">去使用></el-button>
              </div>
              <div v-else class="h-b">
                <el-button @click="openServiceD(2)" >
                  授权并开通
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <router-view ></router-view>
  </div>
</template>
<script>
import {getService,openServiceH} from "../../http/request";
export default {
  name:'imageIdentified',
  computed: {
 },
  data(){
    return{
      service:{}
    }
  },
  methods:{
    getService(){
      getService().then(v=>{
        v.code?this.$message.error(v.msg):(()=>{
          this.service=v.data;
          let i={};
          v.data.map(r=>{
            i[r.id]=r.permission;
          })
          console.log(i,8888)
          this.service=i;
        })()
      })
    },
    openServiceD(type){
      console.log(type)
      openServiceH(type).then(res=>{
        this.getService();
      });
    }
  },
  mounted() {
  },
  created() {
    this.getService();
  }
}
</script>
<style scoped>
.text{
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 28px;
  word-wrap: break-word;
  color: #000;
  margin-left: 20px;
}
.head{
  padding: 34px 0 14px;
  font-size: 24px;
  line-height: 30px;
  color: #000;
  margin-left: 20px;
}
.bg-purple {
  /*background: #d3dce6;*/
}
.grid-content {
  border-radius: 4px;
  min-height: 350px;
  text-align: center;
}
.d1{
  background: url("../../assets/pic_01.png") no-repeat center;
  width: 380px;
  height: 200px;
}
.d2{
  background: url("../../assets/pic_02.png") no-repeat center;
  width: 380px;
  height: 200px;
}
.d3{
  background: url("../../assets/pic_03.png") no-repeat center;
  width: 380px;
  height: 200px;
}
.h-button{
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.h-b{
  padding: 5px 10px;
}
</style>
