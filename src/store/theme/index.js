import { defineStore } from 'pinia'
import { ref } from 'vue'

// import { THEME_LIGHT, THEME_DARK } from '@/constants'

export const useThemeStore = defineStore('theme', () => {
  const themeType = ref('theme-light')

  function changeTheme(type) {
    themeType.value = type
  }

  return {
    themeType,
    changeTheme
  }
})
