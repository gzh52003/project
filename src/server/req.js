
import axios from 'axios'
// import { getToken } from '../utils/store/savelogin'
// import { message } from 'antd';

export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://liufengmao.cn:8000/api/private/v1/',
    timeout: 5000
  })

  instance.interceptors.response.use(res => {
    let status = res.data.meta.status
    let status2 = res.data.meta.msg;
    if (status !== 200 && status !== 201 && status2 !== 200) {
      // message.error('出错了，' + res.data.meta.msg)
      console.log(res);

    }
    return res.data
  })

  //!拦截请求
  instance.interceptors.request.use(function (res) {
    // let token = getToken();
    // res.headers['Authorization'] = token
    return res
  }, function (error) {
    return Promise.reject(error)
  })


  return instance(config);
}
