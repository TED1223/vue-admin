// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
//配置element-plus国际化
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//svg插件需要配置代码
import "virtual:svg-icons-register";
//引入自定义插件对象:注册整个项目全局组件
import gloablComponent from "./components/index";
//引入模板的全局的样式
import "@/styles/index.scss";
//引入路由
import router from "@/router";
//引入仓库
import pinia from "@/store";
//
import '@/permisstion'



//获取应用实例
const app = createApp(App);
//安装ElementPlus
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
});
app.use(gloablComponent);
//安装仓库
app.use(pinia);
app.use(router);
//将应用挂载到挂载点
app.mount("#app");
