import { watch } from 'vue'
import { THEME_LIGHT, THEME_DARK } from '@/constants'
import { useThemeStore } from '@/store/theme'
/**
 * 初始化主题
 */
export default () => {
  watch(
    () => useThemeStore().themeType,
    (val) => {
      // html 的 class
      let themeClassName = ''
      switch (val) {
        case THEME_LIGHT:
          themeClassName = 'light'
          break
        case THEME_DARK:
          themeClassName = 'dark'
          break
      }
      // 修改 html 的 class
      document.querySelector('html').className = themeClassName
    },
    {
      // 初始执行一次
      immediate: true
    }
  )
}
