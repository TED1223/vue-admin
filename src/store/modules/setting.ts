import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, //菜单折叠控制
      refresh: false, //刷新效果的控制
    };
  },
});
export default useLayoutSettingStore;
