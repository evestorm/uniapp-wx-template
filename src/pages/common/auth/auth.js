// import { mapGetters, mapActions } from "vuex";
// // import user from "@/api/user/loginService";
// // import mock from "@/pages/common/auth/mock";

// export default {
//   data() {
//     return {
//       userInfo: {},
//       appData: getApp().globalData,
//     };
//   },
//   computed: {
//     ...mapGetters(["getUserInfo", "getNeedAuth", "getHasLogin"]),
//   },
//   onLoad() {
//     if (!this.getHasLogin) {
//       this.init();
//     }
//   },
//   methods: {
//     ...mapActions(["login", "authUserInfo"]),
//     init() {
//       this.login();
//     },
//   },
// };

// import GK01AppService from '@/service/GK/GK01AppService.js'
// import mock from "@/pages/common/auth/mock";

import { mapGetters, mapActions, mapMutations } from "vuex";
import user from "@/api/user/loginService";

export default {
  data() {
    return {
      appData: getApp().globalData,
      showGetUserProfileBtn: true, // 是否显示获取用户信息的按钮
      showGetPhoneBtn: false, // 是否显示获取手机号的按钮
      redirectUrl: "", // 最终跳转的url
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getNeedAuth", "getHasLogin"]),
  },
  onLoad(options) {
    let { redirectUrl } = options;
    this.redirectUrl = decodeURIComponent(redirectUrl);
  },
  methods: {
    ...mapMutations(["setNeedAuth", "setUserInfo"]),
    ...mapActions(["login", "authUserInfo", "updateUserInfo"]),
    // 获取 userProfile 用户信息
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
