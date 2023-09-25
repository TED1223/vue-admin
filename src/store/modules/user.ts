//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
//引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import type { UserState } from "@/store/modules/types/type";
//引入操作本地存储的文件工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入路由数据
import { constantRoute } from "@/router/routers";
//创建用户小仓库
let useUserStore = defineStore("User", {
  //小仓库存储的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRoute, // 仓库存储生成菜单需要数组（路由）
      username: "",
      avatar: "",
    };
  },
  //处理异步|逻辑地方
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      console.log(result);
      if (result.code == 200) {
        //由于pinia|vuex存储数据是利用js对象
        this.token = result.data;
        //本地持久化存储一份
        SET_TOKEN(this.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout() {
      const result = await reqLogout();
      if (result.code == 200) {
        //本地接口清空
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
