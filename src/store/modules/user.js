/* eslint-disable no-undef */
import storage from "@/utils/unistorage/index";
import user from "@/api/user/loginService";

// const mockUserInfo = {
//   realName: "Lance",
//   sex: 1,
//   headIconUrl: "https://placekitten.com/100/100",
//   city: "New York",
//   tel: "13100726520",
//   openidApp: "mock-openid",
//   unionid: "mock-unionid",
//   token: "mock-token",
// };

export const state = {
  token: "", // token
  userInfo: {}, // 用户信息
  hasLogin: false, // 是否登录
};
export const getters = {
  getToken(state) {
    return state.token;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getHasLogin(state) {
    return state.hasLogin;
  },
};
export const mutations = {
  setToken(state, data) {
    if (data) {
      state.token = data;
      storage.setToken(data);
    }
  },
  // 储存用户信息
  setUserInfo(state, userInfo) {
    if (userInfo) {
      state.userInfo = Object.assign({}, state.userInfo, userInfo);
      storage.setUserInfo(state.userInfo);
    }
  },
  // 设置登录状态
  setHasLogin(state, hasLogin) {
    state.hasLogin = hasLogin;
  },
  // 登出
  logout(state) {
    state.userInfo = {};
    state.hasLogin = false;
    storage.removeUserInfo();
    storage.removeToken();
  },
};
export const actions = {
  // 微信小程序登录文档：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
  // 微信小程序登录接口：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html

  /**
   * @description 获取 wxCode
   */
  getWxCode: async function () {
    const [err, res] = await uni.login({
      provider: "weixin",
    });
    if (!err) {
      return Promise.resolve([null, res.code]);
    }
    return Promise.resolve([err, null]);
  },

  /**
   * @description 获取手机号
   */
  getPhoneNumber: async function (context, e) {
    let data = e.detail;
    if (!data.errMsg || data.errMsg != "getPhoneNumber:ok") {
      uni.showModal({
        content: "无法获取您的手机号码，请重试！",
        showCancel: false,
      });
      return Promise.resolve([data.errMsg, null]);
    } else {
      return Promise.resolve([null, data]);
    }
  },

  // 程序启动，看本地有没有userInfo.phone;
  // 有：调用 /driverHome/doLoginMobile
  //    获取新 userInfo 和 里面的 token，其他接口传递 token
  // 无：调用 /driverHome/weChatLogin (code + 获取手机号返回的 iv + encryptedData)
  //    获取新 userInfo 和 里面的 token，其他接口传递 token
  /**
   * @description 微信登录（已登录过的用户）
   */
  async wxLogin(context) {
    let userInfo = storage.getUserInfo();
    // username: 就是手机号
    // hafSID: "openid,unionId"
    console.log("userInfo:", userInfo);
    if (userInfo && userInfo.username) {
      const [openid, unionid] = userInfo.hafSID.split(",");
      // 有电话，以前登录过，更新 userInfo
      const [err, res] = await user.doLoginMobile({
        openid,
        phone: userInfo.username,
        unionid,
      });
      if (!err && res.code === 0 && res.data) {
        // 设置vuex登录状态
        context.commit("setHasLogin", true);
        // TODO: 假数据得删除
        // res.data = mockUserInfo;
        context.commit("setUserInfo", res.data ? res.data : {});
        context.commit("setToken", res.data ? res.data.token : "");
        uni.$emit("hasLogin");
        return Promise.resolve([null, context.state.userInfo]);
      } else {
        // 登录失败
        // 登出
        context.commit("logout");
        return Promise.resolve([err, null]);
      }
    } else {
      context.commit("logout");
      return Promise.resolve(["登录失败", null]);
    }
  },
};
