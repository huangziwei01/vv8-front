import request from '@/service'

/**
 * 获取图片数据列表
 */
export const requestPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}

/**
 * 获取搜索提示
 */
export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}
