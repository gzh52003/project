import Vue from 'vue'

import Router from 'vue-router'

// import Login from '../pages/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => {
        require(['../pages/Login.vue'], resolve)
        },
      meta: {
        title: 'Login',
        requireAuth: true
      }
    },
  ]
})


export default router

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    console.log('需要登录');
    if (localStorage.getItem("token")) {  // 判断当前的token是否存在 ； 登录存入的token
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: 'home'}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});