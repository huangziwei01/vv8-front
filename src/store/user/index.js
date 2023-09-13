import { defineStore } from 'pinia'
import { ref } from 'vue'

import { loginUser, getProfile } from '@/api/sys'
import md5 from 'md5'

export const useUserStore = defineStore('user', () => {
  const userToken = ref('')
  const userInfo = ref({})

  const profile = async () => {
    const res = await getProfile()
    userInfo.value = res
  }

  const login = async (payload) => {
    try {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      const { token } = data
      userToken.value = token
      console.log(userToken.value)
      localStorage.setItem('token', token)
      profile()
      // const router = useRouter()
    } catch (error) {}
  }

  const logout = () => {
    userToken.value = ''
    localStorage.removeItem('token')
    userInfo.value = {}
    location.reload()
  }

  const register = async (password) => {}

  return {
    userToken,
    userInfo,
    login,
    logout
  }
})
