//封装本地存储存储数据和读取数据方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("Token", token);
};

export const GET_TOKEN = () => {
  return localStorage.getItem("Token");
};
