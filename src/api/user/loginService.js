import request from "@/utils/request";

// http api
const urlLists = {
  login: "/wx/user/login", // 登录
  auth: "/wx/user/postAuth", // 授权
  getUserInfo: "wx/user/getUserInfo", // 获取用户信息
};

// 登录获取 openid + session_key
const login = params => {
  return request.get(urlLists.login, params);
};

// 授权
const auth = params => {
  return request.post(urlLists.auth, params);
};

// 获取用户信息
const getUserInfo = params => {
  return request.get(urlLists.getUserInfo, params);
};

export default {
  login,
  auth,
  getUserInfo,
};
