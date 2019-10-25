<template>
    <div>
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;"> Access Key</span>
      </div>
      <div style="margin-top: 20px;margin-bottom: 10px;">
        <el-button @click="creatAccess" type="primary">创建Access Key</el-button>
      </div>
      <div style="height:30px;line-height: 30px;font-size: .8rem;color: #614a4d;background: beige;margin-bottom: 10px;">
        <i class="el-icon-warning"></i> AccessKey ID和AccessKey Secret 是您访问Locus的密钥，具有该账户完全的权限，请您妥善保管
      </div>
      <div>
        <div>
          <el-table
            ref="multipleTable"
            :data="tabledata"
            tooltip-effect="dark"
            border
          >
            <el-table-column label="Access Key" prop="accessKey" width="300">
            </el-table-column>
            <el-table-column label="Secret Key"  width="300" align="center">
              <template slot-scope="scope" >
                  <span v-if="!scope.row.visible" @click="scope.row.visible=!scope.row.visible" style="cursor: pointer;color:rgb(64,158,255)">显示</span>
                  <span v-if="scope.row.visible" @click="scope.row.visible=!scope.row.visible" style="cursor: pointer;">{{scope.row.secretKey}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="createByName" width="150">
              <template slot-scope="scope">

                <span v-if="scope.row.status==1">启用</span>
                <span v-if="scope.row.status==2">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="100" prop="createTime">

            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="error" size="mini" v-if="scope.row.status==1" @click="setStatus({id:scope.row.id,status:2})">禁用</el-button>
                <el-button type="primary" size="mini" v-if="scope.row.status==2" @click="setStatus({id:scope.row.id,status:1})">启用</el-button>
                <el-button type="success" size="mini" @click="deleteAccess(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <pagination v-if="showPagination"></pagination>
      </div>
    </div>
</template>

<script>
import {getAccess,creatAccess,deleteAccess,setStatus} from "../../http/request";
import pagination from '../../share/pagination'
import {mapState} from 'vuex'
export default {
        name: "identify",
        data(){
          return{
            tabledata:[],
            showPagination:false
          }
        },
        inject:['reload','replace'],
        components:{
          pagination
        },
        computed:{
          ...mapState('pagination',['clickPage','limitPage']),
        },
        methods:{
          getAccess(){
             getAccess(this.$route.query).then(res=>{
               console.log(res,888)
               let apple=res.data.items;
               apple.map(v=>{
                 v.visible=false
               })
               console.log(apple,888)
               this.tabledata=apple;
               this.$store.commit('pagination/setTotal',res.data.total);
             })
          },
          creatAccess(){
            creatAccess().then(res=>{
              this.getAccess();
            });
          },
          deleteAccess(id){
            deleteAccess(id).then(v=>{
              this.getAccess();
            });
          },
          setStatus(msg){
            setStatus(msg).then(res=>{
              this.getAccess();
            })
          }
        },
        created() {
          let pageRecord = this.$route.query.page;//记录上一次页码操作
          let limitRecord = this.$route.query.limit;//记录上一次limit操作
          this.$nextTick(()=>{
            this.$store.commit('pagination/setLimitPage',limitRecord);
            this.$store.commit('pagination/setClickPage',pageRecord);
            this.showPagination = true;//加载分页组件
          })
            this.getAccess();
        },
        watch:{
          clickPage(){
            this.replace('page',this.clickPage);
          },
          limitPage(){
            this.replace('limit',this.limitPage);
          },
          $route(){
            if(this.$route.name=='identify'){
              this.getAccess();
            }
          }
        }

  }
</script>

<style scoped>

</style>
