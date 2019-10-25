import http from  '../../http'
import router from '../../router'
import { Message } from 'element-ui'

const state={
  msg:{
      appName:'忘记密码',
      emailInput:'请输入账号',
      codeInput:'输入验证码',
      password:'字母+数字不小于8位',
      rePassword:'字母+数字不小于8位',
      confirm:'确认',
      cancel:'取消',
      codeBtn:'验证码',
      disabled:false
  },
  // input:{
  //   email:'',
  //   pass:'',
  // 	checkPass: '',
	// code:''
  // }
};
const mutations={
  // syncMsg(state,payload){
  //   state.input=payload;
  //   console.log(111,state.input)
  // }
};
const actions={
  forgot({commit},payload){ 
    http.post('/api/xr/saas/user/forget/pwd', payload).then(res => {
      commit('syncMsg', payload)
      res.code ? Message.error(res.msg) : Message({
        message: res.msg || '成功',
        type: 'success'
      })
      if (!res.code) {
        setTimeout(() => {
          router.push({
            path: '/login'
          })
        }, 100);
      }
    }).then(res => {
      
    })
  },
  code({commit},{email}){
    
    http.get('/api/xr/saas/user/mail/identify/code', { loginName: email, email: email,type:"F"}).then(res=>{
      res.code ? Message.error(res.msg) : Message({
        message: `验证码已发送到 ${email} 邮箱。如果没有收到电子邮件，请查看垃圾邮件文件夹或重试。`,
        type: 'success'
      })
    })
  }

};
export default {
  namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  actions,
  mutations
}
