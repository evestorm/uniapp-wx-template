import Vue from "vue";
import App from "./App";
import MinCache from "@/utils/unistorage/MinCache";
import storage from "@/utils/unistorage/index";
import enums from "./utils/enum/index";
import config from "@/config/index";
import * as utils from "@/utils/index";
import MniRequest from "@/utils/MinRequest";
import interactiveFeedback from "@/utils/interactiveFeedback";
import uniExtend from "@/utils/unExtends";
import MescrollBody from "mescroll-uni/mescroll-body.vue";
import hxNavbar from "@/components/hx-navbar/hx-navbar";

// vuex
import store from "@/store";

Vue.config.productionTip = false;

App.mpType = "app";

// main.js
import uView from "uview-ui";
Vue.use(uView);

// 挂载 store 到 Vue
Vue.prototype.$store = store;
// 注册缓存器
Vue.use(MinCache);
// 注册请求
Vue.use(MniRequest);
// 注册 交互反馈
Vue.use(interactiveFeedback);

// 使用 mescroll 组件
Vue.component("mescroll-body", MescrollBody);

// 全局导航栏组件
Vue.component("hx-navbar", hxNavbar);

// uni拓展
uniExtend();

// 扩展vue原型属性
prototypeEx(Vue);

const app = new Vue({
  ...App,
  store,
});
app.$mount();

// 扩展Vue原型
function prototypeEx(Vue) {
  // vue prototype 扩展
  Vue.prototype.$storage = storage; // 用于存储
  Vue.prototype.$utils = utils; // 工具类
  Vue.prototype.$config = config; // baseURL配置
  Vue.prototype.$enums = enums; // 枚举工具类
}
