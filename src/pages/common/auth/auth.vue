<template>
  <view>
    <view>登录授权页</view>
    <!-- 新的 wx.getUserProfile 接口：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html -->
    <button v-if="appData.canIUseGetUserProfile() && getNeedAuth" open-type="getUserProfile" @click="authUserInfo">请登录</button>
    <!-- getUserInfo 在 2021.4.13 以后，获取到的 nickName 始终为 “微信用户”，avatarUrl 也始终为 灰色头像，即需要的用户信息都是匿名的了 -->
    <button v-else-if="appData.canIUseGetUserInfo() && getNeedAuth" open-type="getUserInfo" @getuserinfo="authUserInfo">登录授权</button>
    <!-- 以上两个皆不可的，提示升级微信 -->
    <view v-else>请升级微信版本</view>
  </view>
</template>

<script src="./auth.js"></script>

<style lang="scss" scoped>
@import "./auth";
</style>
