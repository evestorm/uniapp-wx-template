<template>
  <view v-if="appData.canIUseGetUserProfile()">
    <view class="header">
      <image :src="$utils.combImg('common/wx-logo.png')"></image>
    </view>

    <view class="content">
      <view>授权以进行登录</view>
    </view>

    <view class="btn-wrapper">
      <!-- <u-button v-show="showGetUserProfileBtn" type="success" open-type="getUserProfile" @click="getUserInfoTap">需要您的微信授权</u-button> -->
      <u-button
        v-show="showGetPhoneBtn"
        type="success"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumberTap"
        >一键登录</u-button
      >
      <u-button @click="navigateBack" class="go-back">暂不登录</u-button>
    </view>
  </view>

  <view v-else>请升级微信版本</view>
</template>

<script src="./auth.js"></script>

<style lang="scss" scoped>
@import "./auth";
</style>
