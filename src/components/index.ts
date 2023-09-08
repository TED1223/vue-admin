import SvgIcon from "@/components/SvgIcon.vue";
import type { App, Component } from "vue";
const components: { [name: string]: Component } = { SvgIcon };
export default {
  install(app: App) {
    Object.keys(components).forEach((Key: string) => {
      app.component(Key, components[Key]);
    });
  },
};