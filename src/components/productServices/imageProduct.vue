<template>
  <div>
    <div v-if="$route.name=='imageTracking'||$route.name=='imageLocation'||$route.name=='imageRetrieval'">
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">图像识别</span>
        <el-button style="float:right;margin-left:15px" type="primary" @click="create()">创建</el-button>	
      </div>
      <el-card class="box-card" style="margin-bottom:20px;">
          <h3>{{$route.name=='imageTracking'?'图像追踪':$route.name=='imageLocation'?'图像定位':'图像检索'}}：</h3>
          <!-- <el-button type="primary" style="margin-right:20px" :disabled='serverCounts != 0'>{{serverCounts?'已开通':'授权并开通'}}</el-button>
          <span v-if="serverCounts != 0">调用次数:{{serverCounts}}</span> -->
           <el-button @click="openServer" type="primary" style="margin-right:20px" :disabled="serviceData.permission==1" >{{serviceData.permission==1?'已开通':'授权并开通'}}</el-button>
          <span>调用次数:{{serverCounts}}</span> 
        </el-card>
        <div>
          <!-- 数据展示 -->
      <el-table
      :data="tableData"
      border
      style="width: 100%;position:relative">
      <el-table-column
      prop="name"
      label="图库名称"
      width=""
      align="center"
      >
      </el-table-column>
      <el-table-column
      prop="imageCount"
      :label="'图片数'"
      width="150"
      align="center"
      >
      </el-table-column>

      <el-table-column
      prop="createTime"
      :label="'创建时间'"
      width=""
      align="center"
      >
      </el-table-column>

      <el-table-column
      prop="expireDate"
      :label="'到期时间'"
      width=""
      align="center"
      >
      <template slot-scope="scope">
        <span>{{scope.row.expireDate?scope.row.expireDate:'无限制'}}</span>
      </template>
      </el-table-column>
      <el-table-column
      prop="state"
      label="状态"
      width="120"
      align="center"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.state==1"  >启用</span>
        <span v-if="scope.row.state==2"  style="color:#FF644E">停用</span>
      </template>

      </el-table-column>
      <el-table-column
      label="操作"
      align="center"
      width="200"
      fixed="right"
      >
     <template slot-scope="scope">
       <el-button type="primary" size="mini" @click="handleEdit(scope.row)" >管理</el-button>
      </template>

      </el-table-column>
      </el-table>
      <div align="center" v-if="tableData.length==0" style="position:absolute;top:290px;background:#fff;left:50%;transform:translateX(-50%)">
        <el-button type="text" @click="create()">开始创建第一个图库</el-button>
      </div>
        <div style="margin-top:15px"> <pagination v-if="showPagination"></pagination></div>
        </div>
    </div>
    <router-view ></router-view>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'
import pagination from '../../share/pagination'
import {openService,serviceStatus} from '../../http/request'
export default {
  name:'imageProduct',
  inject:['replace','reload'],
  data(){
    return{
      showPagination:false,
      routerName:'',
      serviceData:'',
    }
  },
  created(){
    let router=this.$route.name;
    let query=this.$route.query
    let pageRecord = query.page;//记录上一次页码操作
    let limitRecord = query.limit;//记录上一次limit操作
    switch (router) {
      case 'imageTracking':
        serviceStatus({type:1}).then(res=>{
          this.serviceData=res.data[0];
        })
        this.routerName=1
        this.serverCountImg({serviceId:1})
        this.init({...query,serviceType:1}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })
        
        break;
      case 'imageLocation':
          serviceStatus({type:2}).then(res=>{
            this.serviceData=res.data[0];
          })
          this.routerName=2
          this.serverCountImg({serviceId:2})
          this.init({...query,serviceType:2}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
        })
        break;
      case 'imageRetrieval':
          serviceStatus({type:3}).then(res=>{
            this.serviceData=res.data[0];
          })
         this.routerName=3
         this.serverCountImg({serviceId:3})
         this.init({...query,serviceType:3}).then(v=>{
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
    ...mapState('imageProduct',{tableData:'tableData',serverCounts:'serverCounts',title:'title',total:'total'}),
    ...mapState('pagination',{page:'clickPage',limit:'limitPage'}),

    routerType(){
      return this.routerName==1? this.$router.push({path:'/productServices/imageIdentified/imageTracking/createImage',query:{serverType:1,msg:JSON.stringify(this.$route.query)}}):this.routerName==2?this.$router.push({path:'/productServices/imageIdentified/imageLocation/createImage',query:{serverType:2,msg:JSON.stringify(this.$route.query)}}):this.$router.push({path:'/productServices/imageIdentified/imageRetrieval/createImage',query:{serverType:3,msg:JSON.stringify(this.$route.query)}})
    },
  },
  methods:{
    ...mapActions('imageProduct',['init','serverCountImg']),
    create(){
      let router = this.$route.name
      let query=this.$route.query
      switch (router) {
         case 'imageTracking':
        this.$router.push({path:'/productServices/imageIdentified/imageTracking/createImage',query:{serverType:1,msg:JSON.stringify(query)}})
        break;
        case 'imageLocation':
        this.$router.push({path:'/productServices/imageIdentified/imageLocation/createImage',query:{serverType:2,msg:JSON.stringify(query)}})    
        break;
        case 'imageRetrieval': 
        this.$router.push({path:'/productServices/imageIdentified/imageRetrieval/createImage',query:{serverType:3,msg:JSON.stringify(query)}})
        break; 
        default:
        break;
       } 
    },
    handleEdit(row){
      this.routerName==1? this.$router.push({path:'/productServices/imageIdentified/imageTracking/manageImage',query:{id:row.id,serverType:1,msg:JSON.stringify(this.$route.query)}}):this.routerName==2?this.$router.push({path:'/productServices/imageIdentified/imageLocation/manageImage',query:{id:row.id,serverType:2,msg:JSON.stringify(this.$route.query)}}):this.$router.push({path:'/productServices/imageIdentified/imageRetrieval/manageImage',query:{id:row.id,serverType:3,msg:JSON.stringify(this.$route.query)}})
    },
    openServer(){
      switch (this.$route.name) {
         case 'imageTracking':
           openService({type:1}).then(res=>{
             this.reload();
           })
        break;
        case 'imageLocation':
          openService({type:2}).then(res=>{
             this.reload();
           })
        break;
        case 'imageRetrieval': 
        openService({type:3}).then(res=>{
             this.reload();
           })
        break; 
        default:
        break;
       }
    }
  },
  watch:{
    page(){
      if(this.$route.name=='imageTracking'||this.$route.name=='imageLocation'||this.$route.name=='imageRetrieval'){
       this.replace("page",this.page);
      }
    },
    limit(){
      if(this.$route.name=='imageTracking'||this.$route.name=='imageLocation'||this.$route.name=='imageRetrieval'){
       this.replace('limit',this.limit);
      }
    },
     $route(to,form){//判断路由query变化执行请求
      if(this.$route.name=='imageTracking'||this.$route.name=='imageLocation'||this.$route.name=='imageRetrieval'){
      let routerNameType=this.$route.name;
      let query=this.$route.query
      switch (routerNameType) {
      case 'imageTracking':
        serviceStatus({type:1}).then(res=>{
          this.serviceData=res.data[0];
        })
        this.routerName=1
        this.serverCountImg({serviceId:1})
        this.init({...query,serviceType:1}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.$store.commit('pagination/setLimitPage',this.$route.query.limit)
        })
        break;
      case 'imageLocation':
        serviceStatus({type:2}).then(res=>{
          this.serviceData=res.data[0];
        })
         this.routerName=2
         this.serverCountImg({serviceId:2})
         this.init({...query,serviceType:2}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.$store.commit('pagination/setLimitPage',this.$route.query.limit)
        })
        break;
      case 'imageRetrieval':
        serviceStatus({type:3}).then(res=>{
          this.serviceData=res.data[0];
        })
         this.routerName=3
         this.serverCountImg({serviceId:3})
         this.init({...query,serviceType:3}).then(v=>{
          this.$store.commit('pagination/setTotal',this.total);
          this.$store.commit('pagination/setLimitPage',this.$route.query.limit)
        })
        break;
      default:
        break;
    }
      }
    }
  },
   components:{
    pagination
  },
}
</script>
<style scoped>

</style>
