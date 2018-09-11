import axios from 'axios'
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
export default http
