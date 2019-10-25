import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login'
import pagination from './modules/pagination'
import userList from './modules/userList'
import navMenu from './modules/navMenu'
import timeSwitch from './modules/timeSwitch'
import mainIndex from './modules/mainIndex'
import imageProduct from './modules/imageProduct'
import register from  './modules/register'
import forgotPassword from './modules/forgotPassword'
import createImage from './modules/createImage'
import manageImage from './modules/manageImage'
import uploadMap from './modules/uploadMap'
Vue.use(Vuex);
const store=new Vuex.Store({
  modules:{
    login,
    pagination,
    userList,
    navMenu,
    timeSwitch,
    mainIndex,
    imageProduct,
    register,
    forgotPassword,
    createImage,
    manageImage,
    uploadMap
  }
})
export default store;
