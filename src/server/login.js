import request from './req'

/**
 * 
 * @param {object} data 账号 密码 
 */
export const loginApi = data => request({ url: '/login', method: 'post', data })