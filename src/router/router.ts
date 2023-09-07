export const constantRoute = [
  {
    //登录路由
    url: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    //登录路由
    url: "/",
    component: () => import(""),
    name: "layout",
  },
  {
    //登录路由
    url: "/404",
    component: () => import(""),
    name: "404",
  },
  {
    //登录路由
    url: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
