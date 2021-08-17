import LuckyGrid from "uni-luck-draw/lucky-grid"; // 九宫格
import $lottery from "@/api/home/lotteryService.js"; // 抽奖接口
export default {
  data() {
    return {
      // 顶部导航栏配置
      config: {
        title: "抽奖活动",
        color: "#ffffff",
        //背景颜色;参数一：透明度（0-1）;参数二：背景颜色（array则为线性渐变，string为单色背景）
        backgroundColor: [0, ["#ff9147"]],
        statusBarBackground: "transparent",
        slideBackgroundColor: [0, ["#ff9147"]],
      },
      // 九宫格抽奖配置
      blocks: [
        { padding: "30rpx 10rpx", background: "#d62d1d" },
        { padding: "10rpx", paddingRight: "90rpx", background: "#d62d1d" },
        { padding: "0rpx", background: "#d62d1d" },
      ], // 背景
      defaultStyle: {
        borderRadius: 20, // 格子圆角
        // fontColor: "#CF311E", // 字体颜色
        fontSize: "44rpx", // 字体大小(px)
        fontStyle: "sans-serif", // 字体样式
        textAlign: "center",
        background: "white", // 格子的背景颜色
        // shadow: "0 5 0 #FFCACB", // 格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
      }, // 默认样式
      defaultConfig: {
        gutter: "20rpx", // 格子之间的间距 （默认等于 5）
        speed: 30, // 旋转速度峰值 默认20
        accelerationTime: 2500, // 开始旋转时间，默认2500
        decelerationTime: 2500, // 缓慢停止时间，默认2500
      }, // 默认配置
      activeStyle: {
        // fontColor: "#CF311E", // 字体颜色
        // fontSize: "24rpx", // 字体大小(px)
        fontStyle: "sans-serif", // 字体样式
        background: "#FFF7B6", // 格子的背景颜色
        // shadow: "0 5 0 #FFB128", // 格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
      }, // 中奖标记样式
      prizes: [], // 奖品

      // 页面其他data
      show: false, // 是否显示获奖弹窗
      isBingo: false, // 中奖与否，为了设置弹窗显示的内容
      canStart: false, // 是否可以点击抽奖按钮
      canJoin: false, // 是否能参与抽奖
      bingoDesc: "", // 抽到奖的描述
      bingoName: "", // 抽到的奖品名
      activityRules: [
        {
          name: "参与对象",
          content: `
            <ul style="list-style: none; padding-left: 0">
              <li>1.华新商城以电子提货单提货的自提业务司机(含袋/散装)；</li>
              <li>2.在工厂完成了司机认证的司机；</li>
              <li>3.当月有自提业务并且生成有效积分的司机；</li>
              <li>4.参与人员每月仅享受一次抽奖机会。</li>
            </ul>
          `,
        },
        {
          name: "活动奖励",
          content: `
            <div><span style="font-weight: bold;">一等奖1名</span>：500积分或50元油卡；</div>
            <div><span style="font-weight: bold;">二等奖5名</span>：300积分或食用油一桶(20kg)；</div>
            <div><span style="font-weight: bold;">三等奖10名</span>：100积分；</span>
            <div><span style="font-weight: bold;">参与奖N名</span>：10积分。</div>
          `,
        },
        {
          name: "兑奖说明",
          content: `
            <ul style="list-style: none; padding-left: 0">
              <li>1.积分奖励会直接加到个人积分账户中；</li>
              <li>2.实物奖励会生成兑换记录，请到工厂进行兑换。</li>
            </ul>
          `,
        },
      ], // 抽奖规则
    };
  },
  components: { LuckyGrid },
  computed: {
    paddingTop() {
      return `calc(${this.StatusBarHeight}rpx)`;
    },
    // 去除导航栏之后的高度
    ignoreNavbarHeight() {
      return `calc(${this.screenHeight}px - 44px - ${this.StatusBar}px)`;
    },
    // 抽奖按钮
    buttons() {
      return [
        {
          x: 1,
          y: 1,
          background: "#FDAE37",
          borderRadius: "30rpx",
          shadow: "0 0 0 transparent",
          // fonts: [{ text: "点击抽奖", fontColor: "#fff", top: "0%", fontSize: "42rpx", lengthLimit: "60%", lineHeight: "52rpx" }],
          imgs: [
            {
              src: this.$utils.combImg("home/Lottery-btn.png"),
              width: "100%",
              top: "0",
            },
          ],
        },
      ];
    },
  },
  onPageScroll(e) {
    // 重点，用到滑动切换必须加上
    this.$refs.hxnb.pageScroll(e);
  },
  mounted() {
    this.getPrizeList();
  },
  methods: {
    // 获取奖品九宫格
    async getPrizeList() {
      const res = await $lottery.getList();
      let { data } = res;
      const arr = [];
      if (data && data.length > 0) {
        data.forEach(item => {
          arr.push({
            idx: item.order - 1,
            ...item,
          });
        });
      }

      const prizes = [];
      let axis = [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
        [1, 2],
        [0, 2],
        [0, 1],
      ];
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        prizes.push({
          index: i,
          x: axis[i][0],
          y: axis[i][1],
          borderRadius: "30rpx",
          fonts: [
            {
              text: this.$utils.subText(item.prizeName, 5),
              top: "10%",
              fontSize: "32rpx",
              fontWeight: "800",
              fontColor: "#CF311E",
            },
            {
              text: this.$utils.subText(item.awardName, 5),
              top: "60%",
              fontSize: "24rpx",
              fontColor: "#F56616",
            },
          ],
        });
      }
      this.prizes = prizes;
      // 奖品查询到以后，可以点击按钮了
      this.canStart = true;
    },
    // 查询是否可以参与抽奖
    async isJoin() {
      const res = await $lottery.isJoin();
      this.canJoin = res.data;
    },
    // 点击按钮后的回调
    async startCallBack() {
      // 只有 canStart 为真，才能执行下面操作
      if (!this.canStart) return;
      this.canStart = false;
      // 判断是否可抽奖
      await this.isJoin();
      if (!this.canJoin) {
        this.$refs.uToast.show({
          title: "积分不足，请赚取积分后再来抽奖哦~",
          type: "warning",
          position: "top",
        });
        this.canStart = true;
        return;
      }
      console.log("开始抽奖");

      try {
        const res = await $lottery.bingo();
        // data有值，代表获奖
        if (res.data) {
          this.$refs.LuckDraw.play();
          // 设置奖项
          this.bingoDesc = this.$utils.subText(`恭喜您抽中: ${res.data.awardName}`);
          this.bingoName = this.$utils.subText(`${res.data.prizeName}`);
          setTimeout(() => {
            // 停止转盘
            this.$refs.LuckDraw.stop(Number(res.data.showArea) - 1);
            this.isBingo = true;
          }, 2000);
        } else {
          // stop传-1，不会调用endcallback，所以需要手动设置 show = true
          this.$refs.LuckDraw.stop(-1);
          // data为null且code === 0，代表没抽到；其他情况直接报系统错误
          this.show = !res.data && res.code === 0 ? true : false;
          this.isBingo = false;

          setTimeout(() => {
            this.canStart = true;
          }, 500);
        }
      } catch (err) {
        this.$refs.LuckDraw.stop(-1);
        this.$refs.uToast.show({
          title: "系统开了小差，请重试！",
          type: "warning",
        });
        this.closePopup();
        return;
      }
    },
    // 抽奖结束的回调
    endCallBack(prize) {
      console.log(prize);
      this.show = true;
      this.canStart = true;
      console.log("结束抽奖");
    },
    // 关闭获奖弹窗
    closePopup() {
      this.bingoDesc = "";
      this.bingoName = "";
      this.canStart = true;
      this.show = false;
      this.isBingo = false;
    },
    backup() {
      // // 模拟接口请求奖品列表
      // setTimeout(() => {
      //   const data = [
      //     { name: "10积分", desc: "参与奖" },
      //     { name: "500积分", desc: "一等奖" },
      //     { name: "100积分", desc: "三等奖" },
      //     { name: "50元油卡", desc: "一等奖" },
      //     { name: "食用油一桶（20kg）", desc: "二等奖哈哈哈" },
      //     { name: "300积分", desc: "二等奖" },
      //     { name: "100积分", desc: "三等奖" },
      //     { name: "10积分", desc: "参与奖" },
      //   ];
      //   const prizes = [];
      //   this.luckyNum = 100;
      //   let axis = [
      //     [0, 0],
      //     [1, 0],
      //     [2, 0],
      //     [2, 1],
      //     [2, 2],
      //     [1, 2],
      //     [0, 2],
      //     [0, 1],
      //   ];
      //   for (let i = 0; i < 8; i++) {
      //     let item = data[i];
      //     prizes.push({
      //       index: i,
      //       x: axis[i][0],
      //       y: axis[i][1],
      //       borderRadius: "30rpx",
      //       fonts: [
      //         { text: item.name.length > 4 ? item.name.substring(0, 4) + "..." : item.name, top: "16%", fontSize: "32rpx", fontWeight: "800", fontColor: "#CF311E" },
      //         { text: item.desc.length > 4 ? item.desc.substring(0, 4) + "..." : item.desc, top: "54%", fontSize: "24rpx", fontColor: "#F56616" },
      //       ],
      //     });
      //   }
      //   this.prizes = prizes;
      // }, 1200);
    },
  },
};
