import request from '@/service'

/**
 * 登录
 */
export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}
