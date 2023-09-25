//统一管理 项目用户相关的接口
import request from "@/utils/request";
import {
  loginFormData,
  loginResponseData,
  ResponseData,
  userInfoResponseData,
} from "@/api/user/type";

enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

//暴露请求参数
//登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
