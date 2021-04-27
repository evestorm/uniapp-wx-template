<template>
  <view v-if="appData.canIUseGetUserProfile()">
    <view class="header">
      <image src="https://placekitten.com/100/100"></image>
    </view>

    <view class="content">
      <view>首次进入需要授权才能使用哦</view>
      <text>获得你的公开信息(昵称，头像，手机号等)</text>
    </view>

    <view class="btn-wrapper">
      <u-button
        v-show="showGetUserProfileBtn"
        type="success"
        open-type="getUserProfile"
        @click="getUserInfoTap"
        >授权登录</u-button
      >
      <!-- <u-button v-show="showGetPhoneBtn" type="success" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机</u-button> -->
      <u-button @click="navigateBack" class="go-back">暂不登录</u-button>
    </view>
  </view>

  <view v-else>请升级微信版本</view>
</template>

<script src="./auth.js"></script>

<style lang="scss" scoped>
@import "./auth";
</style>
