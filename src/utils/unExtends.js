// 对于需要登录才可以进入的页面，先做一下登录校验，如果未登录，则跳转前先跳转至登录页面。
import store from "@/store";

// 对路由相关的几个方法进行遍历并缓存原方法，
// 在uni对象上重写方法，每个方法增加needAuth参数，表示跳转前是否需要登录
// 如果需要登录，则首先获取用户信息，
// 如果获取不到用户信息，将会自动跳转到登录页（store里面的user模块做的），
// 否则获取到信息就调用缓存起来的原方法，实现跳转 如果不需要登录，则直接调用原方法
export default function () {
  ["navigateTo", "redirectTo", "switchTab", "navigateBack"].map(item => {
    const nativeFunc = uni[item];
    uni[item] = function (opts, needAuth) {
      if (needAuth) {
        store.dispatch("user/getToken").then(() => {
          nativeFunc.call(this, opts);
        });
      } else {
        return nativeFunc.call(this, opts);
      }
    };
  });
}
