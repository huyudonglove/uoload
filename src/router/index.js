import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import userManager from '../components/userManager/userManager'
import userList from '../components/userManager/userList'
import home from '../components/home'
import mainIndex from '../components/mainIndex'
import logout from '../components/logout'
import productServices from '../components/productServices/productServicesList'
import imageIdentified from '../components/productServices/imageIdentified'
import imageProduct from '../components/productServices/imageProduct'
import createImage from '../components/productServices/createImage'
import register from  '../components/register'
import forgotPassword  from '../components/forgotPassword'
import revisePassword from '../components/revisePassword'
import notFind from  '../components/notFind'
import manageImage from '../components/productServices/manageImage'
import identifiedInfo from '../components/productServices/identifiedInfo'
import sdkDownload from '../components/productServices/sdkDownload'
import interfaceDoc from '../components/productServices/interfaceDoc'
import safe from '../components/safe/safe'
import account from '../components/safe/account'
import identify from '../components/safe/identify'
import version from  '../components/version'
import myVideo from '../components/video/myVideo'
import videoList from '../components/video/videoList'
import broadcast from '../components/video/broadcast'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/home',
          name: 'mainIndex',
          component: mainIndex,
        },
        {
          path: '/userManager',
          name: 'userManager',
          component: userManager,
          children:[
            {
              path:'/userManager/userList',
              name:'userList',
              component:userList
            }
          ]
        },
        {
          path: '/productServices',//产品与服务
          name: 'productServices',
          component: productServices,
          children: [
            {
              path: '/productServices/imageIdentified',//图像识别
              name: 'imageIdentified',
              component: imageIdentified,
              children: [
                {
                  path: '/productServices/imageIdentified/imageLocation',//图像定位
                  name: 'imageLocation',
                  component: imageProduct,
                  children:[
                    {
                      path: '/productServices/imageIdentified/imageLocation/createImage',//创建图库-定位
                      name: 'createImageL',
                      component: createImage,
                    },
                    {
                      path: '/productServices/imageIdentified/imageLocation/manageImage',//图像定位-管理
                      name: 'manageImageL',
                      component: manageImage,
                      children: [
                        {
                          path: '/productServices/imageIdentified/imageLocation/manageImage/identifiedInfo',//图像定位-管理-识别图详情
                          name: 'identifiedInfoL',
                          component: identifiedInfo,
                        }
                      ]
                    }
                  ]
                },
                {
                  path: '/productServices/imageIdentified/imageTracking',//图像追踪
                  name: 'imageTracking',
                  component: imageProduct,
                  children: [
                    {
                      path: '/productServices/imageIdentified/imageTracking/createImage',//创建图库-追踪
                      name: 'createImageT',
                      component: createImage,
                    },
                    {
                      path: '/productServices/imageIdentified/imageTracking/manageImage',//图像追踪-管理
                      name: 'manageImageT',
                      component: manageImage,
                      children: [
                        {
                          path: '/productServices/imageIdentified/imageTracking/manageImage/identifiedInfo',//图像追踪-管理-识别图详情
                          name: 'identifiedInfoT',
                          component: identifiedInfo,
                        }
                      ]
                    }
                  ]
                },
                {
                  path: '/productServices/imageIdentified/imageRetrieval',//图像检索
                  name: 'imageRetrieval',
                  component: imageProduct,
                  children: [
                    {
                      path: '/productServices/imageIdentified/imageRetrieval/createImage',//创建图库-检索
                      name: 'createImageR',
                      component: createImage,
                    },
                    {
                      path: '/productServices/imageIdentified/imageRetrieval/manageImage',//图像检索-管理
                      name: 'manageImageR',
                      component: manageImage,
                      children: [
                        {
                          path: '/productServices/imageIdentified/imageRetrieval/manageImage/identifiedInfo',//图像检索-管理-识别图详情
                          name: 'identifiedInfoR',
                          component: identifiedInfo,
                        }
                      ]
                    },

                  ]
                }
              ]
            },
            {
              path:'/productServices/sdkDownload',
              name:'sdkDownload',
              component:sdkDownload
            },
            {
              path:'/productServices/interfaceDoc',
              name:'interfaceDoc',
              component:interfaceDoc
            }
          ]
        },
        {
          path:'/safe',
          name:'safe',
          component:safe,
          children:[
            {
              path:'/safe/account',
              name:'account',
              component:account
            },
            {
              path:'/safe/identify',
              name:'identify',
              component:identify
            }
          ]
        }

      ],
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path:'/logout',
      name:'logout',
      component:logout
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/forgotPassword',
      name:'forgotPassword',
      component:forgotPassword
    },
    {
      path:'/revisePassword',
      name:'revisePasswoed',
      component:revisePassword
    },
    {
      path:'/version',
      name:'version',
      component:version
    },

    {
      path:'/video',//录播视频
      name:'myVideo',
      component:myVideo,
      children:[
        {
          path:'/video/videoList',//上传
          name:'videoList',
          component:videoList
        },
        {
          path:'/video/broadcast',//播放页面
          name:'broadcast',
          component:broadcast
        }
      ]
    } ,
    {
      path:'*',
      name:'notFind',
      component:notFind
    }
  ]
})
