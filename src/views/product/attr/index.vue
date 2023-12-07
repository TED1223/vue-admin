<template>
  <!--  三级分类全局主键-->
  <Category :scene="scene" />
  <el-card style="margin: 10px 0px">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
        @click="addAttr"
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
    </div>
    <div v-show="scene === 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!attrParams.attrName"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-table
        border
        style="margin: 10px 0px"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-if="row.flag"
              @blur="toLook(row, $index)"
              size="small"
              placeholder="请您输入属性值名称"
              v-model="row.valueName"
            ></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>
      <el-button type="primary" size="default" icon="Plus" @click="save"
        >保存</el-button
      >
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import {nextTick, reactive, ref, watch} from "vue";
import { reqAddOrUpdateAttr, reqAttr } from "@/api/product/attr";
import { Attr, AttrResponseData, AttrValue } from "@/api/product/attr/type";
import { ElMessage } from "element-plus";

let categoryStore = useCategoryStore();

//存储已有的属性与属性值
let attrArr = ref<Attr[]>([]);
//定义card组件内容切换变量
let scene = ref<number>(0);
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: "", //新增的属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: "", //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
});
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([]);

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

//属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if(row.valueName.trim() == ''){
    attrParams.attrValueList.splice($index,1)
    ElMessage({
      type: "error",
      message: "属性值不能未空",
    });
    return
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row){
      return item.valueName === row.valueName;
    }
  })
  if (repeat){
    attrParams.attrValueList.splice($index,1)
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    return
  }

  //相应的属性值对象flag:变为false,展示div
  row.flag = false;
};

//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为false,展示div
  row.flag = true;
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus();
  })
};

//保存按钮的回调
const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams);
  //添加属性|修改已有的属性已经成功
  if (result.code == 200) {
    //切换场景
    scene.value = 0;
    //提示信息
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改成功" : "添加成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: attrParams.id ? "修改失败" : "添加失败",
    });
  }
};

//添加属性值按钮的回调
const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: "",
    flag: true, //控制每一个属性值编辑模式与切换模式的切换
  });
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length -1].focus();
  })
};
const addAttr = () => {
  //每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: "", //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: "", //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  });
  scene.value = 1;
};

const cancel = () => {
  scene.value = 0;
};

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
