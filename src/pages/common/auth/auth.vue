<template>
  <view v-if="appData.canIUseGetUserProfile()">
    <view class="header">
      <image src="https://placekitten.com/100/100"></image>
    </view>

    <view class="content">
      <view>申请获取以下权限</view>
      <text>获得你的公开信息(昵称，头像等)</text>
    </view>

    <view class="btn-wrapper">
      <u-button v-show="showGetUserProfileBtn" type="success" open-type="getUserProfile" @click="authUserProfile">授权登录</u-button>
      <u-button v-show="showGetPhoneBtn" type="success" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机</u-button>
    </view>
  </view>

  <view v-else>请升级微信版本</view>
</template>

<script src="./auth.js"></script>

<style lang="scss" scoped>
@import "./auth";
</style>
