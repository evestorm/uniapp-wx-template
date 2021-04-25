import request from "@/utils/request";

// http api
const urlLists = {
  login: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 登录
  auth: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 授权
  getUserInfo: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 获取用户信息

  checkToken: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 检查token
  getUserPhone: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 绑定手机号
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

// 检查 token 有效性
const checkToken = params => {
  return request.post(urlLists.checkToken, params);
};

// 绑定手机号
const getUserPhone = params => {
  return request.post(urlLists.getUserPhone, params);
};

export default {
  login,
  auth,
  getUserInfo,
  checkToken,
  getUserPhone,
};
