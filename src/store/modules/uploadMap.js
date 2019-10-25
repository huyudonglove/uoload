import http from '../../http'
import { Message } from 'element-ui'
const state = {
  fileId: '',//识别图在FastDFS上的id
  rating: '',//识别等级 0-5
  grayImageFileId: '',//灰度识别图在FastDFS上的id
  similarImages: []//识别率
};
const mutations = {
  setParams(state,value){
    state.fileId = value.data.fileId
    state.rating = parseInt(value.data.identifyRating)
    state.similarImages = value.data.similarImages ? value.data.similarImages:[],
    state.grayImageFileId = value.data.grayImageFileId
  },
  clearSimilarImages(state, value){
    state.similarImages = []
  },
  clearGrayImageFileId(){
    state.grayImageFileId = ''
  },
  clearRating() {
    
    state.rating = 0
  }
};
const actions = {
 uploadMap({ commit }, msg) {
    return new Promise((resovle, reject) => {
      http.post('/api/paas/image/identified/upload/image', msg).then(res => {
        resovle(res.code)
        if (res.data && !res.code) {
          commit('setParams',res)
          Message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          let msgLog = res.msg
          Message({
            message: `${msgLog}`,
            type: 'warning'
          })
        }
      }).catch(error => {
        reject(error)
      })
  })
}
};

export default {
  namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  mutations,
  actions
}
