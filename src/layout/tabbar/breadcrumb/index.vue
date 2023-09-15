<template>
  <!--  顶部左侧的图标-->
  <el-icon style="margin-left: 10px" @click="chargeIcon">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <!--  右侧的面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限挂历</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
let LayoutSettingStore = useLayoutSettingStore();

const chargeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
};
</script>

<style scoped></style>
