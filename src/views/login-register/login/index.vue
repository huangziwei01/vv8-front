<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- <header-vue></header-vue> -->
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          :rules="validateUsername"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          :rules="validatePassword"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
          >
            去注册
          </a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </m-button>
      </vee-form>

      <!-- 人类行为验证模块 -->
      <slider-captcha-vue
        v-if="isSliderCaptchaVisible"
        @close="onCaptchaClose"
        @success="onCaptchaSuccess"
      ></slider-captcha-vue>

      <div class="flex justify-around mt-4">
        <qq-login-vue></qq-login-vue>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'

import headerVue from './header.vue'
// import qqLoginVue from './qq-login.vue'
// import wxLoginVue from './weixin-login.vue'

import { validateUsername, validatePassword } from '../validate'

import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

import { LOGIN_TYPE_USERNAME } from '@/constants'
import { message } from '@/libs'

import SliderCaptchaVue from './slider-captcha.vue'

const router = useRouter()

const loginForm = ref({
  username: 'vv8test',
  password: 'hzw20011223'
})

const onToRegister = () => {
  router.push('/register')
}

const loading = ref(false)

const userStore = useUserStore()
const onLoginHandler = () => {
  loading.value = true
  isSliderCaptchaVisible.value = true
}

const onLogin = async () => {
  try {
    userStore.login({
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
    router.push('/')
    message('success', '登陆成功')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref(false)

/**
 * 人类行为验证通过
 */
const onCaptchaSuccess = async () => {
  isSliderCaptchaVisible.value = false
  // 登录操作
  onLogin()
}

const onCaptchaClose = async () => {
  isSliderCaptchaVisible.value = false
  // 登录操作
  onLogin()
}
</script>

<style lang="scss" scoped></style>
