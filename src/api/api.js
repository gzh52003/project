import request from '../utils/req'


export const getOrderList = params => request({url:'/orders',method:'get',params})