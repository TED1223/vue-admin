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
      <el-table border style="margin: 10px 10px" :data="records">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Plus" title="添加SPU">
            </el-button>
            <el-button type="primary" size="small" icon="Edit" title="编辑SPU">
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              title="查看SKU列表"
            >
            </el-button>
            <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px">
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  title="删除SPU"
                >
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  分页器  -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50, 100]"
      :background="true"
      layout=" prev,pager,next,jumper,->,sizes,total"
      :total="total"
      @current-change="getHasSpu"
      @size-change="changeSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import useCategoryStore from "@/store/modules/category";
import { HasSpuResponseData, Records } from "@/api/product/spu/type";
import { reqHasSpu } from "@/api/product/spu";

let categoryStore = useCategoryStore();
//场景的数据
let scene = ref<number>(0);
//分页器默认页码
let pageNo = ref<number>(0);
//每一页展示几条数据
let pageSize = ref<number>(10);
//存储已有的SPU的数据
let records = ref<Records>([]);
//存储已有SPU总个数
let total = ref<number>(0);

//监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    records.value = [];
    if (categoryStore.c3Id) {
      getHasSpu();
    }
  },
);

//获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  );
  if (result.code === 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
};
</script>

<style scoped></style>
