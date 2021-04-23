<template>
  <view class="home-wrapper">
    <!-- header -->
    <view class="header d-flex flex-nowrap j-sb a-center px-3 py-2">
      <view class="header-left d-flex j-start a-center">
        <!-- 头像 -->
        <image class="avatar mr-2" :src="userInfo.avatar" @click="gotoAuth" />
        <!-- 信息 -->
        <view class="info d-flex flex-column" @click="gotoProductsList">
          <view class="name-wrapper d-flex j-start a-center">
            <view class="name mr-2" @click.prevent="gotoUserPage">{{ userInfo.nickname ? userInfo.nickname : "去登录" }}</view>
            <view class="cert d-flex a-center"><image class="img mr-1" src="/static/images/已认证.png" mode="" />已认证</view>
          </view>
          <view class="phone">{{ userInfo.phone ? userInfo.phone : "" }}</view>
        </view>
      </view>
      <view class="header-right h-100 d-flex flex-column ml-auto j-sb">
        <view class="btn-wrapper a-self-end">
          <!-- 签到 -->
          <view class="btn-inner d-flex j-center a-center">
            <image class="img mr-1" src="/static/images/签到.png" mode="" />
            <text class="text">签到</text>
          </view>
        </view>
        <!-- 积分 -->
        <view class="score-wrapper d-flex j-center a-center">
          <text class="desc">可用积分：</text>
          <text class="score">188</text>
        </view>
      </view>
    </view>
    <!-- banner -->
    <view class="banner-wrapper pt-3 px-3">
      <u-swiper :list="bannerList" name="img" border-radius="16"></u-swiper>
    </view>
    <!-- menu -->
    <view class="menu-wrapper d-flex j-sa a-center p-2">
      <view class="item d-flex flex-column a-center j-center" v-for="(menu, idx) in menuList" :key="idx">
        <image class="img" :src="menu.src" mode="" />
        <view class="name">{{ menu.name }}</view>
      </view>
    </view>
    <!-- notice -->
    <view class="notice-wrapper">
      <u-notice-bar
        mode="horizontal"
        :list="noticeList"
        :border-radius="40"
        padding="5rpx 15rpx"
        bg-color="#F1F1F1"
        color="#555555"
        :is-circular="false"
        speed="1500"
      ></u-notice-bar>
    </view>
    <!-- recommend -->
    <view class="recommend-wrapper py-2 mx-3">
      <!-- title -->
      <view class="title">推荐商品</view>
      <!-- list -->
      <view class="list">
        <view class="card d-flex j-sb a-center my-2" v-for="(item, idx) in cardList" :key="idx">
          <view class="info mr-3">
            <u-image class="img" width="270rpx" height="180rpx" :src="item.img" border-radius="10rpx"></u-image>
          </view>
          <view class="detail d-flex j-sb flex-column flex-1">
            <view class="title">{{ item.title }}</view>
            <view class="rest">剩余：{{ item.rest }}</view>
            <view class="bottom d-flex j-sb a-end">
              <view class="new-score">{{ item.newScore }}<span>积分</span></view>
              <view class="old-score">¥{{ item.oldScore }}</view>
              <view class="btn d-flex j-center a-center">立即兑换</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script src="./home.js"></script>

<style lang="scss" scoped>
@import "./home";
</style>
