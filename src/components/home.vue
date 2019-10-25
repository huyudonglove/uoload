<template>
  <div>
    <headNav></headNav>
    <div class="pa_body">
        <div class="body-menu">
        <el-row class="tac">
          <el-col :span="24" >
            <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo"  text-color="#614a4d" active-text-color="#ff644e" router @open="handleOpen" @close="handleOpen">
                <navMenu :menus="menus"></navMenu>
            </el-menu>
          </el-col>
        </el-row>
    </div>
        <div class="body-content">
      <el-main>
        <router-view/>
      </el-main>
      </div>
    </div>
  </div>

</template>

<script>
import navMenu from "./navMenu.vue";
import headNav from "./headNav.vue";
export default {
  name: "Home",
  data() {
    return {
    };
  },
  created(){
	this.$store.dispatch("navMenu/menuInit");
	},

  computed:{
	 menus(){
	 	 return this.$store.state.navMenu.menus
	 }
  },
  methods: {
    handleOpen(key, keyPath) {
      if(key=='/productServices/imageIdentified'){
        this.$router.push('/productServices/imageIdentified')
      }
    },


	},
   components: {
    navMenu,
    headNav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-main{
    padding-top: 10px;
  }
  .pa_body .body-menu{
  position:absolute;
  top:60px;
  left:0;
  bottom:0;
  width:212px;
  /*background-color:#545c64;*/
      }
  .pa_body .body-content{
  position:absolute;
  top:60px;
  left:210px;
  right:0;
  background-color:#fff;
  bottom:0;
  overflow:auto;
    border-left: 1px solid #eeeeee;
  }
.cur{ cursor: pointer;}

</style>
