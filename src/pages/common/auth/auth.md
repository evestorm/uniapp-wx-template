# 小程序登录

[小程序登录、用户信息相关接口调整说明](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801)

1. 2021 年 2 月 23 日起，若小程序已在微信开放平台进行绑定，则通过 wx.login 接口获取的登录凭证可直接换取 unionID
2. 2021 年 4 月 13 日后发布的小程序新版本，无法通过 wx.getUserInfo 与<button open-type="getUserInfo"/>获取用户个人信息（头像、昵称、性别与地区），将直接获取匿名数据（包括 userInfo 与 encryptedData 中的用户个人信息），获取加密后的 openID 与 unionID 数据的能力不做调整。此前发布的小程序版本不受影响，但如果要进行版本更新则需要进行适配。
3. 新增 getUserProfile 接口（基础库 2.10.4 版本开始支持），可获取用户头像、昵称、性别及地区信息，开发者每次通过该接口获取用户个人信息均需用户确认。具体接口文档：[《getUserProfile 接口文档》](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html)
4. 由于 getUserProfile 接口从 2.10.4 版本基础库开始支持（覆盖微信 7.0.9 以上版本），考虑到开发者在低版本中有获取用户头像昵称的诉求，对于未支持 getUserProfile 的情况下，开发者可继续使用 getUserInfo 能力。开发者可参考[getUserProfile 接口文档中的示例代码](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html#示例代码)进行适配。

接口变更说明：[UserInfo 和 getUserProfile 对比](https://developers.weixin.qq.com/community/develop/article/doc/00040885c386f81e96cbf93cf51013)
