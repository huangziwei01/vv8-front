<template>
  <div>
    <mobile-navigation v-if="isMobileTerminal" :categoryData="categoryData" />
    <pc-navigation v-else></pc-navigation>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { useCategoryStore } from '@/store/category'
import { isMobileTerminal } from '@/utils/flexible'

import mobileNavigation from './cpns/mobile-navigation.vue'
import pcNavigation from './cpns/pc-navigation.vue'
// import { getCategory } from '@/api/category'

// const getCategoryData = async () => {
//   const { categorys } = await getCategory()
//   categoryData.value = categorys
//   categoryData.value.unshift(ALL_CATEGORY_ITEM)
//   console.log(categoryData.value)
// }
// getCategoryData()
const categoryStore = useCategoryStore()
categoryStore.getCategoryData()
const categoryData = computed(() => categoryStore.categoryData)
</script>

<style lang="scss" scoped></style>
