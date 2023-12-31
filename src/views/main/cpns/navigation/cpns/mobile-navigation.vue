<template>
  <div class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-900">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"
        :style="sliderStyle"
      ></li>

      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>

      <!-- category item -->
      <li
        v-for="(item, index) in categoryData"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        @click="onNavItemClick(item, index)"
        :class="{
          'text-zinc-100 ': currentCategoryIndex === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- 弹出层 -->
    <m-popup v-model="isOpenPopup">
      <menu-vue
        :categoryData="categoryData"
        @onItemClick="onMenuItemClick"
      ></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUpdate } from 'vue'
import { useScroll } from '@vueuse/core'

import { useAppStore } from '@/store/app'
const appStore = useAppStore()

import menuVue from '../../menu/index.vue'

defineProps({
  categoryData: {
    type: Array,
    required: true
  }
})

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})
// 选中的 item 下标
const currentCategoryIndex = ref(0)
// 获取填充的所有 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})
// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 为 sliderStyle 设置属性
  sliderStyle.value = {
    // ul 横向滚动位置 + 当前元素的 left 偏移量
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})
// item 点击事件
const onNavItemClick = (item, index) => {
  appStore.changeCurrentCategory(item)
  currentCategoryIndex.value = index
}

// 点击汉堡按钮后
const isOpenPopup = ref(false)
const onMenuItemClick = (index) => {
  currentCategoryIndex.value = index
  isOpenPopup.value = false
}
</script>

<style lang="scss" scoped></style>
