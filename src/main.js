import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import 'virtual:svg-icons-register'

import router from './router'
import { useREM } from './utils/flexible'
import mLibs from './libs'

useREM()

const app = createApp(App)
app.use(router)
app.use(mLibs)

app.mount('#app')
