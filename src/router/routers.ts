export const constantRoute = [
  {
    //登录路由
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
      hidden: true,
      icon: "Avatar",
    },
  },
  {
    //首页路由
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "首页",
      hidden: false,
      icon: "Avatar",
    },
    children: [
      {
        path: "/acl",
        component: () => import("@/layout/index.vue"),
        name: "Acl",
        meta: {
          hidden: false,
          title: "权限管理",
          icon: "Lock",
        },
        children: [
          {
            path: "/acl/user",
            component: () => import("@/views/acl/user/index.vue"),
            name: "User",
            meta: {
              hidden: false,
              title: "用户管理",
              icon: "User",
            },
          },
          {
            path: "/acl/role",
            component: () => import("@/views/acl/role/index.vue"),
            name: "Role",
            meta: {
              hidden: false,
              title: "角色管理",
              icon: "UserFilled",
            },
          },
          {
            path: "/acl/permission",
            component: () => import("@/views/acl/permission/index.vue"),
            name: "Permission",
            meta: {
              hidden: false,
              title: "菜单管理",
              icon: "Monitor",
            },
          },
        ],
      },
    ],
  },
  {
    //404路由
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
      icon: "Avatar",
    },
  },
  {
    //登录路由
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "404",
      hidden: true,
      icon: "Avatar",
    },
  },
];
