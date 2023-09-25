<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <!--     滚动条组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="!!LayoutSettingStore.fold"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: !!LayoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: LayoutSettingStore.fold }">
      <!--      <router-view></router-view>-->
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from "vue-router";
//引入左侧菜单logo子组件
import Logo from "./logo/index.vue";
//引入菜单组件
import Menu from "./menu/index.vue";
//右侧内容展示区域
import Main from "./main/index.vue";
//引入顶部tabbar组件
import Tabbar from "./tabbar/index.vue";
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting";
let userStore = useUserStore();
//获取layout配置仓库
let LayoutSettingStore = useLayOutSettingStore();

//获取路由对象
let $route = useRoute();
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

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
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

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
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
