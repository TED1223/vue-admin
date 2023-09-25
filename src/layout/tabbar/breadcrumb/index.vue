<template>
  <!--  顶部左侧的图标-->
  <el-icon style="margin-left: 10px" @click="chargeIcon">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <!--  右侧的面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!--      图标-->
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <!--      面包屑展示匹配路由-->
      <span style="margin: 0px 3px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";

//获取路由对象
let $route = useRoute();
let LayoutSettingStore = useLayoutSettingStore();

const chargeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
};
</script>

<style scoped></style>
