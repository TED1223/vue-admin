//属性相关的API文件
import request from "@/utils/request";
import {HasSpuResponseData} from "@/api/product/spu/type";
//属性管理模块接口地址
enum API {
    //获取已有的SPU的数据
    HASSPU_URL = "/admin/product/",
}

//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  );
};
