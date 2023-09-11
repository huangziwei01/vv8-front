import { defineStore } from 'pinia'
import { ref } from 'vue'

import { loginUser } from '@/api/sys'
import md5 from 'md5'

import { useRouter } from 'vue-router'
const router = useRouter()

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  function setToken(token) {
    token.value = token
  }

  const login = async (payload) => {
    try {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      router.push('/')
    } catch (error) {}
  }

  return {
    token,
    setToken,
    login
  }
})
