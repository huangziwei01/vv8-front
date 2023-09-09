import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ALL_CATEGORY_ITEM } from '@/constants'

export const useAppStore = defineStore('app', () => {
  const currentCategory = ref(ALL_CATEGORY_ITEM)

  function changeCurrentCategory(current) {
    currentCategory.value = current
  }

  return {
    currentCategory,
    changeCurrentCategory
  }
})
