import Vue from 'vue';

// 1. 引入Vue-Router
import VueRouter from 'vue-router'


import Home from '../pages/Home.vue'

import User from '../pages/user/Default.vue'
import UserList from '../pages/user/List.vue'
import UserAdd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'
import Goods from '../pages/goods/Default.vue'
import GoodAdd from '../pages/goods/Add.vue'
import GoodEdit from '../pages/goods/Edit.vue'
import GoodList from '../pages/goods/List.vue'
import Order from '../pages/order/Default.vue'
import OrderAdd from '../pages/order/Add.vue'
import OrderEdit from '../pages/order/Edit.vue'
import OrderList from '../pages/order/List.vue'


import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'

import request from './../utils/request';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

// 2. 使用VueRouter
Vue.use(VueRouter)

// 3. 实例化并配置参数
const router = new VueRouter({
    // mode:'history', // 一般上线后改为history路由(需要额外配置服务器)
    routes: [
        {
            path: '/', // /->/home
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta: {
                title: '首页'
            }
        },
        {
            path: '/user',
            component: User,
            meta: {
                title: '用户管理',
            },
            children: [
                // 进入用户管理页面直接跳到用户列表
                {
                    path: '',
                    redirect: 'userlist'
                }, {
                    path: 'useradd',
                    component: UserAdd,
                    meta: {
                        title: '添加用户'
                    }
                }, {
                    path: 'userlist',
                    component: UserList,
                    meta: {
                        title: '用户列表',
                    }
                }, {
                    name: 'userEdit',
                    path: 'edit/:id',
                    component: UserEdit,
                    meta: {
                        title: '编辑用户',
                    }
                }]
        },
        {
            path: '/order',
            component: Order,
            meta: {
                title: '订单管理',
            },
            children: [
                // 进入用户管理页面直接跳到用户列表
                {
                    path: '',
                    redirect: 'orderadd'
                }, {
                    path: 'orderadd',
                    component: OrderAdd,
                    meta: {
                        title: '添加订单'
                    }
                }, {
                    path: 'orderlist',
                    component: OrderList,
                    meta: {
                        title: '订单列表',
                    }
                }, {
                    name: 'orderEdit',
                    path: 'edit/:id',
                    component: OrderEdit,
                    meta: {
                        title: '编辑订单',
                    }
                }]
        },
        {
            path: '/goods',
            component: Goods,
            meta: {
                title: '商品管理',
            },
            children: [
                {
                    path: '',
                    redirect: 'goodlist'
                }, {
                    path: 'goodadd',
                    component: GoodAdd,
                    meta: {
                        title: '添加商品',
                    }
                }, {
                    path: 'goodlist',
                    component: GoodList,
                    meta: {
                        title: '商品列表',
                    }
                }, {
                    name: 'goodEdit',
                    path: 'edit/:id',
                    component: GoodEdit,
                    meta: {
                        title: '编辑商品',
                    }
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/Register',
            component: Register
        },
        {
            path: '/404',
            component: NotFound
        },

        // 404页面效果
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

router.beforeEach(async function (to, from, next) {
    let currentUser = localStorage.getItem("currentUser"); //{username,age,gender,authorization}
    currentUser = JSON.parse(currentUser);
    console.log(currentUser);
    console.log(request)

    if (!currentUser) {
        if (to.path !== '/login') {
            return next('/login')
        }
        next();//如果当前下一步就是去login就执行

    } else {
        // 校验token的有效性
        const { data } = await request.get(`/jwtverify/?authorization=${currentUser.authorization}`);

        if (data.code === 0) {
            localStorage.removeItem("currentUser");
            return next('/login')
        } else {
            next()
        }
    }
})

export default router;

console.log('router=', router);