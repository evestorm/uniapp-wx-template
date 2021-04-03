import { mapState } from "vuex";

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
    ...mapState(["tabBar"]),
  },
  methods: {
    gotoSubPage() {
      uni.navigateTo({
        url: `/pages/homeSub/subPage/subPage?title=${this.title}`,
      });
    },
  },
};
