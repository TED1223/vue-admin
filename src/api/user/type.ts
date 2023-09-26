import { ResponseData } from "@/api/type";

//登录接口需要携带参数类型
export interface loginFormData {
  username: string;
  password: string;
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

//定义获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    button: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
