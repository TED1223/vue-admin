<template>
  <div>
    <h1>home</h1>
  </div>
</template>

<script setup lang="ts">
//引入组合是API生命周期函数
import {onMounted} from "vue";
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();
onMounted(() => {
  userStore.userInfo();
})
</script>

<style scoped></style>
