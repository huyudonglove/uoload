<template>
  <div>
    <div v-if="$route.name=='userList'">
      <el-row class="tac" style="border-bottom:1px solid #eeeeee; padding:15px 0;">
        <el-input style="width:240px" class="input-with-select" v-model="userParams">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input style="width:240px" class="input-with-select" v-model="emailParams">
          <template slot="prepend">邮箱</template>
        </el-input>
        <el-select v-model="state" style="width:150px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
        <span><timeSwitch></timeSwitch></span>
      </el-row>
      <div>
        <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" @selection-change="selectionChange">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column prop="time" label="注册时间"></el-table-column>
          <el-table-column prop="createUser" label="创建人"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary">查看</el-button>
              <el-button type="primary">编辑</el-button>
              <el-button type="primary">服务管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
          <pagination :total="total"></pagination>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import pagination from '../../share/pagination'
import { mapState, mapActions } from 'vuex';
import timeSwitch from '../../share/timeSwitch'
export default {
  name:'userList',
  components:{
    pagination,
    timeSwitch
  },
  computed:{
    ...mapState('userList',{total:'total',tableList:'tableList'}),
  },
  data(){
    return{
      userParams:'',//用户名参数
      emailParams:'',//邮箱参数
      state:'',
    }
  },
  methods:{
    ...mapActions('userList',['getUserList']),
    selectionChange(arr){
      console.log(arr);
    }
  }
}
</script>
<style scoped>

</style>
