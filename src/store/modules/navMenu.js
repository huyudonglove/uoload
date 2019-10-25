import http from  '../../http'
import router from '../../router'
import {Message} from 'element-ui'
const state={
  menus:[]
};
const mutations={
	init(state, payload) {
		state.menus = payload.menus
		//console.log(state.menus)
	}
};
const actions={
	menuInit({commit}){

    http.get('/api/paas/menu/tree?'+ Math.random()).then(res => {
   
      if(res.code){
        Message.error(res.msg)
      }else{
        commit("init", { menus: res.data })
      }
		}).catch(err=>{
    
    })

   }

};
export default {
  namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  actions,
  mutations
}
