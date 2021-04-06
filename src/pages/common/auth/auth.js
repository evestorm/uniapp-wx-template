import { mapGetters, mapActions } from "vuex";
// import user from "@/api/user/loginService";
// import mock from "@/pages/common/auth/mock";

export default {
  data() {
    return {
      userInfo: {},
      appData: getApp().globalData,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getNeedAuth", "getHasLogin"]),
  },
  onLoad() {
    if (!this.getHasLogin) {
      this.init();
    }
  },
  methods: {
    ...mapActions(["login", "authUserInfo"]),
    init() {
      this.login();
    },
  },
};
