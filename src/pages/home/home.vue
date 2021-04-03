<template>
  <view class="home-wrapper">
    <!-- 头部 -->
    <view class="header d-flex flex-nowrap j-sb a-center px-3 py-2">
      <view class="header-left d-flex j-start a-center">
        <image class="avatar mr-2" src="https://placekitten.com/200/200" />
        <view class="info d-flex flex-column">
          <view class="name-wrapper d-flex j-start a-center">
            <view class="name mr-2">张三三</view>
            <view class="cert d-flex a-center"><image class="img mr-1" src="/static/images/已认证.png" mode="" />已认证</view>
          </view>
          <view class="phone">13456789101</view>
        </view>
      </view>
      <view class="header-right h-100 d-flex flex-column ml-auto j-sb">
        <view class="btn-wrapper a-self-end">
          <view class="btn-inner d-flex j-center a-center">
            <image class="img mr-1" src="/static/images/签到.png" mode="" />
            <text class="text">签到</text>
          </view>
        </view>
        <view class="score-wrapper d-flex j-center a-center">
          <text class="desc">可用积分：</text>
          <text class="score">188</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script src="./home.js"></script>

<style lang="scss" scoped>
@import "./home";
</style>
