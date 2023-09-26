//品牌管理模块接口
import request from "@/utils/request";
import { TradeMark } from "@/api/product/trademark/type";

enum API {
  TRADEMARK_URL = "admin/product/baseTrademark/",
  CREATE_TRADEMARK_URL = "admin/product/baseTrademark/save",
  UPDATE_TRADEMARK_URL = "admin/product/baseTrademark/update",
  DELETE_TRADEMARK_URL = "admin/product/baseTrademark/remove/",
}
//获取一样偶品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`);

export const reqCreateTrademark = (data: TradeMark) => {
  return request.post<any, any>(API.CREATE_TRADEMARK_URL, data);
};

export const reqUpdateTrademark = (data: TradeMark) => {
  return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
};

export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_TRADEMARK_URL + id);
};
