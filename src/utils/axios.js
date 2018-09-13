import axios from 'axios'
import { notification } from 'ant-design-vue'
import qs from 'qs'
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
  async (res) => {
    let code = res.data
    if (code.success) {
      return res
    } else {
      notification.error({
        message: '提示',
        description: code.error
      })
      return res
    }
  }
)
export default http
