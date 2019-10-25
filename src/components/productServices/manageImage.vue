<template>
  <div>
    <div v-if="$route.name=='manageImageT'||$route.name=='manageImageR'||$route.name=='manageImageL'">
      <el-card class="box-card " style="overflow:hidden">
        <el-row class="tac" style="margin-bottom:25px">
          <el-col>
            <span><label>图库名称:</label>{{formSize.name}}<i class="normal" @click="dialogVisible=true;msg='';imgIdentifiedName='formSize.name'">修改</i></span>
            <span><label>调用次数:</label>{{formSize.callCount}}</span>
            <span><label>状态:</label><i style="margin-left:0" :class="{'success':formSize.state==1}" @click="upper([rowId]).then(v=>{
              getMsg($route.query);})">启用</i><i :class="{'success':formSize.state==2}" @click="lower([rowId]).then(v=>{
              getMsg($route.query);})">停用</i></span>

          </el-col>
        </el-row>
        <el-row class="tac">
           <span><label>图片数/总数:</label>{{formSize.imageCount}}/{{formSize.capacity}}</span>
           <span><label>创建时间:</label>{{formSize.createTime}}</span>
           <span><label>密钥:</label>
           <el-input  v-model="formSize.tagKey" style="width:150px;" refs="copyIpt"></el-input>
           <el-button @click="copyUrl2(formSize.tagKey)">复制</el-button>
           </span>
        </el-row>
      </el-card>
      <div style="margin-top:20px;margin-bottom:20px">
          <el-button type="primary" icon="el-icon-arrow-left" @click="goTo()">返回</el-button>
          <el-button type="primary" @click="imgVisible=true;identifiedMsg='';imgIdentifiedName=''">添加识别图</el-button>
          <el-input v-model="wd" placeholder="识别图名称" style="width:25%;margin-left:30px"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
      </div>
       <!-- 数据展示 -->
      <el-table
      :data="tableData"
      border
      style="width: 100%;position:relative">
      <el-table-column
      prop="fileId"
      label="图片"
      width="180"
      align="center"
      >
       <template slot-scope="scope">
       <img
          :src="scope.row.fileId?`/download/file/get/${scope.row.fileId}`:null"
          alt
          style="width: 50px;height: 50px"
              >
      </template>
      </el-table-column>

      <el-table-column
      prop="name"
      :label="'识别图名称'"
      width=""
      align="center"
      >
      </el-table-column>

      <el-table-column
      prop="imageId"
      :label="'识别图ID'"
      width=""
      align="center"
      >
      </el-table-column>
      <el-table-column
      prop="status"
      label="状态"
      width="120"
      align="center"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.status==1"  >启用</span>
        <span v-if="scope.row.status==2"  style="color:#FF644E">停用</span>
      </template>

      </el-table-column>
      <el-table-column
      prop="createTime"
      :label="'添加时间'"
      width="180"
      align="center"
      >
      </el-table-column>
      <el-table-column
      label="操作"
      align="center"
      width="180"
      fixed="right"
      >
     <template slot-scope="scope">
       <el-button type="primary" size="mini" @click="handleEdit(scope.row)" >管理</el-button>
       <el-button type="danger" size="mini"    @click="del(scope.row.id).then(v=>{
            getMsg($route.query);})">删除</el-button>
      </template>

      </el-table-column>
      </el-table>
      <div style="margin-top:15px"> <pagination v-if="showPagination"></pagination></div>
      <!-- 修改图库名称 -->
      <el-dialog title="修改图库名称" :visible.sync="dialogVisible" @closed="dialogVisible=false;imgBaseName=formSize.name;msg='';isCheck=false;">
        <el-input v-model="imgBaseName" placeholder="请输入内容" ></el-input>
        <i :class="{'msg':true,'iSuccess':msg=='success'}" ref="iMsg">{{msg}}</i>
         <div style="width:200px;margin:20px auto 0">
          <el-button type="primary" @click="imgCreate()" >立即修改</el-button >
          <el-button  @click="dialogVisible=false;imgBaseName=formSize.name;msg='';isCheck=false;">返回</el-button>
        </div>
      </el-dialog>
      <!-- 上传识别图 -->
        <el-dialog title="添加识别图" :visible.sync="imgVisible" @close="returnMsg" >
          <el-form ref="identifiedForm" :model="identifiedForm" label-width="120px">
          <el-form-item label="识别图名称:">
            <el-input v-model="imgIdentifiedName" placeholder="最多64位非空字符" ></el-input>
            <i :class="{'msg':true,'iSuccess':identifiedMsg=='success'}" ref="iMsg">{{identifiedMsg}}</i>
          </el-form-item>
          <el-form-item label="上传识别图:">
            <uploadMap :picId="identifiedForm.grayImageFileId" :rate="identifiedForm.rating" :imageDatabaseId="rowId"></uploadMap>
            <span>请上传JPG/PNG格式，限制大小2M以内</span>
            <div style="position: absolute;bottom:80px;left: 280px;">
              <img v-if="identifiedForm.identifyRating<3"  src="../../assets/startOrange.png" v-for="(item,idx) in identifiedForm.identifyRating"  :key="idx"/>
              <img v-if="identifiedForm.identifyRating>=3"  src="../../assets/startGreen.png" v-for="(item,idx) in identifiedForm.identifyRating"  :key="'info2-'+idx"/>
              <img  src="../../assets/startNull.png" v-for="(item,idx) in ratingOther" :key="'info3-'+idx"/>
              <div v-if="identifiedForm.identifyRating>=3">图像识别通过</div>
              <div v-else-if="identifiedForm.identifyRating>0&&identifiedForm.identifyRating<=2" class="dan">不推荐作为识别图,请重新上传</div>
              <div v-if="identifiedForm.identifyRating===0" class="dan">无法作为识别图,请重新上传</div>
            </div>
          </el-form-item>
           <div style="position:relative" v-if="similarImages.length>0">
            <span>系统检测到以下相似图片:</span>
            <pics :similarImages="similarImages"></pics>
          </div>
          <el-form-item label="宽度(单位:cm):" v-if="routerType==2">
             <el-input v-model="widthLocation" placeholder="只允许输入数字和小数点"  @input="widthLocation=widthLocation.replace(/[^\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="imgIdentifiedCreate()" >立即新增</el-button >
            <el-button  @click="returnMsg();imgVisible=false;">返回</el-button>
          </el-form-item>
          </el-form>
        </el-dialog>
    </div>
     <router-view></router-view>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'
import pagination from '../../share/pagination'
import uploadMap from '../../share/uploadMap'
import pics from '../../share/pics'
export default {
  inject:['replace','reload'],
  data(){
    return {
      title:'',
      rowId:'',
      wd:'',
      routerType:'',
      formSize:{ //详情
        createTime:'',
        name:'',
        state:'',
        callCount:'',//调用次数
        capacity:'',//图片总数
        imageCount:''//图片数

      },
      imgBaseName:'',//图库名称
      imgIdentifiedName:'',//识别图名称
      imgForm:{ //图库名称
        id:'',
        name:''
      },
      msg:'',
      dialogVisible:false,
      showPagination:false,
      imgVisible:false,

      identifiedForm:{ //创建识别图
        name:'',
        imageDatabaseId:'',
        fileId:'',
        identifyRating:0,
        grayImageFileId:'',
      },
      widthLocation:'',
      identifiedMsg:'',//识别图名称检测信息
      isCheck:false,//是否验证图库名
    }
  },
  created(){
    let query=this.$route.query
    let pageRecord = query.pages;//记录上一次页码操作
    let limitRecord = query.limits;//记录上一次limit操作
    this.wd=query.wd?query.wd:'';
    this.routerType=parseInt(this.$route.query.serverType);//1-图像追踪  2-图像定位  3-图像检索
    this.rowId=parseInt(this.$route.query.id)
    this.imgForm.id=parseInt(this.$route.query.id)
    this.identifiedForm.imageDatabaseId=this.rowId
     switch (this.routerType) {
      case 1:
        this.info({id:this.rowId})
        this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })

        break;
      case 2:
          this.info({id:this.rowId})
          this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.identifiedForm.width=0
        })
        break;
      case 3:
         this.info({id:this.rowId})
         this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })
        break;
      default:
        break;
    }
    this.$nextTick(()=>{
      this.$store.commit('pagination/setClickPage',pageRecord);
      this.$store.commit('pagination/setLimitPage',limitRecord);
      this.showPagination = true;//加载分页组件
    })
  },
   computed:{
    ...mapState('manageImage',{tableData:'tableData',total:'total',currentRow:'currentRow'}),
    ...mapState('pagination',{pages:'clickPage',limits:'limitPage'}),
    ...mapState("uploadMap", { shelfPicId: "fileId",similarImages:"similarImages",grayImageFileId:'grayImageFileId',rating:"rating" }),
    ratingOther(){
     return 5-this.identifiedForm.identifyRating
   },
   key() {
        return this.$route.name !== undefined? this.$route.name + new Date(): this.$route + new Date()
    }
    },

    methods:{
     ...mapActions('manageImage',['init','info','imgUpdate','upper','lower','checkImgName','imgIdentified','del']),
     ...mapActions('createImage',['check']),
  imgCreate(){
    if(!this.imgForm.name){
          this.$alert("请填写识别图名称", "提示", {
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
    this.imgUpdate(this.imgForm).then(v=>{
      this.dialogVisible=false
      this.getMsg()
      })
  },
  //识别图保存
  imgIdentifiedCreate(){
      if(!this.identifiedForm.name){
          this.$alert(this.identifiedMsg?this.identifiedMsg:"请填写识别图名称", "提示", {
            confirmButtonText: "确定"
          });
          return;
    }
    if(!this.identifiedForm.fileId){
      this.$alert("请上传识别图", "提示", {
            confirmButtonText: "确定"
          });
           return;
    };
    if(!this.identifiedForm.width&&this.routerType==2){
      this.$alert("请填写识别图宽度", "提示", {
            confirmButtonText: "确定"
          });
           return;
    };
		 this.imgIdentified(this.identifiedForm).then(v=>{
       this.returnMsg()
       this.imgVisible=false
       this.getMsg(this.$route.query)
       })
  },
  // 管理调整路由
  handleEdit(row){
    let another={...this.$route.query}
    this.routerType==1? this.$router.push({path:'/productServices/imageIdentified/imageTracking/manageImage/identifiedInfo',query:{oldQuery:JSON.stringify({...this.$route.query,ids:row.id})}}):this.routerType==2?this.$router.push({path:'/productServices/imageIdentified/imageLocation/manageImage/identifiedInfo',query:{oldQuery:JSON.stringify({...this.$route.query,ids:row.id})}}):this.$router.push({path:'/productServices/imageIdentified/imageRetrieval/manageImage/identifiedInfo',query:{oldQuery:JSON.stringify({...this.$route.query,ids:row.id})}})
  },
  returnMsg(){
    this.$store.commit("uploadMap/clearSimilarImages")
    this.$store.commit("uploadMap/clearGrayImageFileId")
    this.$store.commit("uploadMap/clearRating")
    this.widthLocation=''
    this.imgIdentifiedName=''
    this.identifiedMsg=''
    this.identifiedForm.identifyRating=0
  },
  goTo(){
    this.routerType==1? this.$router.push({path:'/productServices/imageIdentified/imageTracking',query:JSON.parse(this.$route.query.msg)}):this.routerType==2?this.$router.push({path:'/productServices/imageIdentified/imageLocation',query:JSON.parse(this.$route.query.msg)}):this.$router.push({path:'/productServices/imageIdentified/imageRetrieval',query:JSON.parse(this.$route.query.msg)})
  },
 copyUrl2(data)
  {
  let url = data;
  let oInput = document.createElement('input');
  oInput.value = url;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象;
  document.execCommand("Copy"); // 执行浏览器复制命令
  this.$message({
    message: '已成功复制到剪切板',
    type: 'success'
  });
  oInput.remove()

  },
  getMsg(query){
    this.routerType=parseInt(this.$route.query.serverType);
    switch (this.routerType) {
      case 1:
        this.info({id:this.rowId})
        this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.$store.commit('pagination/setLimitPage',this.$route.query.limits)
        })
        break;
      case 2:
        this.info({id:this.rowId})
        this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.$store.commit('pagination/setLimitPage',this.$route.query.limits)
        })
        this.identifiedForm.width=0
        break;
      case 3:
        this.info({id:this.rowId})
        this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.$store.commit('pagination/setLimitPage',this.$route.query.limits)
        })
        break;
      default:
        break;
    }

  }
    },
    watch:{
     //图库名称检验
     imgBaseName(){
          this.msg='正在验证...'
          this.imgForm.name=this.imgBaseName
          if(this.isCheck){
            if(!this.imgBaseName){
              this.msg='名称不能为空'
            }else if(this.imgBaseName.length>=64){
              this.msg='名称不能超过64位'
            }else{
              this.check({name:this.imgBaseName}).then(v=>{
                this.msg=v.msg;
              })
            }

          }
    this.isCheck=true;
  },
 //识别图名称检验
  imgIdentifiedName(){
        this.identifiedMsg=''
        this.checkImgName({name:this.imgIdentifiedName}).then(v=>{
          if(!this.imgIdentifiedName){
        this.identifiedMsg='名称不能为空'
        this.identifiedForm.name=''
        }else if(this.imgIdentifiedName.length>=64){
          this.identifiedMsg='名称不能超过64位'
          this.identifiedForm.name=''
        }else{
        this.identifiedMsg=v.msg
        v.code==0?this.identifiedForm.name=this.imgIdentifiedName:this.identifiedForm.name=''
        }

          })

  },
    shelfPicId() {
      this.identifiedForm.fileId = this.shelfPicId;
      this.identifiedForm.identifyRating = this.rating;

    },
    grayImageFileId(){
      this.identifiedForm.grayImageFileId = this.grayImageFileId
    },
    pages(){
       this.replace("pages",this.pages);
    },
    limits(){
       this.replace('limits',this.limits);
    },
    wd(){
      this.$store.commit('pagination/setClickPage',1);
      this.replace('wd',this.wd);
    },
    currentRow(){
      this.formSize = Object.assign(this.formSize, this.currentRow);
      this.imgBaseName=this.formSize.name;
      this.isCheck=false;//不需验证图库名
    },
    widthLocation(){
      this.identifiedForm.width=parseFloat(this.widthLocation)
    },
     $route(to,form){//判断路由query变化执行请求
      if(this.$route.name=='manageImageT'||this.$route.name=='manageImageL'||this.$route.name=='manageImageR'){
      let query=this.$route.query
      //this.routerType=parseInt(this.$route.query.serverType);//1-图像追踪  2-图像定位  3-图像检索
      this.rowId=parseInt(this.$route.query.id)
      this.imgForm.id=parseInt(this.$route.query.id)
      this.identifiedForm.imageDatabaseId=this.rowId;
      this.getMsg(this.$route.query);
    //  switch (this.routerType) {
    //   case 1:
    //     this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
    //       this.$store.commit('pagination/setTotal',this.total);
    //       this.$store.commit('pagination/setLimitPage',this.$route.query.limits)
    //     })
    //     break;
    //   case 2:
    //       this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
    //       this.$store.commit('pagination/setTotal',this.total);
    //       this.$store.commit('pagination/setLimitPage',this.$route.query.limits)
    //     })
    //     this.identifiedForm.width=0
    //     break;
    //   case 3:
    //      this.init({...query,imageDatabaseId:this.rowId}).then(v=>{
    //       this.$store.commit('pagination/setTotal',this.total);
    //       this.$store.commit('pagination/setLimitPage',this.$route.query.limits)
    //     })
    //     break;
    //   default:
    //     break;
    // }
      }
    }
    },
    components:{
    pagination,
    uploadMap,
    pics
  },
}
</script>
<style scoped>
.tac span{
  width:30%; float: left;color: #999999
}
.tac span label{
  padding-right: 30px;color: #222222
}
.tac span i{
  font-style:normal;cursor: pointer;margin-left: 20px
}
.normal{
color: #21B4E0;
}
.success{
color: #65BB31
}
.msg{
color:#f56c6c;font-size:12px;display: block;height: 20px;line-height: 20px;
}
.iSuccess{
  color:#67c23a
}
</style>
