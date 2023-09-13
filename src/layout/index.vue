<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
    </div>
    <div class="layout_tabbar">456</div>
    <div class="layout_main">
      <p style="height: 1000000px; background: red">sdasdsadsadasd</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
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
}
</style>
