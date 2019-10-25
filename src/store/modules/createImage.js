import { imageAdd, imageCheck} from '../../http/request'
import { Message } from 'element-ui';
const state = {	
};
const mutations = {
};
const actions = {

	//检查创建图库名字的唯一性
	check({commit},params){
		return new Promise((resolve,reject) => {
			imageCheck(params).then(res => {
				if(res.code&&res.msg!='图库名称重复'){
					Message.err(res.msg)
				}else{
					resolve(res)
				}
			}).catch(err=>{
				reject(err)
			})
		})
	},

	//新增保存
	add({ commit }, params) {
		return new Promise((resolve,reject) => {
			imageAdd(params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
};
export default {
	namespaced: true,
	state,
	actions,
	mutations
}
