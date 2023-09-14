import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ALL_CATEGORY_ITEM } from '@/constants'

export const useAppStore = defineStore('app', () => {
  const currentCategory = ref(ALL_CATEGORY_ITEM)
  const searchText = ref('')
  const routerTyper1 = ref('')

  const routerType = () => {}

  function changeCurrentCategory(current) {
    currentCategory.value = current
  }

  function changeSearchText(newSearchText) {
    searchText.value = newSearchText
  }

  return {
    currentCategory,
    searchText,
    changeCurrentCategory,
    changeSearchText
  }
})
