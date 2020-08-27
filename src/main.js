// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store';
// 引入icon
import './assets/icon/iconfont.css'
// 
import AppMain from './AppMain.vue'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 使用element UI
Vue.use(ElementUI);
// 过滤器
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

// 路由拦截器
router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) { 
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: '/charts/statistics' } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {

    if (to.path === '/login') {
      if (localStorage.getItem('token')) {

        next('/')
      } else {
        alert("已退出，请登录")
        // this.$message({
        //   type:'error',
        //   message:'已退出，请重新登录'
        // })
        next();
      }
    } else {
      next()
    }
  }


})

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     store, //使用store vuex状态管理

//     template: '<App/>',
//     render: h => h(AppMain),
//     data: {
//         // 空的实例放到根组件下，所有的子组件都能调用
//         Bus: new Vue()
//     }

// })

new Vue({
  router,
  store,
  render: h => h(AppMain),
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  }
}).$mount('#app')