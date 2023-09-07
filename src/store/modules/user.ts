//创建用户相关的小仓库
import { defineStore } from "pinia";
//创建用户小仓库
const useUserStore = defineStore("User", {
  //小仓库存储的地方
  state: () => {
    return {};
  },
  //处理异步|逻辑地方
  actions: {},
  getters: {},
});

export default useUserStore;
