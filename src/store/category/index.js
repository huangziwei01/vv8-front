import { defineStore } from 'pinia'
import { ref } from 'vue'

import { requestCategoryData } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'

export const useCategoryStore = defineStore('category', () => {
  const categoryData = ref(CATEGORY_NOMAR_DATA)

  async function getCategoryData() {
    const res = await requestCategoryData()
    categoryData.value = res.categorys
    categoryData.value.unshift(ALL_CATEGORY_ITEM)
  }

  return {
    categoryData,
    getCategoryData
  }
})
