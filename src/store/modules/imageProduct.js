import { imageProduct, statistic} from '../../http/request'
import { Message } from 'element-ui';
const state = {
	tableData:[],
	serverCounts:0,
	total:0,
	title:''
};
const mutations = {
	syncInit(state, payload){
		state.tableData = payload.items
		state.total = payload.total
	},
	syncStatistic(state, payload){
		state.serverCounts = payload.data.length !=0?payload.data[0].count:0;
		state.title = payload.data.length != 0 ?payload.data[0].serviceName:''
	}

};
const actions = {
	init({commit},params){
		let pageNum = params.page ? params.page : 1;
		let pageSize = params.limit ? params.limit : 20;
		let serviceType = params.serviceType ? params.serviceType : '';
		return new Promise((resovle, reject) => {
			imageProduct({ pageNum, pageSize, serviceType}).then(res=>{
				if (res.code) {
					Message.error(res.msg);
				}else{
					resovle(res)
					commit('syncInit',res.data)
				}
			})
		}).catch(err => {	
			})
	},
	serverCountImg({commit},params){
		statistic(params).then(res => {
			if (res.code) {
				Message.error(res.msg);
			} else {
				commit('syncStatistic', res)
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
