import http from '../http'
import {loadRequest} from '../util' //loading遮罩层
import { Message,Loading } from 'element-ui';
import VueCookies from 'vue-cookies'
var options={
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
};
const login=(msg)=>{
  return new Promise((resolve,reject)=>{
    http.post('/api/paas/access/user/login',msg).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
/*获取图形验证码*/
const getCode=()=>{
  return http.get('/api/paas/access/user/getIdentifyCode')
}
/*注册h*/
const register=(msg)=>{
  return http.post('/api/paas/access/user/register',{loginName:msg.code,email:msg.email,password:msg.pass})
}
/*w重置密码邮件h*/
const sendEmail=(msg)=>{
  return http.get(`/api/paas/access/user/sendResetPwdEmail`,{email:msg,host:window.location.hostname})
}
/*重设密码h*/
const pass=(msg)=>{
  return http.post('/api/paas/access/user/resetPassword',msg)
}
/*校验时间h*/
const checkTime=(msg)=>{
  return http.get('/api/paas/access/user/checkResetPwdLink',msg)
}
/**  首页-API用量  */
const statistic = (params) => {
  return http.get('/api/paas/service/call/statistic/all', params)
}
/**  首页-server用量  */
const homeServer = (params) => {
  return http.get('/api/paas/user/pageServiceByUserId', params)
}

/**  产品服务-图像识别-图库列表  */
const imageProduct = (params) => {
  return http.post('/api/paas/image/database/list/page', params)
}
/**  产品服务-图像识别-创建图库  */
const imageAdd = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/database/add', params, '创建图库', http, 'post').then(v => {
      resolve();
    });
  })
}
/**  产品服务-图像识别-修改图库  */
const imageEdit = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/database/update', params, '修改图库名称', http, 'post').then(v => {
      resolve();
    });
  })
}

/**  产品服务-图像识别-创建图库-判断图库名字  */
const imageCheck = (params) => {
  return http.post('/api/paas/image/database/name/check', params)
}
/**  产品服务-图像识别-列表  */
const imageIdentified = (params) => {
  return http.post('/api/paas/image/identified/list/page', params)
}
/**  产品服务-图像识别-查询图库基本信息  */
const imageInfo = (params) => {
  return http.get('/api/paas/image/database/info', params)
}
/**  产品服务-图像识别-启用图库  */
const imageEnable = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/database/enable', params, '要启用的', http, 'post').then(v => {
      resolve();
    });
  })
}

/**  产品服务-图像识别-停用图库  */
const imageUnable = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/database/unable', params, '要停用的', http, 'post').then(v => {
      resolve();
    });
  })
}

/**  产品服务-图像识别-创建图库-判断图库名字  */
const identifiedNameCheck = (params) => {
  return http.post('/api/paas/image/identified/name/check', params)
}

/**  产品服务-图像识别-新增识别图保存  */
const identifiedImgSave = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/identified/add', params, '创建识别图', http, 'post').then(v => {
      resolve();
    });
  })
}
/**  产品服务-图像识别-修改识别图保存  */
const identifiedImgUpdate = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/identified/update', params, '要修改保存的', http, 'post').then(v => {
      resolve();
    });
  })
}
/**  产品服务-图像识别-删除识别图  */
const identifiedImgDel = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/identified/delete', params, '删除识别图的', http, 'post').then(v => {
      resolve();
    });
  })
}

/**  产品服务-图像识别-查询识别图基本信息  */
const identifiedImgInfo = (params) => {
  return http.get('/api/paas/image/identified/info', params)
}


/**  产品服务-图像识别-启用识别图  */
const identifiedEnable = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/identified/enable', params, '启用', http, 'post').then(v => {
      resolve();
    });
  })
}

/**  产品服务-图像识别-停用识别图 */
const identifiedUnable = (params) => {
  return new Promise((resolve, reject) => {
    loadRequest('/api/paas/image/identified/unable', params, '停用', http, 'post').then(v => {
      resolve();
    });
  })
}
/** 产品服务-图像识别-服务开通 Author:minggui*/
export function openService(params){
  return loadRequest('/api/paas/user/addUserService',params,'开通',http,'get')
}
/** 产品服务-图像识别-服务开通情况 Author:minggui*/
export function serviceStatus(params){
  return new Promise((resolve, reject) => {
    http.get('/api/paas/service/getServiceItemByType', params).then(res=>{
      if(res.code){
        Message.error(res.msg);
      }else{
        resolve(res);
      }
    })
  })
}
/** 产品服务-下载sdk页面 Author:minggui*/
export function sdkList(params){
  return new Promise((resolve,reject)=>{
    http.get('/api/paas/sdk/download/page',params).then(res=>{
      if(res.code){
        Message.error(res.msg);
      }else{
        resolve(res);
      }
    }).catch(err=>{
      reject(err);
    })
  })
}
/** 产品服务-sdk下载 Author:minggui*/
export function downloadSdk(params){
  var a = document.createElement('a');
  a.href = `/api/file/download?uuid=${params.uuid}`;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

}
/** 产品服务-接口文档的目录树 Author:minggui*/
export function interfaceTree(){
  return new Promise((resolve,reject)=>{
    http.get('/api/paas/document/catalog/tree').then(res=>{
      if(res.code){
        Message.error(res.msg);
      }else{
        resolve(res);
      }
    }).catch(err=>{
      reject(err)
    })
  })
}
/** 产品服务-获取对应接口文章 Author:minggui*/
export function getInterfaceDoc(params){
  return new Promise((resolve,reject)=>{
    http.get('/api/paas/document/info',params).then(res=>{
      if(res.code){
        Message.error(res.msg);
      }else{
        resolve(res);
      }
    }).catch(err=>{
      reject(err);
    })
  })
}
/*获取当前用户信息h*/
const getSelf=()=>{
  return http.get('/api/paas/user/getCurrentUserInfo')
}
/*获取当前邮箱验证码h*/
const reviseEmail=(msg)=>{
  return http.get('/api/paas/user/sendChangeEmailCode',{email:msg})
}
/*校验邮箱h*/
const checkFirstEmail=(msg)=>{
  return http.post('/api/paas/user/checkEmailCode',msg)
}
/*更换邮箱h*/
const switchEmail=(msg)=>{
  return http.post('/api/paas/user/changeEmail',msg)
}
/*旧密码换新密码h*/
const newPassApi=(msg)=>{
  return http.post('/api/paas/user/changePassword',msg)
}
/*获取accesskeyh*/
const getAccess=(msg)=>{
  let page=msg.page?msg.page:1;
  let limit=msg.limit?msg.limit:20;
  return http.get(`/api/paas/user/listUserAccessKey?page=${page}&limit=${limit}`)
}
/*创建accesskeyh*/
const creatAccess=()=> {
   return new Promise(resolve => {
     loadRequest('/api/paas/user/addAccessKey',{},'创建AccessKey',http,'get').then(v=>{
       resolve(v)
     })
   })
}
/*删除accessKeyh*/
const deleteAccess=(id)=>{
   return loadRequest('/api/paas/user/deleteAccessKey',{id:id},'删除AccessKey',http,'get')
}
/*启用禁用accesskeyh*/
const setStatus=(msg)=>{
  return loadRequest(`/api/paas/user/setAccessKeyStatus`,msg,msg.status==1?'启用':'禁用',http,'get')
}
/*获取开通服务*/
const  getService=()=>{
  return http.get('/api/paas/service/getServiceItemByType')
}
/*开通服务*/
const  openServiceH=(type)=>{
  return loadRequest(`/api/paas/user/addUserService?`,{type:type},'开通',http,'get')
}
/*上传*/
const upVideo=(msg)=>{
  return http.post(`/uo/upload/chunkUpload/upload_do`,msg)
}
/*上传检查*/
const checkFile=(type,fileName,fileMd5,fileSize)=>{
  return http.post(`/uo/upload/chunkUpload/checkFile`,{'type':type,'fileName':fileName,'fileMd5':fileMd5,'fileSize':fileSize})
}
export {
  login,
  getCode,
  register,
  sendEmail,
  pass,
  checkTime,
  statistic,
  homeServer,
  imageProduct,
  imageAdd,
  imageCheck,
  imageIdentified,
  imageInfo,
  imageEdit,
  imageEnable,
  imageUnable,
  identifiedNameCheck,
  identifiedImgSave,
  identifiedImgDel,
  identifiedImgInfo,
  identifiedEnable,
  identifiedUnable,
  identifiedImgUpdate,
  getSelf,
  reviseEmail,
  checkFirstEmail,
  switchEmail,
  newPassApi,
  getAccess,
  creatAccess,
  deleteAccess,
  setStatus,
  getService,
  openServiceH,
  upVideo,
  checkFile
}
