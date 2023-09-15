<template>
  <!--  路由组件出口的位置-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--      渲染layout一级路由组件的子组件-->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped>
.fade-enter-form {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
