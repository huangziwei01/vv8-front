<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="guide-my z-20 relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        v-if="userStore.userToken"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="userStore.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>

    <template #default v-if="userStore.userToken">
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in menuArr"
          :key="item.id"
          @click="onItemClick(item.path)"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
            item.title
          }}</span>
        </div>
      </div>
    </template>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { confirm } from '@/libs'

import { useUserStore } from '@/store/user'
const userStore = useUserStore()

const router = useRouter()
// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  // {
  //   id: 1,
  //   title: '升级 VIP',
  //   icon: 'vip-profile',
  //   path: '/member'
  // },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

const onToLogin = () => {
  router.push('/login')
}

/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
const onItemClick = (path) => {
  // 有路径则进行路径跳转
  if (path) {
    router.push(path)
    return
  }
  // 无路径则为退出登录
  confirm('您确定要退出登录吗？').then(() => {
    // 退出登录不存在跳转路径
    userStore.logout()
  })
}
</script>

<style lang="scss" scoped>
/* div#driver-highlighted-element-stage,
div#driver-page-overlay {
  background: transparent !important;
  outline: 5100px solid rgba(0, 0, 0, 0.75);
} */
</style>
