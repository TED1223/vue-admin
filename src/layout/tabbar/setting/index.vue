<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <!--  下拉菜单-->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";

let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();
//刷新按钮点击的回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};

const fullScreen = () => {
  //DOM对象的一个属性：可以用来判断是否全屏
  let full = document.fullscreenElement;

  if (!full) {
    //文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const logout = async () => {
  //第一件事 向服务端发送去请求【退出登录接口】
  //2. 仓库当中的用户相关的数据清空
  await userStore.userLogout();
  //3.跳转到登录界面
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>

<style scoped></style>
