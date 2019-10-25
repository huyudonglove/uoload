<template>
  <div>
    <el-container>
      <div class="asideTree">
          <el-tree :data="treedata" @node-click="showDoc" :props="defaulProps" ></el-tree>
      </div>
      <el-main v-html="interfaceDocument">
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {interfaceTree,getInterfaceDoc} from '../../http/request'
export default {
  name:'interfaceDoc',
  data(){
    return{
      defaulProps: {
        label: "name",
        children:'childs'
      },
      treedata:[],//目录
      interfaceDocument:''//文章内容
    }
  },
  methods:{
    showDoc(data){
      if(!data.childs){
        this.getDoc(data.documentId);//获取指定文章
      }
    },
    //获取文章方法
    getDoc(id){
      getInterfaceDoc({id}).then(res=>{
        this.interfaceDocument = res.data.content;
      }).catch(err=>{
        this.interfaceDocument = '无文章';
      })
    }
  },
  created(){
    //获取目录
    interfaceTree().then(res=>{
      this.treedata = res.data;
    })
  }
}
</script>
<style scoped>
.asideTree {
  width: 20%;
  height: 100%;
}
</style>
