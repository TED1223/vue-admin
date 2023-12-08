<template>
  <div>
    <!--  三级分类  -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 10px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
        >添加SPU</el-button
      >
      <el-table border style="margin: 10px 10px">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作"></el-table-column>
      </el-table>
    </el-card>
    <!--  分页器  -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50, 100]"
      :background="true"
      layout=" prev,pager,next,jumper,->,sizes,total"
      :total="400"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import useCategoryStore from "@/store/modules/category";

let categoryStore = useCategoryStore();
//场景的数据
let scene = ref<number>(0);
//分页器默认页码
let pageNo = ref<number>(0);
//每一页展示几条数据
let pageSize = ref<number>(10);
</script>

<style scoped></style>
