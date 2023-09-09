import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import 'virtual:svg-icons-register'

import router from './router'
import store from './store'

const app = createApp(App)

// 全局制定rem
import { useREM } from './utils/flexible'
useREM()

// 自动注册libs文件夹中的通用组件
import mLibs from './libs'

// 自动注册自定义指令
import mDirectives from './directives'

app.use(router)
app.use(store)
app.use(mLibs)
app.use(mDirectives)

import useTheme from './utils/theme'
// 初始化主题
useTheme()
app.mount('#app')
