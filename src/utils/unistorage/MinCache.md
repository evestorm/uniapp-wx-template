# MinCache 使用文档

在 Vue 实例中：

```js
// 'name'不是以下划线开头的表示会缓存到Map中，在程序生命周期内有并且在有效时间内有效
// 默认有效期是0，即表示name程序生命周期内永久缓存
this.$cache.set("name", "MinCache");

// 默认有效期是0，即表示HX.name存storage中永久缓存
// 永久存储的storage被清除的情况：
// 1. 储存空间不足，会清空最近最久未使用的小程序的本地缓存
// 2. 用户移除小程序：微信中的「发现」-「小程序」，长按不想要的小程序，然后点击「删除」按钮，这样删除才能彻底清理掉缓存删掉小程序。直接在页面顶部移除小程序，缓存没被清理掉。
// 3. 卸载、删除微信数据
// 4. 调用wx.removeStorageSync / wx.removeStorage / wx.clearStorageSync / wx.clearStorage
this.$cache.set("HX.name", "MinCache");
```

```js
// 过期时间设置为大于0表示会过期
// 注意：'test'并不是以下划线命名表示在程序生命周期的有效时间内120s有效
this.$cache.set("test", "testdemo", 120);
```

```js
// 注意：'_imgURL'是以下划线命名表示缓存到Storage，但如果加上缓存时间，缓存时间过期还是会被移除
this.$cache.set("_imgURL", data, 1200);
```
