/* eslint-disable no-undef */
import storage from "@/utils/unistorage/index";
import user from "@/api/user/loginService";
import { showGetAuthModal, showToast } from "@/utils/interactiveFeedback";

export const state = {
  userInfo: {}, //用户信息
  needAuth: true, // 需要授权
  hasLogin: false, // 是否登录
};
export const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
  getNeedAuth(state) {
    return state.needAuth;
  },
  getHasLogin(state) {
    return state.hasLogin;
  },
};
export const mutations = {
  setToken(state, data) {
    if (data) {
      state.token = data;
      storage.setToken(`Bearer ${data}`);
    }
  },
  //储存用户信息
  setUserInfo(state, userInfo) {
    if (userInfo) {
      state.userInfo = Object.assign({}, state.userInfo, userInfo);
      storage.setUserInfo(state.userInfo);
    }
  },
  // 设置是否需要授权
  setNeedAuth(state, needAuth) {
    state.needAuth = needAuth;
  },
  // 设置登录状态
  setHasLogin(state, hasLogin) {
    state.hasLogin = hasLogin;
  },
  logout(state) {
    state.userInfo = {};
    storage.removeUserInfo();
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
  getUserOpenId: async function ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.userInfo.openId) {
        resolve(state.userInfo.openId);
      } else {
        uni.login({
          success: () => {
            commit("login");
            setTimeout(() => {
              //模拟异步请求服务器获取 openid
              const openid = "123456789";
              console.log("uni.request mock openid[" + openid + "]");
              commit("setOpenid", openid);
              resolve(openid);
            }, 1000);
          },
          fail: err => {
            reject(err);
          },
        });
      }
    });
  },
  // 获取token
  getToken: async function ({ commit, state }) {
    return new Promise((resolve, reject) => {
      let token = storage.getToken();
      if (token) {
        return token;
      } else {
        uni.showLoading({
          title: "处理中...",
          mask: true,
        });
        if (state.userInfo.nickname) {
          uni.request({
            method: "POST",
            url: api.domain + "/api/services/app/TokenAuthService/Authenticate",
            data: {
              userNameOrEmailAddress: userNameOrEmailAddress,
              password: password,
            },
            success: res => {
              let token = `Bearer ${res.data.result.accessToken}`;
              commit("setToken", token);
              return resolve(token);
            },
            fail: err => {
              uni.navigateTo({
                url: "/pages/common/auth/auth",
              });
              reject(new Error(err));
            },
            complete: () => {
              uni.hideLoading();
            },
          });
        }
      }
    });
  },
  login: async function (context) {
    // 通过 uni.login 获取 code
    const [error, res] = await uni.login({
      provider: "weixin",
    });
    if (error) {
      showToast("error", "获取code失败");
      return "获取code失败";
    }

    // 请求后端接口, 发送code给后端换取用户信息
    const result = await user.login({
      appId: getApp().globalData.appid,
      code: res.code,
      token: storage.getToken(),
    });

    // TODO: 假数据
    result.msg = "登录成功";
    result.data = {
      token: "mock token",
      user: {
        nickname: "Lance",
        sex: 1,
        avatar: "https://placekitten.com/100/100",
        city: "宜昌",
      },
    };

    if (result.msg === "登录成功") {
      storage.setToken(result.data.token);
      context.commit("setUserInfo", res.data.user);
      context.commit("setNeedAuth", false);
      context.commit("setHasLogin", true);
      return "登录成功";
    } else {
      showToast("error", "登录失败");
      return "登录失败";
    }
  },
  authUserInfo: async function (context) {
    if (getApp().globalData.canIUseGetUserProfile()) {
      const [error, res] = await uni.getUserProfile({
        desc: "获取您的基本信息", // 这个参数是必须的
      });
      if (error) {
        showGetAuthModal();
        return "获取基本信息失败";
      }
      console.log(res);
      const userInfo = res.userInfo;
      if (userInfo) {
        context.commit("setUserInfo", {
          nickname: userInfo.nickName,
          sex: userInfo.gender,
          avatar: userInfo.avatarUrl,
          city: userInfo.city,
        });

        // 获取到用户信息后，将信息返给后端
        const result = await user.auth(context.state.userInfo);

        // TODO: mock假后端授权鉴定
        result.msg = "授权成功";

        if (result) {
          // 授权成功
          console.log(result);
          if (result.msg === "授权成功") {
            context.commit("setNeedAuth", false);
            this.dispatch("updateUserInfo");
            return "授权成功";
          } else {
            showToast("error", "授权失败");
            return "授权失败";
          }
        }
      }
    } else if (this.canIUseGetUserInfo) {
      const [error, res] = await uni.getUserInfo({
        provider: "weixin",
        lang: "zh_CN", // 获取的省份城市等信息为中文
      });
      if (error) {
        showToast("error", "授权失败");
        showGetAuthModal();
        return "授权失败";
      }
      context.commit("setUserInfo", {
        nickname: res.userInfo.nickName,
        sex: res.userInfo.gender,
        avatar: res.userInfo.avatarUrl,
        city: res.userInfo.city,
      });
      // 获取到用户信息后，将信息返给后端
      const result = await user.auth(context.state.userInfo);
      if (result) {
        // 授权成功
        console.log(result);
        if (result.msg === "授权成功") {
          context.commit("setNeedAuth", false);
          this.dispatch("updateUserInfo");
          return "授权成功";
        } else {
          showToast("error", "授权失败");
          return "授权失败";
        }
      }
    } else {
      showToast("error", "请升级微信版本");
      return "请升级微信版本";
    }
  },
  updateUserInfo: async function (context) {
    const res = await user.getUserInfo();
    if (res.data) {
      context.commit("setUserInfo", res.data);
    }
  },
};
