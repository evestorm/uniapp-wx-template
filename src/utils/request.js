import MinRequest from "./MinRequest";
import appConfig from "@/config/index";
import store from "@/store";
import interactiveFeedback from "@/utils/interactiveFeedback";
import storage from "@/utils/unistorage/index";
import * as utils from "@/utils/index";

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
  config.header["token"] = `${storage.getToken()}` ? `${storage.getToken()}` : "";
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

  // const httpStatus = Number(response.statusCode); // http状态码
  // const resCode = Number(response.data.resCode || response.data.code); // 服务器自定义返回码
  // const msg = response.data.msg; // 消息
  const rootRes = response.data; // 后端返回的真正response
  const httpStatusCode = Number(response.statusCode); // http状态码
  const customCode = Number(response.data.resCode || response.data.code); // 服务器自定义返回码
  const msg = rootRes.msg; // 消息
  let data = rootRes.data; // 真正的数据

  if (httpStatusCode !== 200) {
    if (httpStatusCode >= 400 && httpStatusCode < 500) {
      interactiveFeedback.showToast("error", "网络错误");
    } else {
      interactiveFeedback.showToast("error", "服务器错误");
    }
    return Promise.resolve([rootRes, null]);
  }

  // if (resCode !== 20000) {
  //   interactiveFeedback.showToast("error", msg);
  // }
  if (customCode !== 0) {
    if (customCode === 40002) {
      // 重新登录
      interactiveFeedback.showToast("", "授权失效，授权后继续", 1000);
      setTimeout(() => {
        utils.gotoAuth();
      }, 1000);
      return Promise.resolve([msg || "出错了", null]);
    } else if (customCode === 200) {
      return Promise.resolve(null, data);
    }
    interactiveFeedback.showToast("error", msg);
    return Promise.resolve([msg || "出错了", null]);
  }

  if (data) {
    data = utils.null2str(data);
  }

  return Promise.resolve([null, rootRes]);
});

// 设置默认配置
minRequest.setConfig(config => {
  config.baseURL = appConfig.baseURL;
  return config;
});

export default minRequest;
