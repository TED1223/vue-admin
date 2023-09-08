//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin } from "@/api/user";
//引入数据类型
import type { loginForm } from "@/api/user/type";

//创建用户小仓库
let useUserStore = defineStore("User", {
  //小仓库存储的地方
  state: () => {
    return {
      token: localStorage.getItem("Token"), //用户唯一标识
    };
  },
  //处理异步|逻辑地方
  actions: {
    async userLogin(data: loginForm) {
      let result = await reqLogin(data);
      console.log(result);
      if (result.code == 200) {
        //由于pinia|vuex存储数据是利用js对象
        this.token = result.data.token;
        //本地持久化存储一份
        localStorage.setItem("Token", this.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
