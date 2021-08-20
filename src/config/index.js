import appConfigDev from "@/config/config.dev.js";
import appConfigTest from "@/config/config.test.js";
import appConfigProd from "@/config/config.prod.js";

let appConfig = {
  // 图片上传地址
  picURL: "https://pic.cwyyt.cn",
  appid: "wxe0c5639c8139419d",
  appSecret: "xxx", // 微信公众平台生成
};

if (process.env.VUE_APP_ENV === "production") {
  appConfig = Object.assign(appConfig, appConfigProd);
} else if (process.env.VUE_APP_ENV === "test") {
  appConfig = Object.assign(appConfig, appConfigTest);
} else {
  appConfig = Object.assign(appConfig, appConfigDev);
}

export default appConfig;
