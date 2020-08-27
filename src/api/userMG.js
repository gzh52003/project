import axios from 'axios';
import request  from './axiosFun';

// 登录接口 
export const login = data => request({ url: '/login', method: 'post', data })

/**
 * 用户管理 
 **/
// 用户管理-获取用户列表
export const getUser = params => request({url:'/users',method:'get',params})

// // 用户管理-保存（编辑）
export const editUser = (id,params) => request({url:`users/${id}`,method:'put',data:params})

// 用户管理-添加
export const addUser = data => request({url:'/users',method:'post',data})
// 用户管理-删除
export const deleteUsers = id => request({url:`users/${id}`,method:'delete'})
// 用户管理-搜索
export const searchUsers = id => request({url:`users/${id}`,method:'get'})


// 订单管理-订单列表
export const getOrderList = params => request({url:'/orders',method:'get',params})
// 订单管理-根据订单ID搜索订单
export const searchOrder = id => request({url:`orders/${id}`,method:'get'})


// 商品管理-获取商品列表
export const getGoods = params => request({url:'/goods',method:'get',params})

// 商品管理-编辑商品
export const editGoods = (id,params) => request({url:`goods/${id}`,method:'put',data:params})
// 商品管理-删除商品
export const deleteGoods = id =>request({url:`goods/${id}`,method:'delete'})
// 商品管理-添加商品
export const addGoods = data => request({url:'/goods',method:'post',data})
// 商品管理-根据id搜索商品
export const searchGoods = id => request({url:`goods/${id}`,method:'get'})
// 获取商品分类列表
export const getProductType = params =>request({url:'/categories',method:'get',params})


/* 
    角色管理
*/

// 角色管理-角色列表
export const getRoles = params => request({url:'/roles',method:'get',params})
// 角色管理-角色删除
export const deleteRoles = id => request({url:`roles/${id}`,method:'delete'})
// 角色管理-角色添加
export const addRoles = data => request({url:'/roles',method:'post',data})
// 角色管理-搜索角色通过id
export const searchRoles = id => request({url:`roles/${id}`,method:'get'})
// 角色管理-编辑修改
export const editRoles = (id,params) => request({url:`roles/${id}`,method:'put',data:params})