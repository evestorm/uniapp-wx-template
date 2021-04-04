// import request from "@/utils/request";

// // 不需要 token 的情况
// let login = async (data, success, isShowLoading = true) => {
//   return await app.Request({
//     url: "/api/services/app/GK01/Login",
//     data: data,
//     isObj: false,
//     isShowLoading: isShowLoading,
//     abpSuccess: success,
//     isNotNeedToken: true,
//   });
// }; // 获取用户信息

// // get 请求
// let getNews = async (data, success, isShowLoading = true) => {
//   // return await ({
//   //   url: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation",
//   //   data: data,
//   //   isObj: true,
//   //   isShowLoading: isShowLoading,
//   //   abpSuccess: success,
//   //   isNotNeedToken: true,
//   // });
// }; // 获取用户信息

// // post 请求
// let GetViewPage = async (data, success, isShowLoading = true) => {
//   return await app.Request({
//     url: "/api/services/app/GK01/GetViewPage",
//     data: data,
//     isObj: true,
//     isShowLoading: isShowLoading,
//     abpSuccess: success,
//   });
// };

// export default {
//   login,
//   getNews,
//   GetViewPage,
// };

import request from "@/utils/request";

// http api
const urlLists = {
  getNews: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 获取新闻
};

const getNews = params => {
  return request.post(urlLists.getNews, params);
};

export default {
  getNews,
};
