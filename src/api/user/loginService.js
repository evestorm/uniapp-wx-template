import request from "@/utils/request";

// http api
const urlLists = {
  login: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 登录
  auth: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 授权
  getUserInfo: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 获取用户信息
};

// 登录获取 openid + session_key
const login = params => {
  return request.post(urlLists.login, params);
};

// 授权
const auth = params => {
  return request.post(urlLists.auth, params);
};

// 获取用户信息
const getUserInfo = params => {
  return request.post(urlLists.getUserInfo, params);
};

export default {
  login,
  auth,
  getUserInfo,
};
