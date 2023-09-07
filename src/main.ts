// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
import gloablComponent from "./components/index";
import "@/styles/index.scss";

//获取应用实例
const app = createApp(App);
//安装ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(gloablComponent);
//将应用挂载到挂载点
app.mount("#app");
