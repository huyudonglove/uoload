import http from '../../http'
const state={
  value:[]
};
const mutations={
    setValue(state,val){
        state.value=val;
    }
};
const actions={

};
export default {
  namespaced:true,
  state,
  actions,
  mutations
}
