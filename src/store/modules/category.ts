import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategoryResponseData } from "@/api/product/attr/type";

const useCategoryStore = defineStore("Category", {
  state: () => {
    return {
      //存储一级分类的数据
      c1Arr: [],
      //存储一级分类的ID
      c1Id: "",
      c2Arr: [],
      c2Id: "",
      c3Arr: [],
      c3Id: "",
    };
  },
  actions: {
    //获取一级分类的方法
    async getC1() {
      let result: CategoryResponseData = await reqC1();
      if (result.code == 200) {
        this.c1Arr = result.data;
      }
    },
    //获取二级分类的方法
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1Id);
      if (result.code == 200) {
        this.c2Arr = result.data;
      }
    },
    //获取三级分类的方法
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2Id);
      if (result.code == 200) {
        this.c3Arr = result.data;
      }
    },
  },
  getters: {},
});

export default useCategoryStore;
