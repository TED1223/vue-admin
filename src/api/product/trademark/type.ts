import { ResponseData } from "@/api/type";

//已有品牌的ts数据类型
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

//包含全部品牌的ts数据
export type Records = TradeMark[];

//获取返回品牌的数据
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
