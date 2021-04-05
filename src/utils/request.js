import MinRequest from "./MinRequest";
import appConfig from "@/config/index";

let REQUEST_API_COUNT = 0; // 请求的api接口数量 当为0的时候那么才隐藏 toast

const minRequest = new MinRequest();

// 请求拦截器
minRequest.interceptors.request(config => {
  REQUEST_API_COUNT++;
  uni.showLoading({
    title: "处理中...",
    mask: true,
  });
  return config;
});

// 响应拦截器
minRequest.interceptors.response(response => {
  // 不管请求成功还是失败都拦截
  REQUEST_API_COUNT--; // 非静默加载那么需要把请求数加一
  if (REQUEST_API_COUNT === 0) {
    uni.hideLoading();
  }
  return response.data;
});

// 设置默认配置
minRequest.setConfig(config => {
  config.baseURL = appConfig.baseURL;
  return config;
});

export default minRequest;
