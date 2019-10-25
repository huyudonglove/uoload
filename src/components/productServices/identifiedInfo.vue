<template>
  <div>
    <div v-if="$route.name=='identifiedInfoR'||$route.name=='identifiedInfoT'||$route.name=='identifiedInfoL'">
      <el-button type="primary" icon="el-icon-arrow-left" @click="goTo()">返回</el-button>
      <div class="content">
        <div class="info">
          <span><label>识别图名称：</label>{{formSize.name}}<i class="normal" @click="imgVisible=true;imgIdentifiedName=formSize.name" @focus="identifiedMsg='';">修改</i></span>
          <span><label>识别图ID：</label>{{formSize.imageId}}</span>
          <span><label>状态：</label>
          <i style="margin-left:0" :class="{'success':formSize.status==1}" @click="upperIdentified([rowId]).then(v=>{
              getMsg()})">启用
          </i>
          <i :class="{'success':formSize.status==2}" @click="lowerIdentified([rowId]).then(v=>{
              getMsg()})">停用
          </i>
          </span>
          <span><label>添加时间：</label>{{formSize.createTime}}</span>
          <span v-if="routerType==2"><label>宽度(cm)：</label>{{initWidth}}
          <i class="normal" @click="widthVisible=true;updateWidth()">修改</i>
          </span>
          <p style="border-bottom:1px solid #DFDCDC;height:30px;">
          </p>
          <div style="margin-top:30px;">
            <h3>
              <span><label>推荐使用：</label></span>
            </h3>
            <div style="clear:both;">
              <span ><label style="color:#999">可识别度：</label>
              <img v-if="formSize.identifyRating<3"  src="../../assets/startOrange.png" v-for="item in parseInt(formSize.identifyRating)" />
              <img v-if="formSize.identifyRating>=3"  src="../../assets/startGreen.png" v-for="item in parseInt(formSize.identifyRating)" />
              <img  src="../../assets/startNull.png" v-for="item in ratingOther" />
              </span>
            </div>
          </div>
        </div>

        <div class="imgD">
            <img width="380" height="380" :src="`/download/file/get/${formSize.grayImageFileId}`" />
        </div>
      </div>
    </div>
     <!-- 修改识别图名称 -->
      <el-dialog title="修改识别图名称" :visible.sync="imgVisible" @closed="imgIdentifiedName=formSize.name;identifiedMsg=''">
        <el-input v-model="imgIdentifiedName" placeholder="最多64位非空字符"></el-input>
        <i :class="{'msg':true,'iSuccess':identifiedMsg=='success'}" ref="iMsg">{{identifiedMsg}}</i>
         <div style="width:200px;margin:20px auto 0">
          <el-button type="primary" @click="imgIdentifiedCreate(1)" >修改保存</el-button >
          <el-button  @click="imgVisible=false;">返回</el-button>
        </div>
      </el-dialog>
      <!-- 修改宽度 -->
       <el-dialog title="修改识别图宽度" :visible.sync="widthVisible">
        <el-input v-model="widthLocation" placeholder="只允许输入数字和小数点" @input="widthLocation=widthLocation.replace(/[^\d.]/g,'')"></el-input>
         <div style="width:200px;margin:20px auto 0">
          <el-button type="primary" @click="imgIdentifiedCreate(2)" >修改保存</el-button >
          <el-button  @click="widthVisible=false;">返回</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'
export default {
  inject:['replace','reload'],
  data(){
    return {
       routerType:'',
       rowId:'',
       imgVisible:false,
       widthVisible:false,
       formSize:{
         name:'',
         identifyRating:0,
         status:1
       },
       initWidth:0,
       identifiedForm:{
         name:'',
         id:'',
         width:''
       },
      imgIdentifiedName:'',//识别图名称
      widthLocation:0,
      identifiedMsg:'',
      rowIds:'',
      query:'',
      able:true
    }
  },
  created(){
    this.query=this.$route.query
    this.rowIds=parseInt(JSON.parse(this.$route.query.oldQuery).id);
    this.routerType=parseInt(JSON.parse(this.$route.query.oldQuery).serverType);//1-图像追踪  2-图像定位  3-图像检索
    this.rowId=parseInt(JSON.parse(this.$route.query.oldQuery).ids)
    switch (this.routerType) {
      case 1:
        this.identifiedInfo({id:this.rowId})
        break;
      case 2:
        this.identifiedInfo({id:this.rowId})
        break;
      case 3:
        this.identifiedInfo({id:this.rowId})
        break;
      default:
        break;
    }
  },
  computed: {
     ...mapState('manageImage',{currentInfo:'currentInfo',total:'total'}),
      ratingOther(){
     return 5-this.formSize.identifyRating
   },
 },
 methods:{
     ...mapActions('manageImage',['init','identifiedInfo','upperIdentified','lowerIdentified','checkImgName','imgIdentifiedUpdate']),
  updateWidth(){
    this.widthLocation=this.formSize.width
  },
  //识别图保存
  imgIdentifiedCreate(params){
      switch (params) {
        case 1:
           if(!this.identifiedForm.name){
           this.$alert("请填写修改的识别图名称", "提示", {
            confirmButtonText: "确定"
          });
          return;
		    };
        this.imgIdentifiedUpdate(this.identifiedForm).then(v=>{
          this.imgVisible=false
          this.getMsg()
       })
        break;
        case 2:
        if(!this.identifiedForm.width){
           this.$alert("请填写修改的宽度", "提示", {
            confirmButtonText: "确定"
          });
          return;
		    };
        this.imgIdentifiedUpdate(this.identifiedForm).then(v=>{
          this.widthVisible=false
          this.getMsg()
       })
        break;
        default:
        break;
      }
  },
  goTo(){

    switch (this.routerType) {
      case 1:
        this.$router.push({path:'/productServices/imageIdentified/imageTracking/manageImage',query:JSON.parse(this.$route.query.oldQuery)})
        this.init({...this.query,imageDatabaseId:this.rowIds}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })
        break;
      case 2:
        this.$router.push({path:'/productServices/imageIdentified/imageLocation/manageImage',query:JSON.parse(this.$route.query.oldQuery)})
        this.init({...this.query,imageDatabaseId:this.rowIds}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })
         break;
      case 3:
       this.$router.push({path:'/productServices/imageIdentified/imageRetrieval/manageImage',query:JSON.parse(this.$route.query.oldQuery)})
      this.init({...this.query,imageDatabaseId:this.rowIds}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })
       break;
       default:
       break;
    }
  },
  getMsg(){
    switch (this.routerType) {
      case 1:
        this.identifiedInfo({id:this.rowId})
        break;
      case 2:
        this.identifiedInfo({id:this.rowId})
        break;
      case 3:
        this.identifiedInfo({id:this.rowId})
        break;
      default:
        break;
    }
  }
 },
 watch:{
    //识别图名称检验
  imgIdentifiedName(){
          this.identifiedMsg=''
          this.checkImgName({name:this.imgIdentifiedName}).then(v=>{
          if(!this.imgIdentifiedName){
          this.identifiedMsg='名称不能为空'
         }else if(this.imgIdentifiedName.length>=64){
          this.identifiedMsg='名称不能超过64位'
         }else{
            this.identifiedMsg=v.msg
            v.code==0?this.identifiedForm.name=this.imgIdentifiedName:this.identifiedForm.name=''
         }
          })

  },
   currentInfo(){
      this.formSize = Object.assign(this.formSize, this.currentInfo);
      this.routerType==2?this.initWidth=this.formSize.width:''
      this.identifiedForm=Object.assign(this.identifiedForm, this.currentInfo);
    },
    widthLocation(){
    this.identifiedForm.width=this.widthLocation
   }
 }
}
</script>
<style scoped>
.content{
  padding:20px;
  overflow: hidden;
}
.info{
  width:500px;
  float: left;
  margin-right: 20px
}
.imgD{
  float: left;
}
.imgD img{
 border:1px dashed #ccc;
 border-radius: 5px;
}
.info span{
  color:#999;
  display: block;
  line-height: 46px;
}
.info span label{
  text-align: right;
  color:#333;
  float: left;
  width:120px;
  margin-right: 10px;
}
.info span i{
  font-style:normal;cursor: pointer;margin-left: 20px
}
.success{
color: #65BB31
}
.normal{
color: #21B4E0;
}
.msg{
color:#f56c6c;font-size:12px;display: block;height: 20px;line-height: 20px;
}
.iSuccess{
  color:#67c23a
}
</style>
