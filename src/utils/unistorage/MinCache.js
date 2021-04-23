let cacheMap = new Map();
let timeoutDefault = 0;

/**
 * @description 是否超时
 * @param {string} name storage name
 * @returns {boolean} 是否超时
 */
function isTimeout(name) {
  const data = cacheMap.get(name);
  if (!data) return true;
  if (data.timeout === 0) return false;
  const currentTime = Date.now();
  const overTime = (currentTime - data.createTime) / 1000;
  if (overTime > data.timeout) {
    cacheMap.delete(name);
    if (name.startsWith("HX.")) {
      try {
        uni.removeStorageSync(name);
      } catch (e) {
        console.log(e);
      }
    }
    return true;
  }
  return false;
}

/**
 * @description cache对象
 */
class CacheCell {
  constructor(data, timeout) {
    this.data = data;
    this.timeout = timeout;
    this.createTime = Date.now();
  }
}

/**
 * @description Cache Class
 */
class MinCache {
  constructor(timeout) {
    try {
      const res = uni.getStorageInfoSync();
      res.keys.forEach(name => {
        try {
          const value = uni.getStorageSync(name);
          cacheMap.set(name, value);
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
    timeoutDefault = timeout;
  }
  set(name, data, timeout = timeoutDefault) {
    const cacheCell = new CacheCell(data, timeout);
    let cache = null;
    if (name.startsWith("HX.")) {
      try {
        uni.setStorageSync(name, cacheCell);
        cache = cacheMap.set(name, cacheCell);
      } catch (e) {
        console.log(e);
      }
    } else {
      cache = cacheMap.set(name, cacheCell);
    }
    return cache;
  }
  get(name) {
    return isTimeout(name) ? null : cacheMap.get(name).data;
  }
  remove(name) {
    let value = false;
    if (name.startsWith("HX.")) {
      try {
        uni.removeStorageSync(name);
        value = cacheMap.delete(name);
      } catch (e) {
        console.log(e);
      }
    } else {
      value = cacheMap.delete(name);
    }
    return value;
  }
  has(name) {
    return !isTimeout(name);
  }
  clear() {
    let value = false;
    try {
      uni.clearStorageSync();
      cacheMap.clear();
      value = true;
    } catch (e) {
      console.log(e);
    }
    return value;
  }
}

MinCache.install = function (Vue, { timeout = 0 } = {}) {
  Vue.prototype.$cache = new MinCache(timeout);
};

export default MinCache;
