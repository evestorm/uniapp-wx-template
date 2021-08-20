import { mapGetters, mapActions, mapMutations } from "vuex";
import user from "@/api/user/loginService";

const mockUserInfo = {
  realName: "Lance",
  sex: 1,
  headIconUrl: "https://placekitten.com/100/100",
  city: "New York",
  tel: "13100726520",
  openidApp: "mock-openid",
  unionid: "mock-unionid",
  token: "mock-token",
};
console.log(mockUserInfo);

export default {
  data() {
    return {
      appData: getApp().globalData,
      // showGetUserProfileBtn: true, // 是否显示获取用户信息的按钮
      showGetPhoneBtn: true, // 是否显示获取手机号的按钮
      redirectUrl: "", // 最终跳转的url
      wxCode: "", // uni.login 返回的 code
      userData: {}, // 获取到的用户公开信息
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getHasLogin"]),
  },
  async onLoad(options) {
    let { redirectUrl } = options;
    this.redirectUrl = decodeURIComponent(redirectUrl);
  },
  methods: {
    ...mapMutations(["setUserInfo", "setHasLogin"]),
    ...mapActions(["getWxCode", "getPhoneNumber"]),
    // 暂不登录
    navigateBack() {
      this.jumpUrl(this.redirectUrl);
    },
    // 获取用户信息
    async getUserInfoTap() {
      const [err, res] = await uni.getUserProfile({
        desc: "注册身份信息验证",
      });
      console.log(err, res);
      if (!err) {
        // 把获取到的用户信息缓存起来
        this.userData = res;

        // 把微信授权 btn 隐藏；把获取手机号 btn 显示
        this.showGetUserProfileBtn = false;
        this.showGetPhoneBtn = true;
        return true;
      } else {
        this.getWxCode();
        uni.showModal({
          title: "授权失败",
          content: "获取微信授权信息失败，请重新授权",
          showCancel: false,
        });
        return false;
      }
    },
    // 获取手机号
    async getPhoneNumberTap(e) {
      const [err, result] = await this.getPhoneNumber(e);
      console.log("getPhoneNumber", result);
      if (err) return;
      // const data = await user.doLoginMobile({});
      const { iv, encryptedData } = result;
      // 获取手机号成功
      this.userData = { ...this.userData, iv, encryptedData };
      console.log("userData", this.userData);
      // 去登录
      this.weChatLogin();
    },
    // 登录
    async weChatLogin() {
      // 获取code
      const [err, wxCode] = await this.getWxCode();
      if (!err) this.wxCode = wxCode;
      console.log(`wexCode ${this.wxCode}`);

      const data = {
        code: this.wxCode, // 必传
        // raw_data: this.userData.rawData,
        // signature: this.userData.signature,
        IV: this.userData.iv, // 必传（手机号的iv）
        encryptedData: this.userData.encryptedData, // 必传（手机号的encryptedData）
      };
      console.log("user.weChatLogin.params", data, user);
      // debugger;
      const [loginErr, res] = await user.weChatLogin(data);
      console.log(`weChatLogin res`, res);
      // TODO: 后续删掉
      // res.data = mockUserInfo;
      // res.code = 0;

      if (!loginErr && res.code === 0 && res.data) {
        // 登录成功
        this.setHasLogin(true);
        this.$storage.setToken(res.data.token);
        this.setUserInfo(res.data);
        uni.showToast({ title: "授权登陆成功" });
        setTimeout(() => {
          this.jumpUrl(this.redirectUrl);
        }, 500);
      } else {
        // 登录失败
        uni.showModal({
          title: "登录失败，请重试",
          content: loginErr,
          showCancel: false,
        });
      }
    },
    // 页面跳转
    jumpUrl(url) {
      console.log(url);
      if (
        url.indexOf("home/home") > -1 ||
        url.indexOf("todoList/todoList") > -1 ||
        url.indexOf("workbench/workbench") > -1 ||
        url.indexOf("me/me") > -1
      ) {
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
