<template>
  <div >
    <div class="userMsg">
		您好，<span class="user">{{loginName}}</span> 先生/女士<span class="date">今日  {{new Date().toLocaleString()}}</span>
	</div>
	<div>
		<el-row>
			<el-col :span="14">
				<div class="showBox">
					<span class="titleH1">API用量</span>
					<div class="server">
						<el-table
						:data="apiData"
						style="width: 100%"
						align="center"
						>
						<el-table-column
							prop="serviceName"
							label="API"
							style="width: 50%"
							align="center"
							>
						</el-table-column>
						<el-table-column
							prop="count"
							label="调用量"
							style="width: 50%"
							align="center"
				        >
						</el-table-column>
    				    </el-table>
					</div>
				</div>
			</el-col>
			<el-col :span="10">
				<div class="showBox" style="margin-left:15px">
					<span class="titleH1">开发者工具</span>
					<div class="server" style="box-sizing:border-box;padding:30px 25px 0px 45px;">
						<div class="tools" style="background-color: #F3FAF0;">
							<div class="interface"></div>
							<div class="buttonWord" style="background-color:#65B930;" @click="$router.push({path:'/productServices/interfaceDoc'})">接口文档</div>
						</div>
						<div class="tools" style="background-color: #EEF8FD;">
							<div class="sdkDownload"></div>
							<div class="buttonWord" style="background-color:#1FA9E8;" @click="$router.push({path:'/productServices/sdkDownload'})">下载SDK</div>
						</div>
					</div>
				</div>


			</el-col>
		</el-row>
	</div>
	<div class="showBox showBox2">
		<span class="titleH1">我的可用服务列表</span>
		<div class="server">
			<el-table
			:data="serverData"
			style="width: 100%"
			align="center"
			>
			<el-table-column
				prop="name"
				label="API"
				style="width: 50%"
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="state"
				label="状态"
				width="150"
				align="center"
				>
				<template slot-scope="scope">
					 <span v-if="scope.row.state==1"  >启用</span>
      				 <span v-if="scope.row.state==2"  style="color:#FF644E">停用</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="countLimit"
				label="调用量限制"
				style="width: 50%"
				align="center"
			>
			<template slot-scope="scope">
				{{scope.row.countLimit?scope.row.countLimit:'无限制'}}
			</template>
			</el-table-column>
			<el-table-column
				prop="count"
				label="操作"
				style="width: 50%"
				align="center"
			>
			<template slot-scope="scope">
				<el-button type="primary" size="mini"  @click="goTo(scope.row.type)" >管理</el-button>
			</template>
		</el-table-column>
			</el-table>
		</div>
	</div>
	<el-dialog :visible.sync="dialogVisible" width="60%" @closed="use()">
		<div style="padding:0px 30px 30px 30px;">
			<h2 align="center" style="font-size:24px;line-height:40px">欢迎使用Locus开发者平台</h2>
			<h3  style="font-size:18px;margin-top:40px;font-weight:500">
				Locus开发者平台已为你自动开通以下服务，现在开始体验吧！
			</h3>
			<div class="d" v-for="(item,idx) in serverData" :key="idx">
				 <input type="checkbox" class="ipt" checked disabled>
				 <div class="msgDiv">
					 <span>
						 {{item.name}}
					 </span>
					 <div>
						 {{item.description}}
					 </div>
				 </div>
			</div>
			<div style="text-align:center"><el-button type="primary" @click="use()">立即使用</el-button></div>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import {mapActions,mapState,mapMutations} from 'vuex'
import { Base64 } from 'js-base64';
export default {
  name: 'mainIndex',
  data(){
	  return {
		  dialogVisible:false,
		  checkedServers: [],//选择的服务，暂时没用到
		  loginName:'',
	  }
  },
  created(){
	  this.apiCount({})
	  this.serverInit({})
	  function getCookie(name)
    {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
	}
	
	let status = getCookie('status');
		status==false?this.dialogVisible=true:this.dialogVisible=false

    function getCookie(name)
    {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    }
    let  token = getCookie('tokendev')
    if(token){
    let arr=token.split('.')
    let tokenMsg=arr[1];
    let tokens = Base64.decode(tokenMsg);
    let Obj=JSON.parse(tokens)
    this.loginName=Obj.loginName
     }
  },
  methods:{
	  ...mapActions('mainIndex',['apiCount','serverInit']),
	  goTo(des){
		  let type=parseInt(des)
		  switch (type) {
			  case 1:
				  this.$router.push({path:'/productServices/imageIdentified/imageTracking'})
				  break;
		  	  case 2:
				  this.$router.push({path:'/productServices/imageIdentified/imageLocation'})
				  break;
			  case 3:
				  this.$router.push({path:'/productServices/imageIdentified/imageRetrieval'})
				  break;
			  default:
				  break;
		  }
	  },
	  use(){
		this.$cookies.set('status', 1,null,'/')
		this.dialogVisible=false
	  }
  },
  computed:{
		...mapState('mainIndex',['apiData','serverData']),
  },
  watch:{
  }

}
</script>

<style scoped>
.userMsg{
	padding:20px 0px
}
.titleH1{
	font-size: 16px; padding-left:10px;height: 50px;line-height: 50px;display: block;font-weight:bold;
}
.showBox{
	padding-left:20px;
	padding-right:20px;
	background: #f2f2f2;
	height: 300px;
}
.server{
	width:100%;
	height:230px;
	background: #fff
}
span.user{
	color:#FF644E
}
.date{
	font-size:14px;margin-left:15px;color:#a2a2a2;
}
.showBox2{
	margin-top:15px;
}
.d{
	position: relative;margin-bottom: 20px;
}
.ipt{
	position: absolute;
}
.msgDiv{
	padding-left: 25px
}
.msgDiv span{
	font-size:18px;font-weight: 500
}
.msgDiv div{
	margin-top: 10px
}
.tools{
	float:left;
	width:42%;
	height:180px;
	margin-right: 5%;
	background-color: red;
	position: relative;
}
.interface{
	width: 100%;
	height: 106px;
	background: url('../assets/interface.png') no-repeat center;
	/*background-size: 90% 90%;*/
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translate(-50%,0px);
}
.sdkDownload{
	width: 100%;
	height: 106px;
	background: url('../assets/sdkDownload.png') no-repeat center;
	/*background-size: 80% 80%;*/
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translate(-50%,0px);
}
.buttonWord{
	width:100%;
	height:30px;
	line-height: 30px;
	border-radius: 5%;
	text-align: center;
	color: #fff;
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translate(-50%,0px);
	cursor: pointer;
}
</style>
