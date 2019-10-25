import { statistic,homeServer } from '../../http/request'
import { Message } from 'element-ui';
const state = {
	apiData:[],
	serverData:[]
};
const mutations = {
	syncApi(state, { params, res}){
		state.apiData = res.data
	},
	syncServer(state, { params, res}){
		state.serverData = res.data.items
	}
};
const actions = {
	apiCount({commit},params){
		statistic(params).then(res=>{
			if (res.code) {
				Message.error(res.msg);
			} else {
			commit('syncApi', { params,res})
			}
		}).catch(err => {
			
		})
	},
	serverInit({commit},params){
		homeServer(params).then(res=>{
			if (res.code) {
				Message.error(res.msg);
			}else{
				commit('syncServer', { params, res})
			}
		}).catch(err => {
			
		})
	}
};
export default {
	namespaced: true,
	state,
	actions,
	mutations
}
