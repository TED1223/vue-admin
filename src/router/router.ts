export const constantRoute = [
  {
    //登录路由
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    //登录路由
    path: "/",
    component: () => import("@/views/home/index.vue"),
    name: "layout",
  },
  {
    //登录路由
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  {
    //登录路由
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
