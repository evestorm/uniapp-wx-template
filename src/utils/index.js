import appConfig from "../config/index";

/**
 * ! ---------------------- 时间相关 ----------------------
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @description 格式化时间
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  }
  if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  }
  if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  }
  if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  }
  return d.getMonth() + 1 + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分";
}

/**
 * ! ---------------------- 数值相关 ----------------------
 */

/**
 * @description 数字超过规定大小加上加号“+”，如数字超过99显示99+
 * @param { number } val 输入的数字
 * @param { number } maxNum 数字规定界限
 */
export const outOfNum = (val, maxNum) => {
  val = val ? val - 0 : 0;
  if (val > maxNum) {
    return `${maxNum}+`;
  } else {
    return val;
  }
};

/**
 * ! ---------------------- 字符串相关 ----------------------
 */

/**
 * @description 返回utf8字符串的字节长度
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @description 创建唯一的字符串
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * @param {string} str 截取字符串并加省略号
 * @param {Number} length 截取长度
 * @returns str 被截取后的字符串
 */
export function subText(str, length = 10) {
  if (str.length === 0) return "";
  return str.length > length ? str.substr(0, length) + "..." : str;
}

/**
 * @description 金钱格式化，三位加逗号
 * @param { number } num
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * ! ---------------------- 数组相关 ----------------------
 */

/**
 * @description 清理数组
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @description 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @description 返回数组中的最大值
 * @param {Array} arr 数组
 * @returns 最大值
 */
export function arrayMax(arr) {
  return Math.max(...arr);
}

/**
 * @description 返回数组中的最小值
 * @param {Array} arr 数组
 * @returns 最小值
 */
export function arrayMin(arr) {
  return Math.min(...arr);
}

/**
 * ! ---------------------- url&参数相关 ----------------------
 */

/**
 * @description 根据url获取参数对象
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @description json转url参数
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }),
  ).join("&");
}

/**
 * @description url param 转对象
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach(v => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @description 返回一个包含当前 URL 所有参数的对象
 * @param {String} url URL
 * @example getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
 * @example getURLParameters('google.com'); // {}
 */
export function getURLParameters(url) {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a),
    {},
  );
}

/**
 * @description html转text
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * @description 获取当前界面和完整参数
 * @returns {string} url 返回url
 */
export function getCurrentPageUrl() {
  let pages = getCurrentPages(); // 获取加载的页面
  let currentPage = pages[pages.length - 1]; // 获取当前页面的对象
  let url = currentPage.route; // 当前页面url
  return url;
}

/**
 * @description 获取当前页带参数的url
 * @returns {string} url 返回当前页带参数的url
 */
export function getCurrentPageUrlAndArgs() {
  let pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  let url = currentPage.route; //当前页面url
  let options = currentPage.options || currentPage.$route.query; //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  let urlWithArgs = url + "?";

  for (let key in options) {
    let value = options[key];
    urlWithArgs += key + "=" + value + "&";
  }

  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
  return urlWithArgs;
}

/**
 * ! ---------------------- 对象相关 ----------------------
 */

/**
 * 合并两个对象，给出最后一个优先级
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * 这只是一个简单的版本的深拷贝
 * 有很多边界情况的bug
 * 如果你想用一个完美的深拷贝,使用 lodash 的 _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }

  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @description 判断目标是否为空对象
 * @param {Object} obj 目标对象
 */
export function isEmptyObject(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") return false;
  return Object.keys(obj).length === 0;
}

/**
 * ! ---------------------- 文件相关 ----------------------
 */

/**
 * @description 获取文件base64编码
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */
export function fileToBase64String(
  file,
  format = ["jpg", "jpeg", "png", "gif"],
  size = 20 * 1024 * 1024,
  formatMsg = "文件格式不正确",
  sizeMsg = "文件大小超出限制",
) {
  return new Promise((resolve, reject) => {
    // 格式过滤
    let suffix = file.type.split("/")[1].toLowerCase();
    let inFormat = false;
    for (let i = 0; i < format.length; i++) {
      if (suffix === format[i]) {
        inFormat = true;
        break;
      }
    }
    if (!inFormat) {
      reject(formatMsg);
    }
    // 大小过滤
    if (file.size > size) {
      reject(sizeMsg);
    }
    // 转base64字符串
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let res = fileReader.result;
      resolve({ base64String: res, suffix: suffix });
      reject("异常文件，请重新选择");
    };
  });
}

/**
 * @description 转换到KB,MB,GB并保留两位小数
 * @param { number } fileSize
 */
export function formatFileSize(fileSize) {
  let temp;
  if (fileSize < 1024) {
    return fileSize + "B";
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + "KB";
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + "MB";
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + "GB";
  }
}

/**
 * @description base64转file
 *  @param { base64 } base64
 *  @param { string } filename 转换后的文件名
 */
export const base64ToFile = (base64, filename) => {
  let arr = base64.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split("/")[1]; // 图片后缀
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
};

/**
 * @description base64转blob
 * @param { base64 } base64
 */
export const base64ToBlob = base64 => {
  let arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * @description blob转file
 * @param { blob } blob
 * @param { string } fileName
 */
export const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};

/**
 * @description file转base64
 * @param { * } file 图片文件
 */
export const fileToBase64 = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    return e.target.result;
  };
};

/**
 * ! ---------------------- 节流防抖相关 ----------------------
 */

/**
 * @description: 防抖函数：函数被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * @param {Function} fn 要执行的函数
 * @param {Number} delay  delay毫秒后执行回调
 */
export function debounce(fn, delay = 500) {
  let timer = null;
  return function () {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments);
      timer = null;
    }, delay);
  };
}

/**
 * @description: 节流函数：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行
 * @param {Function} fn 要执行的函数
 * @param {Number} gapTime  单位时间
 */
export function throttle(fn, gapTime = 500) {
  let canUse = true;
  return function () {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => (canUse = true), gapTime);
    }
  };
}

/**
 * ! ---------------------- 验证相关 ----------------------
 */

/**
 * @description 匹配电子邮件地址
 * @param {string} val 电子邮箱
 */
export function isEmailAddress(value) {
  return (
    /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) ||
    /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(value)
  );
}

/**
 * @description 验证邮政编码(中国)
 * @param {string} val 邮编
 */
export function isPostcode(value) {
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);
}

/**
 * @description 验证网址(支持端口和"?+参数"和"#+参数)
 * @param {string} value 网址
 */
export function isRightWebsite(value) {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(
    value,
  );
}

/**
 * @description 验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
 * @param {string} value 银行卡号
 */
export function isAccountNumber(value) {
  return /^[1-9]\d{9,29}$/g.test(value);
}

/**
 * @description 验证中文姓名
 * @param {string} value 中文名
 */
export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);

/**
 * @description 验证英文名
 * @param {string} value 英文名
 */
export const isEnglishName = value => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);

/**
 * @description 验证车牌号(新能源)
 * @param {string} value 新能源车牌号
 */
export const isLicensePlateNumberNER = value =>
  /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(
    value,
  );

/**
 * @description 验证车牌号(非新能源)
 * @param {string} value 车牌号
 */
export const isLicensePlateNumberNNER = value =>
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(
    value,
  );

/**
 * @description 验证车牌号(新能源+非新能源)
 * @param {string} value 车牌号
 */
export const isLicensePlateNumber = value =>
  /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
    value,
  );

/**
 * @description 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
 * @param {string} value 手机号
 */
export const isMPStrict = value =>
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(
    value,
  );

/**
 * @description 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * @param {string} value 手机号
 */
export const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);

/**
 * @description 验证邮箱
 * @param { string } value
 */
export const isEmail = value =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
    value,
  );

/**
 * @description 验证座机电话(国内),如: 0341-86091234
 * @param { string } value
 */
export const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);

/**
 * @description 验证身份证号(1代,15位数字)
 * @param { string } value
 */
export const isIDCardOld = value => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value);

/**
 * @description 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param { string } value
 */
export const isIDCardNew = value =>
  /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value);

/**
 * @description 验证身份证号, 支持1/2代(15位/18位数字)
 * @param { string } value
 */
export const isIDCard = value =>
  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    value,
  );

/**
 * @description 验证护照（包含香港、澳门）
 * @param { string } value
 */
export const isPassport = value =>
  /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(
    value,
  );

/**
 * @description 验证小数
 * @param { string } value
 */
export const isDecimal = value => /^\d+\.\d+$/g.test(value);

/**
 * @description 验证数字
 * @param { string } value
 */
export const isNumber = value => /^\d{1,}$/g.test(value);

/**
 * @description 验证数字和字母组成
 * @param { string } value
 */
export const isNumAndStr = value => /^[A-Za-z0-9]+$/g.test(value);

/**
 * @description 判断是否为数字且最多两位小数
 * @param str
 * @returns {boolean}
 */
export function isNum(str) {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
}

/**
 * ! ---------------------- 项目相关 ----------------------
 */

/**
 * @description 拼接上传的图片地址
 * @param {*} imgPath 文件地址
 * @returns 返回完整图片地址
 */
export function combImg(imgPath) {
  return appConfig.picURL + imgPath;
}

/**
 * @description 获取当前页面URL，并转到 auth 页面授权
 */
export function gotoAuth() {
  // 获取当前页面的URL和url完整路径
  let fullPath = getCurrentPageUrlAndArgs();

  let redirectUrl = "/" + fullPath;
  let url = `/pages/common/auth/auth?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  uni.redirectTo({
    url,
  });
}
