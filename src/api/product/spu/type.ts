import { ResponseData } from "@/api/type";

//SPU数据的ts格式
export interface SpuData {
  category3Id: string | number;
  id?: number;
  spuName: string;
  tmId: number | string;
  description: string;
  spuImageList: null;
  spuSaleAttrList: null;
}

//数组:元素都是已有SPU数据类型
export type Records = SpuData[];

//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
