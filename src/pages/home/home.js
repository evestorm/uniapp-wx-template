import { mapState } from "vuex";

import home from "@/api/home/newsService";

export default {
  data() {
    return {
      // banner
      bannerList: [
        {
          img: "https://placekitten.com/200/200",
        },
        {
          img: "https://placekitten.com/300/300",
        },
      ],
      // menu
      menuList: [
        {
          name: "抽奖活动",
          src: "/static/images/menu/抽奖活动.png",
        },
        {
          name: "积分商城",
          src: "/static/images/menu/积分商城.png",
        },
        {
          name: "合作商家",
          src: "/static/images/menu/合作商家.png",
        },
        {
          name: "我的兑换码",
          src: "/static/images/menu/我的兑换码.png",
        },
      ],
      // notice
      noticeList: ["寒雨连江夜入吴平明送客楚山孤洛阳亲友如相问一片冰心在玉壶", "平明送客楚山孤", "洛阳亲友如相问", "一片冰心在玉壶"],
      // cards
      cardList: [
        {
          img: "https://placekitten.com/200/100",
          title: "舒肤佳薰衣草舒缓呵护香皂",
          rest: "25",
          newScore: 50,
          oldScore: 15,
        },
        {
          img: "https://placekitten.com/200/100",
          title: "舒肤佳薰衣草舒缓呵护香皂",
          rest: "25",
          newScore: 50,
          oldScore: 15,
        },
        {
          img: "https://placekitten.com/200/100",
          title: "舒肤佳薰衣草舒缓呵护香皂",
          rest: "25",
          newScore: 50,
          oldScore: 15,
        },
      ],
    };
  },
  computed: {
    ...mapState(["tabBar", "userInfo"]),
  },
  onShow() {
    console.log("home-onShow");

    // 有nickname就不用再获取位置信息了
    if (!this.userInfo.nickname) {
      this.checkLocation();
    }
  },
  mounted() {
    this.getNews();
  },
  methods: {
    gotoSubPage() {
      uni.navigateTo({
        url: `/pages/homeSub/subPage/subPage?title=${this.title}`,
      });
    },
    async getNews() {
      let result = await home.getNews();
      if (result) {
        console.log(result);
      }
    },
    gotoAuth() {
      // 获取当前页面的URL和url完整路径
      let fullPath = this.$utils.getCurrentPageUrlAndArgs();

      let redirectUrl = "/" + fullPath;
      let url = `/pages/common/auth/auth?redirectUrl=${encodeURIComponent(redirectUrl)}`;
      uni.redirectTo({
        url,
      });
    },
    gotoProductsList() {
      uni.navigateTo({
        url: "/pages/homeSub/productsList/productsList",
      });
    },
    // 检查位置
    async checkLocation() {
      const [err, res] = await uni.getSetting();
      if (err) {
        this.$toast("error", "获取当前设置失败");
        return;
      }
      if (!res.authSetting["scope.userLocation"]) {
        const [err, res] = await uni.authorize({
          scope: "scope.userLocation",
          desc: "获取相关城市定位",
        });
        if (err) {
          this.$toast("error", "授权失败");
          return;
        }
        if (res) {
          const [err, res] = await uni.getLocation();
          if (err) {
            this.$toast("error", "获取地理位置信息失败");
            return;
          }
          if (res) {
            console.log("获取到的地理位置信息：", res);
          }
        }
      } else {
        const [err, res] = await uni.getLocation();
        if (err) {
          this.$toast("error", "获取地理位置信息失败");
          return;
        }
        if (res) {
          console.log("获取到的地理位置信息：", res);
        }
      }
    },
  },
};
