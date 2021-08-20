/**
 * ! ---------------------- 交互相关 ----------------------
 */

/**
 * @description 自定义toast
 * @param {string} types 类型
 * @param {string} msg 消息
 * @param {number} duration 时间
 * @example this.$showToast("这是一个吐司提示")
 */
function showToast(types = "success", msg = "", duration = 1000, mask = false) {
  let img = "";
  if (types === "success") {
    // 成功
    img = "/static/totast/round_check.png";
  } else if (types === "error") {
    // 失败
    img = "/static/totast/round_close.png";
  } else if (types === "warning") {
    // 警告
    img = "/static/totast/round_info.png";
  } else {
    img = "";
  }
  uni.showToast({
    title: msg,
    icon: "none",
    duration: duration,
    image: img || "",
    mask,
  });
}

/**
 * @description 显示modal弹窗
 * @param {string} content 内容
 * @param {object} opts 可选项配置
 * @returns {promise} promise
 * @example this.$modal("这里是弹窗的提醒内容", {
              confirmText: "我知道了",
              handleCancel: true
            }).then(() => {
              console.log("确定了")
            }).catch(() => {
              console.log('取消了')
            })
 */
function showModal(content = "", opts = { showCancel: true }) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: opts.title || "提示",
      content: content,
      cancelText: (opts.cancelText || "取消").slice(0, 4),
      confirmText: (opts.confirmText || "确定").slice(0, 4),
      cancelColor: opts.cancelColor || "#bebebe",
      confirmColor: opts.confirmColor || "#317ee7",
      showCancel: opts.showCancel !== false,
      success: res => {
        if (res.confirm) {
          resolve();
        } else if (res.cancel) {
          opts.handleCancel === true && reject();
        }
      },
    });
  });
}

/**
 * @description 弹出小程序需要申请权限的modal
 */
export function showGetAuthModal() {
  // 消息提示弹框，引导用户开启授权
  uni.showModal({
    title: "小程序申请获得以下权限",
    content: "获得你的公开信息（昵称、头像、地区及性别）",
    success(res) {
      if (res.confirm) {
        uni.openSetting({
          // 打开设置页
          success(res) {
            console.log(res.authSetting);
            if (!res.authSetting["scope.userInfo"]) {
              // 用户授权失败
              showGetAuthModal();
            }
          },
        });
      } else if (res.cancel) {
        showGetAuthModal();
      }
    },
  });
}

function install(Vue) {
  Vue.prototype.$toast = showToast;
  Vue.prototype.$modal = showModal;
}

export default { install, showToast, showGetAuthModal };
