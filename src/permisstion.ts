//路由鉴权 项目中当中路由不能被访问的权限
import Router from "@/router";
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//进度条的加载圆圈不要
nprogress.configure({ showSpinner: false });
import useUserStore from "@/store/modules/user";
import pinia from "@/store";
import setting from "@/setting";
const userStore = useUserStore();
//全局前置守卫
Router.beforeEach((to: any, from: any, next: any) => {
  //网页的名字
  document.title = `${setting.title}-${to.meta.title}`;
  //访问每一个路由之前的守卫
  nprogress.start();
  //获取token
  const token = userStore.token;
  const username = userStore.username;
  //用户登录判断
  if (token) {
    //登录成功，访问login,指向首页
    if (to.path == "login") {
      next("/home");
    } else {
      //有用户信息的访问其他的放行
      if (username) {
        next();
      } else {
        try {
          //获取用户信息
          await userStore.userInfo();
          next();
        } catch (error) {
          userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path == "login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

//全局后置守卫
Router.afterEach((to: any, from: any) => {
  nprogress.done();
});

//第一个问题：任意路由切换实现进度条业务 ----nprogress
//第二个问题：路由鉴权
//全部路由组件 ：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（4个子路由）

//用户未登录 ：可以访问login 其余都不行
//登陆成功：不可以访问login 其余都可以
