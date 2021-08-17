<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Vue from "vue";

export default {
  // 全局对象
  globalData: {
    appid: "wxe0c5639c8139419d",
    PicDomain: "https://pic.cwyyt.cn",
    canIUseGetUserInfo() {
      return uni.canIUse("button.open-type.getUserInfo"); // 判断小程序api是否能够在当前版本使用
    },
    canIUseGetUserProfile() {
      return uni.canIUse("getUserProfile"); // 判断小程序api是否能够在当前版本使用
    },
  },
  onLaunch: function () {
    console.log("App Launch");
    console.log(this.$options);
    this.wxLogin();
    uni.getSystemInfo({
      success: function (e) {
        Vue.prototype.windowWidth = e.windowWidth;
        Vue.prototype.WindowHeight = e.windowHeight;
        Vue.prototype.screenWidth = e.screenWidth;
        Vue.prototype.screenHeight = e.screenHeight;
        Vue.prototype.iPhoneX = e.model.search("iPhone X");
        // #ifdef MP-WEIXIN
        let custom = wx.getMenuButtonBoundingClientRect();
        console.log(custom);
        Vue.prototype.Custom = custom;
        Vue.prototype.StatusBarHeight = e.statusBarHeight + custom.height;
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.SafeHeight = e.safeArea.height;
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif
      },
    });
    // 检查是否需要更新小程序
    this.updateWxApp();
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  computed: {
    ...mapGetters(["getUserInfo", "getHasLogin"]), // 暂时没用到
  },
  methods: {
    ...mapMutations(["setUserInfo"]), // 暂时没用到
    ...mapActions(["wxLogin"]),
    // 及时更新微信小程序
    updateWxApp() {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(async () => {
            let [, rdata] = await uni.showModal({
              title: "更新提示",
              content: "发现新版本，是否重启应用?",
              cancelColor: "#eeeeee",
              confirmColor: "#cf311e",
            });
            if (rdata.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          });
        }
      });
      updateManager.onUpdateFailed(async () => {
        let [, rdata] = await uni.showModal({
          title: "提示",
          content: "检查到有新版本，但下载失败，请检查网络设置",
        });
        if (rdata.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 每个页面公共css */

/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";

// 引入 iconfont 字体样式
@import "@/assets/iconfont/iconfont.css";

// 引入 自定义内置样式
@import "@/assets/css/main.scss";
</style>
