import SvgIcon from "@/components/SvgIcon.vue";
import Category from "./category/index.vue";
import * as ElementPlusIconVue from "@element-plus/icons-vue";

const components: any = { SvgIcon, Category };
export default {
  install(app: any) {
    Object.keys(components).forEach((Key: string) => {
      app.component(Key, components[Key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconVue)) {
      app.component(key, component);
    }
  },
};
