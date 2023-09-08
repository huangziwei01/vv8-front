import request from '@/utils/request'

/**
 * 获取图片数据列表
 */
export const requestPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
