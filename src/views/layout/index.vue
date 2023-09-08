<template>
  <div class="h-screen">
    <!-- 需要在 tailwind 中定义 h-header 高度 -->
    <header-vue class="h-header"></header-vue>
    <main-vue class="h-main"></main-vue>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import headerVue from './cpns/header/index.vue'
import mainVue from './cpns/main.vue'
import floatingVue from './cpns/floating/index.vue'
import {} from 'vue'
</script>
