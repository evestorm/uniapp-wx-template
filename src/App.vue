<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  // 全局对象
  globalData: {
    appid: "wxe0c5639c8139419d",
    PicDomain: "https://pic.cwyyt.cn",
    canIUseGetUserProfile() {
      return uni.canIUse("getUserProfile"); // 判断小程序api是否能够在当前版本使用
    },
  },
  onLaunch: function () {
    console.log("App Launch");
    console.log(this.$options);
    this.wxLogin();
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
