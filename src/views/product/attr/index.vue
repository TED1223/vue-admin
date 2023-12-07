<template>
  <!--  三级分类全局主键-->
  <Category></Category>
  <el-card style="margin: 10px 0px">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      :disabled="!categoryStore.c3Id"
      >添加属性
    </el-button>
    <el-table border style="margin: 10px 0px" :data="attrArr">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="属性名称"
        width="120px"
        prop="attrName"
      ></el-table-column>
      <el-table-column label="属性值名称">
        <!-- row: 已有的属性对象 -->
        <template #="{ row, $index }">
          <el-tag
            style="margin: 5px"
            v-for="(item, index) in row.attrValueList"
          >
            {{ item.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { ref, watch } from "vue";
import { reqAttr } from "@/api/product/attr";
import { Attr, AttrResponseData } from "@/api/product/attr/type";

let categoryStore = useCategoryStore();

//存储已有的属性与属性值
let attrArr = ref<Attr[]>([]);
//监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = [];
    if (!categoryStore.c3Id) return;
    // 获取分类的id
    getAttr();
  },
);

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  //获取分类下的已有的属性
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  console.log(result);

  if (result.code === 200) {
    let resultData = result.data;
    if (resultData) {
      resultData.forEach(
        (data) => (data.attrValueList = data.attrValueList.slice(0, 5)),
      );
    }
    attrArr.value = resultData;
  }
};
</script>

<style scoped></style>