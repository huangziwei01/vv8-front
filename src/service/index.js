import axios from 'axios'

import { useUserStore } from '@/store/user'
import { message } from '@/libs'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = 'helloqianduanxunlianying'
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config // 必须返回配置
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // TODO：业务错误
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      message('登录已过期请重新登录')
      // TODO: token超时
      const userStore = useUserStore()
      userStore.logout()
    }
    // TODO: 提示错误消息
    return Promise.reject(error)
  }
)

export default service
