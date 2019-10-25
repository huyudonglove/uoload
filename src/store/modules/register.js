import http from '../../http'
import router from '../../router'
import { Message } from 'element-ui'
import Vue from 'vue'
const state = {
    msg: {
        appName: '用户注册',
        emailInput: '请填写常用邮箱',
        codeInput: '输入用户名',
        password: '字母+数字等于8位',
        rePassword: '字母+数字等于8位',
        confirm: '确认',
        cancel: '取消',
        codeBtn: '验证码',
        disabled: false,
    },
    input: {
        email: '',
        pass: '',
        checkPass: '',
        code: ''
    }
};
const mutations = {
    syncMsg(state, payload) {
        state.input = payload;

        console.log(111, state.input)
    }
};
const actions = {
    init({ commit}, payload) {
        http.post('/api/xr/saas/user/register', payload).then(res => {
            commit('syncMsg', payload)
            res.code ? Message.error(res.msg) : Message({
                message: res.msg || '成功',
                type: 'success'
            })
            if (!res.code){
                setTimeout(() => {
                    router.push({
                        path: '/login'
                    })
                }, 100);
            }
        }).then(res => {
        })

    },
    code({ commit, state }, { email, loginName, httpVue }) {

        http.get('/api/xr/saas/user/mail/identify/code', { loginName: email, email: email, type: "R" }).then(res => {

            if(res.msg=='用户已注册'){
                Message({
                    message:'用户已注册',
                    type: 'warning'
                })
                return ;
            }else{
                // 30秒倒计时
                state.msg.disabled = true
                let time = 30
                let timer = setInterval(() => {
                    // console.log(state.msg.disabled)
                    if (time <= 0) {
                        state.msg.disabled = false
                        state.msg.codeBtn = '验证码'
                        clearInterval(timer)
                    } else {
                        // console.log(httpVue)
                        // if (httpVue){
                        // httpVue.$refs.code.style.background = '#DFDCDC'
                        // }
                        state.msg.codeBtn = time + 's'
                        time--
                    }
                }, 1000)
                res.code ? Message.error(res.msg) : Message({
                    message: `验证码已发送到 ${email} 邮箱。如果没有收到电子邮件，请查看垃圾邮件文件夹或重试。`,
                    type: 'success'
                })
            }
        })
    }

};
export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    actions,
    mutations
}
