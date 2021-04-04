import Vue from "vue";
import App from "./App";
import MinCache from "./utils/unistorage/MinCache";
import storage from "./utils/unistorage/index";
import MniRequest from "./utils/MinRequest";

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
}
