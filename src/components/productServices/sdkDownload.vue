<template>
  <div>
    <div>
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">SDK包下载</span>
      </div>
      <div class="sdkList">
        <div class="sdkSon" v-for="(item,idx) in sdkArr" :key="idx">
          <h3 class="sdkName">{{item.sdkName}}</h3>
          <div style="overflow:hidden;">
            <div class="sdkDesc">{{item.sdkDesc}}</div>
            <div class="sdkRight">
              <div style="float:left;">
                <div class="date">{{item.updateTime}}</div>
                <div v-if="!item.updateTime" class="date">{{item.createTime}}</div>
                <!-- <p class="type">{{'无此功能.zip (适用mac)'}}</p> -->
                <!-- <p class="type">{{'无此功能.zip (适用win)'}}</p> -->
              </div>
              <div style="float:right;">
                  <span @click="download(item.sdkResourceCode)" style="font-size:40px;color:#1FA9E8;cursor:pointer;"><i class="el-icon-download"></i></span>
                  <!-- <a :href="`http://192.168.239.60:10086/file/download?uuid=${item.sdkResourceCode}`" style="font-size:40px;color:#1FA9E8;cursor:pointer;" download><i class="el-icon-download"></i></a> -->
              </div>
            </div> 
          </div>
          <div class="underborder"></div>
        </div>
      </div>
      <div>
        <pagination></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {sdkList,downloadSdk} from '../../http/request'
import pagination from '../../share/pagination'
import { mapState } from 'vuex';
export default {
  name:'sdkDownload',
  components:{
    pagination
  },
  data(){
    return{
      sdkArr:[],
    }
  },
  computed:{
    ...mapState('pagination',{page:'clickPage',limit:'limitPage'}),
    params(){
      return{
        page:this.page?this.page:1,
        limit:this.limit?this.limit:20,
      }
    }
  },
  watch:{
    page(){
      this.getSdkList();
    },
    limit(){
      this.getSdkList();
    },
  },
  methods:{
    //获取sdk下载列表
    getSdkList(){
      sdkList({...this.params}).then(res=>{
        this.sdkArr=res.data.items;
        this.$store.commit('pagination/setTotal', res.data.total);
      })
    },
    download(uuid){
      downloadSdk({uuid});
    }
    
  },
  created(){
    this.getSdkList();
  }
}
</script>
<style scoped>
.sdkList{
  padding:0 50px 0 50px;
}
.sdkSon{
  position: relative;
  padding-bottom: 30px;
}
.underborder{
  width:100%;
  height:1px;
  background:rgba(223,220,220,1);
  position: absolute;
  bottom: 0;
  left: 0;
}
.sdkName{
  height:20px;
  font-size:24px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(16,16,16,1);
}
.sdkDesc{
  float:left;
  width:700px;
  height:100%;
  line-height: 28px;
  font-size:20px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
}
.sdkRight{
  float:right;
  width:420px;
}
.date{
  width:204px;
  height:28px;
  line-height: 28px;
  font-size:20px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
}
.type{
  width:350px;
  height:28px;
  margin:0;
  line-height: 28px;
  font-size:20px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(31,169,232,1);
  cursor:pointer;
}
.type:hover{
  text-decoration: underline;
}
</style>
