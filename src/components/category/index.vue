<!--//三级分类全局组件-->
<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
        <el-select v-model="categoryStore.c1Id" @change="handler">
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
        <el-select v-model="categoryStore.c2Id" @change="handler1">
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
        <el-select v-model="categoryStore.c3Id">
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category";

let categoryStore = useCategoryStore();
//分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
  getC1();
});

const getC1 = () => {
  //通知分类仓库发请求获取一级分类的数据
  categoryStore.getC1();
};

const handler = () => {
  //需要将二三级的数据清空
  categoryStore.c2Id = "";
  categoryStore.c2Arr = [];
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
  //将二三级
  categoryStore.getC2();
};

const handler1 = () => {
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
  categoryStore.getC3();
};
</script>

<style scoped></style>
