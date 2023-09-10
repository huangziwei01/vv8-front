<template>
  <div class="">
    <!-- teleport -->
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="modelValue"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="up">
        <div
          v-if="modelValue"
          v-bind="$attrs"
          class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
        >
          <!-- 标题 -->
          <div
            class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
          ></div>
          <!-- 内容 -->
          <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
            要删除所有历史记录吗？
          </div>
          <!-- 按钮 -->
          <div class="flex justify-end">
            <m-button type="info" class="mr-2" @click="onCancelClick"
              >取消</m-button
            >
            <m-button type="primary" @click="onConfirmClick">确定</m-button>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue'])

// ------ 滚动锁定 ------
const isLocked = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)

const onCancelClick = () => {
  emits('update:modelValue', false)
}

const onConfirmClick = () => {
  emits('confirm', false)
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.5s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
