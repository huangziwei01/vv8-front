<template>
  <div class="w-full">
    <m-search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <!-- 搜索提示 -->
        <hint-vue
          :searchText="inputValue"
          v-show="inputValue"
          @itemClick="onSearchHandler"
        ></hint-vue>
        <history v-show="!inputValue" @itemClick="onSearchHandler"></history>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import history from './history.vue'

import { useAppStore } from '@/store/app'
const appStore = useAppStore()

const inputValue = ref('')
const onSearchHandler = (val) => {
  inputValue.value = val
  appStore.changeSearchText(val)
}
</script>
