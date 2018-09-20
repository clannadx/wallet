import axios from 'axios'
// import { notification } from 'ant-design-vue'
import qs from 'qs'
import middleWare from './middleWare'
const http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})

// request 拦截器
http.interceptors.request.use(config => {
  if (config.method === 'POST') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// response 拦截器
http.interceptors.response.use(
  middleWare.list.bind(middleWare)
  // async (res) => {
  //   console.log(res, '22222222666666622222')
  //   // if(res.)
  //   let code = res.data
  //   if (code.success) {
  //     console.log(code.success)
  //     return res
  //   } else {
  //     console.log(code.success)
  //     notification.error({
  //       message: '提示',
  //       description: code.error
  //     })
  //     return res
  //   }
  // }
)
export default http
