<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <!--     滚动条组件 -->
      <el-scrollbar
        class="scrollbar"
        :class="{ fold: !!LayoutSettingStore.fold }"
      >
        <el-menu
          :collapse="!!LayoutSettingStore.fold"
          :default-active="$router.path"
          background-color="#001529"
          text-color="white"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main">
      <router-view></router-view>
<!--      <Main></Main>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/setting";
import Main from "@/layout/main/index.vue";
import Tabbar from "@/layout/tabbar/index.vue";

let userStore = useUserStore();
let LayoutSettingStore = useLayoutSettingStore();
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: #535bf2;
    top: 0;
    left: $base-menu-width;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: yellowgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }

  .scrollbar {
    width: $base-menu-width;
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }
}
</style>
