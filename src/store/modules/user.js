/* eslint-disable no-undef */
import storage from "@/utils/unistorage/index";
import user from "@/api/user/loginService";

const mockUserInfo = {
  nickname: "Lance",
  sex: 1,
  avatar: "https://placekitten.com/100/100",
  city: "New York",
  phone: "",
};

export const state = {
  userInfo: {}, //用户信息
  hasLogin: false, // 是否登录
};
export const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
  getHasLogin(state) {
    return state.hasLogin;
  },
};
export const mutations = {
  // 设置token
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

  // 1. 前端调用 wx.login 方法获取登录凭证（code）。
  // 2. 前端把凭证（code）发送给后端
  // 3. 后端用 code （code+appid+appsecret）换取 用户登录态信息（session_key + openid）：
  // 包括用户在当前小程序的
  //    唯一标识（openid）
  //      (根据openid在数据库中查找是否有这个用户，
  //        3.1 有就返回用户信息，
  //        3.2 否则就把当前openid插入到数据库，返回未授权状态给前端)
  //    微信开放平台帐号下的唯一标识（unionid，若当前小程序已绑定到微信开放平台帐号）
  //    及本次登录的会话密钥（session_key）等
  // 4. 前端接收后端返回的信息：
  //      4.1 未授权状态，就需要调用 wx.getUserInfo 获取用户信息；再调用后端接口把用户信息保存到后端数据库，注册成功保存token
  //      4.2 已授权（有当前用户信息），就展示用户信息，刷新token

  /**
   * @description 获取 wxCode
   */
  getWxCode: async function () {
    const [err, res] = await uni.login({
      provider: "weixin",
    });
    if (!err) {
      return res.code;
    }
    return "";
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
    } else {
      const wxCode = await context.dispatch("getWxCode");
      const res = await user.getUserPhone({
        iv: data.iv,
        code: wxCode,
        encryptedData: data.encryptedData,
      });

      // TODO: 假数据得删除
      res.code = 0;

      if (res.code === 0) {
        uni.showToast({ title: "获取成功" });
        // 查询新的 userInfo 并更新 userInfo
        const [, data] = await user.getUserInfo({
          code: wxCode,
        });
        // TODO: 假数据得删除
        data.userInfo = mockUserInfo;
        data.userInfo.phone = "18722212221";
        context.commit("setUserInfo", data.userInfo ? data.userInfo : {});
      } else {
        await context.dispatch("getWxCode");
        uni.showModal({
          content: "手机号码获取失败，请重试！",
          showCancel: false,
        });
      }
    }
  },

  /**
   * @description 微信登录
   */
  async wxLogin(context) {
    let token = storage.getToken();
    console.log("getToken:", token);
    if (token) {
      // 有token
      const [, result] = await user.checkToken();
      console.log("checkToken:", result);
      if (result) {
        // token 有效:
        // 设置vuex登录状态
        context.commit("setHasLogin", true);
        // 查询新的 userInfo 并更新 userInfo
        const [, data] = await user.getUserInfo();
        // TODO: 假数据得删除
        data.userInfo = mockUserInfo;
        context.commit("setUserInfo", data.userInfo ? data.userInfo : {});
        return context.state.userInfo;
      } else {
        // token 失效:
        // 登出
        context.commit("logout");
        // 重新登录
        this.dispatch("wxLogin");
      }
    } else {
      // 没有token
      const [err, res] = await uni.login({
        provider: "weixin",
      });
      console.log("uni.login:", { err, res });

      if (err) {
        // 登录失败
        // 登出
        context.commit("logout");
        return false;
      }
      // 获取code成功

      // 查询新的 userInfo 并更新 userInfo
      const [, data] = await user.getUserInfo({
        code: res.code,
      });
      if (data) {
        console.log("user.getUserInfo:", data);
      }

      // TODO: 删掉到时候（注释即没登录过，不注释代表后台有用户信息）
      // data.token = "mock user";
      // data.userInfo = {
      //   nickname: "Lance",
      //   sex: 1,
      //   avatar: "https://placekitten.com/100/100",
      //   city: "New York",
      //   phone: "",
      // };

      if (data && data.token) {
        // 登录成功
        // 设置vuex登录状态
        context.commit("setHasLogin", true);
        context.commit("setUserInfo", data.userInfo ? data.userInfo : {});
        // 更新localStorage的token 和 userInfo
        storage.setToken(data.token);
        storage.setUserInfo(data.userInfo);
        return context.state.userInfo;
      } else {
        // 登录失败
        context.commit("logout");
        return false;
      }
    }
  },
};
