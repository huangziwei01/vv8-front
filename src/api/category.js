import request from '@/service'

/**
 * 获取分类列表
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}