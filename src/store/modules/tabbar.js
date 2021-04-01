export const state = {
  //tabBar
  tabBar: [
    {
      iconPath: "/static/tabbar/home.png",
      selectedIconPath: "/static/tabbar/home_sel.png",
      text: "首页",
      count: 0,
      isDot: false,
      pagePath: "/pages/home/home",
    },
    {
      iconPath: "/static/tabbar/me.png",
      selectedIconPath: "/static/tabbar/me_sel.png",
      text: "我的",
      count: 0,
      isDot: false,
      pagePath: "/pages/index/index",
    },
    // {
    //   // iconfont 形式
    //   iconPath: "account",
    //   selectedIconPath: "account-fill",
    //   text: "我的",
    //   count: 0,
    //   isDot: false,
    //   pagePath: "/pages/user/index",
    // },
  ],
};
export const mutations = {};
export const actions = {};
