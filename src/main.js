import Vue from "vue";
import App from "./App";

// vuex
import store from "@/store";

Vue.config.productionTip = false;

App.mpType = "app";

// main.js
import uView from "uview-ui";
Vue.use(uView);

// 挂载 store 到 Vue
Vue.prototype.$store = store;

const app = new Vue({
  ...App,
  store,
});
app.$mount();
