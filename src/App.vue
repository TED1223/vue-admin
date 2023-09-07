<template>
  <div>
    <h1>Hello</h1>
    <el-button type="primary" size="default" :icon="Plus"> ssadasd</el-button>
    <el-button type="primary" size="default" :icon="Edit"> ssadasd</el-button>
    <el-button type="primary" size="default" :icon="Delete"> ssadasd</el-button>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.div {
  .h1 {
    color: $color;
  }
}
</style>
