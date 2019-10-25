import { imageInfo, imageIdentified, imageEdit, imageEnable, imageUnable, identifiedNameCheck, identifiedImgSave, identifiedImgDel, identifiedImgInfo, identifiedUnable, identifiedEnable, identifiedImgUpdate} from '../../http/request'
import { Message } from 'element-ui';
const state = {
	tableData: [],
	total: 0,
	currentRow:{
	},
	currentInfo:{

	}
};
const mutations = {
	syncInit(state, payload) {
		state.tableData = payload.items
		state.total = payload.total
	},
	syncInfo(state, payload) {
		state.currentRow = payload
	},
	syncIdentifiedInfo(state, payload){
		state.currentInfo = payload
	},

};
const actions = {
	init({ commit }, params) {
		let pageNum = params.pages ? params.pages : 1;
		let pageSize = params.limits ? params.limits : 20;
		let imageDatabaseId = params.imageDatabaseId ? params.imageDatabaseId : '';
		let name = params.wd? params.wd : '';
		let status = params.status ? params.status : '';
		return new Promise((resovle, reject) => {
			imageIdentified({ pageNum, pageSize, imageDatabaseId, name, status}).then(res => {
				if (res.code) {
					Message.error(res.msg);
				} else {
					resovle(res)
					commit('syncInit', res.data)
				}
			})
		}).catch(err => {
		})
	},

	//查询图库基本信息
	info({ commit }, params) {
		imageInfo(params).then(res => {
				if (res.code) {
					Message.error(res.msg);
				} else {
					commit('syncInfo', res.data)
				}
		}).catch(err => {
		})
	},
	//修改图库名称
	imgUpdate({commit},params){
		return new Promise(resolve => {
			imageEdit(params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	//启用图库
	upper({ dispatch }, params) {
		return new Promise((resolve, reject) => {
			imageEnable({ ids: params }).then(res => {
				resolve();
			}).catch(err => {
				reject(err)
			})
		})
	},
	//启用图库
	lower({ dispatch }, params) {
		return new Promise((resolve, reject) => {
			imageUnable({ ids: params }).then(res => {
				resolve();
			}).catch(err => {
				reject(err)
			})
		})
},
	//检查识别图名字的唯一性
	checkImgName({ commit }, params) {
		return new Promise(resolve => {
			identifiedNameCheck(params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	//识别图新增保存
	imgIdentified({ commit }, params) {
		return new Promise(resolve => {
			identifiedImgSave(params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	//修改识别图保存
	imgIdentifiedUpdate({ commit }, params) {
		return new Promise(resolve => {
			identifiedImgUpdate(params).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	//删除识别图
	del({ commit }, params) {
		return new Promise(resolve => {
			identifiedImgDel({ids:[params]}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 查询识别图基本信息
	identifiedInfo({ commit }, params){
		identifiedImgInfo(params).then(res => {
			if (res.code) {
				Message.error(res.msg);
			} else {
				commit('syncIdentifiedInfo', res.data)
			}
		}).catch(err => {
		})
	},
	//启用识别图库
	upperIdentified({ dispatch }, params) {
		return new Promise((resolve, reject) => {
			identifiedEnable({ ids: params }).then(res => {
				resolve();
			}).catch(err => {
				reject(err)
			})
		})
	},
	//停用识别图库
	lowerIdentified({ dispatch }, params) {
		return new Promise((resolve, reject) => {
			identifiedUnable({ ids: params }).then(res => {
				resolve();
			}).catch(err => {
				reject(err)
			})
		})
	},
};
export default {
	namespaced: true,
	state,
	actions,
	mutations
}
