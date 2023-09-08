import request from '@/service'

/**
 * 获取分类列表
 */
export const requestCategoryData = () => {
  return request({
    url: '/category'
  })
}
