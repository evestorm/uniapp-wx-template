import MinCache from "./MinCache";

const uStorage = new MinCache();

const prefix = "HX.";

const storage = {
  // 设置token缓存
  setToken(token, timeout) {
    uStorage.set(prefix + "Token", token, timeout);
  },
  // 获取token
  getToken() {
    return uStorage.get(prefix + "Token");
  },
  // 移除token
  removeToken() {
    uStorage.remove(prefix + "Token");
  },

  // 设置用户信息
  setUserInfo(userInfo) {
    // 设置全局用户信息
    // getApp().globalData.userInfo = userInfo;
    // getApp().globalData.LoginUserId = userInfo.id;
    return uStorage.set(prefix + "UserInfo", userInfo);
  },
  // 获取用户信息
  getUserInfo() {
    return uStorage.get(prefix + "UserInfo");
  },
  // 移除用户信息
  removeUserInfo() {
    uStorage.remove(prefix + "UserInfo");
  },
};

export default storage;
