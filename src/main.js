import Vue from 'vue'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import App from './App.vue'
import router from './router'
import request from './utils/request';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VCharts);


// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request

new Vue({
  // 把router注入Vue实例
  router,
  render: h => h(App),
}).$mount('#app')
