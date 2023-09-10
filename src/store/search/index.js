import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const historys = ref([])

  const addHistory = (newHistory) => {
    const isFindIndex = historys.value.findIndex((item) => item === newHistory)
    // 剔除旧数据
    if (isFindIndex !== -1) {
      historys.value.splice(isFindIndex, 1)
    }
    // 新增记录
    historys.value.unshift(newHistory)
  }

  const deleteHistory = (index) => {
    historys.value.splice(index, 1)
  }

  const deleteAllHistory = () => {
    historys.value = []
  }

  return {
    historys,
    addHistory,
    deleteHistory,
    deleteAllHistory
  }
})
