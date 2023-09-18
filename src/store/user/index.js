import { defineStore } from 'pinia'
import { ref } from 'vue'

import { loginUser, getProfile } from '@/api/sys'
import md5 from 'md5'

export const useUserStore = defineStore('user', () => {
  const localUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {}
  const userToken = ref(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )
  const userInfo = ref(localUserInfo)

  const profile = async () => {
    const res = await getProfile()
    console.log(res)
    userInfo.value = res
    localStorage.setItem('userInfo', JSON.stringify(res))
  }

  const login = async (payload) => {
    try {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      if (data.code === 204) {
        return data.code
      }
      const { token } = data
      userToken.value = token
      localStorage.setItem('token', token)
      profile()
      // const router = useRouter()
    } catch (error) {}
  }

  const logout = () => {
    userToken.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    userInfo.value = {}
    location.reload()
  }

  // const register = async (payload) => {
  //   const { password } = payload
  // }

  return {
    userToken,
    userInfo,
    login,
    logout,
    profile
  }
})
