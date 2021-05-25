import MinRequest from "./MinRequest";
import appConfig from "@/config/index";
import store from "@/store";
import interactiveFeedback from "@/utils/interactiveFeedback";
import storage from "@/utils/unistorage/index";

let REQUEST_API_COUNT = 0; // 请求的api接口数量 当为0的时候那么才隐藏 toast

const minRequest = new MinRequest();

// 请求拦截器
minRequest.interceptors.request(config => {
  if (config.isShowLoading) {
    REQUEST_API_COUNT++;
    uni.showLoading({
      title: "处理中...",
      mask: true,
    });
  }

  // 在发送请求之前做的事情
  // 如果 Vuex 中有token
  if (store.getters.token) {
    // 让当前请求携带token令牌
    config.header["Authorization"] = `Bearer ${storage.getToken()}`;
  } else {
    config.header["Authorization"] = "";
  }
  return config;
});

// 响应拦截器
minRequest.interceptors.response((response, config) => {
  // 不管请求成功还是失败都拦截
  if (config.isShowLoading) {
    REQUEST_API_COUNT--; // 非静默加载那么需要把请求数加一
  }

  if (config.isShowLoading && REQUEST_API_COUNT === 0) {
    uni.hideLoading();
  }

  const httpStatus = Number(response.statusCode); // http状态码
  // const resCode = Number(response.data.resCode || response.data.code); // 服务器自定义返回码
  // const msg = response.data.msg; // 消息

  if (httpStatus !== 200) {
    if (httpStatus >= 400 && httpStatus < 500) {
      interactiveFeedback.showToast("error", "网络错误");
    } else {
      interactiveFeedback.showToast("error", "服务器错误");
    }
    return Promise.resolve([response, null]);
  }

  // if (resCode !== 20000) {
  //   interactiveFeedback.showToast("error", msg);
  // }

  return [null, response.data];
});

// 设置默认配置
minRequest.setConfig(config => {
  config.baseURL = appConfig.baseURL;
  return config;
});

export default minRequest;
