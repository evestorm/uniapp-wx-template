import { mapGetters, mapActions, mapMutations } from "vuex";
import user from "@/api/user/loginService";

const mockUserInfo = {
  nickname: "Lance",
  sex: 1,
  avatar: "https://placekitten.com/100/100",
  city: "New York",
  phone: "18711120121",
};

export default {
  data() {
    return {
      appData: getApp().globalData,
      showGetUserProfileBtn: true, // 是否显示获取用户信息的按钮
      showGetPhoneBtn: false, // 是否显示获取手机号的按钮
      redirectUrl: "", // 最终跳转的url
      wxCode: "", // uni.login 返回的 code
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getNeedAuth", "getHasLogin"]),
  },
  onLoad(options) {
    let { redirectUrl } = options;
    this.redirectUrl = decodeURIComponent(redirectUrl);
    this.getWxCode();
  },
  methods: {
    ...mapMutations(["setNeedAuth", "setUserInfo", "setHasLogin"]),
    ...mapActions(["login", "authUserInfo", "updateUserInfo"]),
    // 获取 wxCode
    async getWxCode() {
      const [err, res] = await uni.login({
        provider: "weixin",
      });
      if (!err) {
        this.wxCode = res.code;
      }
    },
    // 暂不登录
    navigateBack() {
      this.jumpUrl(this.redirectUrl);
    },
    // TODO: 旧版 获取 userProfile 用户信息
    async authUserProfile() {
      const [error, res] = await uni.getUserProfile({
        desc: "获取您的基本信息", // 这个参数是必须的
      });
      // 授权失败
      if (error) {
        this.$hxAuthUserProfileModal();
        return "获取基本信息失败";
      }
      console.log(res);
      // 授权成功
      const userInfo = res.userInfo;
      if (userInfo) {
        this.showGetUserProfileBtn = false;
        this.showGetPhoneBtn = true;
        // 本地缓存 userInfo
        this.setUserInfo({
          nickname: userInfo.nickName,
          sex: userInfo.gender,
          avatar: userInfo.avatarUrl,
          city: userInfo.city,
        });

        // 获取到用户信息后，将信息返给后端
        const result = await user.auth(userInfo);

        // TODO: mock假后端授权鉴定
        result.msg = "授权成功";

        if (result) {
          // 授权成功
          console.log(result);
          if (result.msg === "授权成功") {
            this.setNeedAuth(false);
            // 合并后端获取的用户信息，更新本地 userInfo
            this.updateUserInfo();
            this.$toast("success", "授权成功");
          } else {
            this.$toast("error", "授权失败");
          }
        }
      }
    },
    // 获取用户信息
    async getUserInfoTap() {
      const [err, res] = await uni.getUserProfile({
        desc: "注册身份信息验证",
      });
      if (!err) {
        const userData = res;
        let postData = {
          iv: userData.iv,
          code: this.wxCode,
          raw_data: userData.rawData,
          signature: userData.signature,
          encrypted_data: userData.encryptedData,
        };
        console.log("uni.getUserProfile", userData);
        const result = await user.getUserInfo(postData);
        // TODO: 到时候删除
        result.userInfo = mockUserInfo;
        if (result) {
          // 登录成功
          this.setHasLogin(true);
          this.$storage.setToken("mock token");
          this.setUserInfo(result.userInfo);
          uni.showToast({ title: "授权登陆成功" });
          setTimeout(() => {
            this.jumpUrl(this.redirectUrl);
          }, 500);
        } else {
          // 登录失败
          // 失败 or code 失效（重新获取code）
          this.getWxCode();
          uni.showModal({
            title: "授权失败",
            content: result.msg,
            showCancel: false,
          });
        }
      } else {
        this.getWxCode();
        uni.showModal({
          title: "授权失败",
          content: "获取授权信息失败，请重新授权登录",
          showCancel: false,
        });
      }
    },
    // 获取手机号
    getPhoneNumber(e) {
      console.log(e);
      if (e.detail.encryptedData) {
        var data = {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          // openId: getApp().globalData.userInfo.spOpenId
        };
        console.log(data);
        // 发送后端去解码手机号
        // let rdata=await GK01AppService.GetTelNum(data);
        // let updateUserDto = {
        // 	id: getApp().globalData.LoginUserId,
        // 	phone: rdata.phoneNumber
        // };
        // await getApp().globalData.UpdateUserInfo(updateUserDto);
        this.jumpUrl(this.redirectUrl);
      } else {
        uni.showModal({
          title: "未授权",
          content: "您未授权小程序获取您的手机号,请重新授权",
        });
      }
    },
    // 页面跳转
    jumpUrl(url) {
      console.log(url);
      if (url.indexOf("home/home") > -1 || url.indexOf("message/message") > -1 || url.indexOf("workbench/workbench") > -1 || url.indexOf("me/me") > -1) {
        // getApp().globalData.indexQuery = {
        //   shareOpenid: this.$util.getQueryString(url, "shareOpenid"),
        // };
        uni.switchTab({
          url: url,
        });
      } else {
        // url解码
        uni.redirectTo({
          url: url,
        });
      }
    },
  },
};
