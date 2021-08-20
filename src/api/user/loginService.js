import request from "@/utils/request";

// http api
const urlLists = {
  weChatLogin: "/weChatLogin", // 微信登录
  doLoginMobile: "/doLoginMobile", // 移动端用户登录
};

// 微信登录
const weChatLogin = params => {
  return request.post(urlLists.weChatLogin, params);
};

const doLoginMobile = params => {
  // params.phone = "18308891908";
  return request.post(urlLists.doLoginMobile, params);
};

export default {
  weChatLogin,
  doLoginMobile,
};
