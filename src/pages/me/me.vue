<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
      <!-- uni 组件 -->
      <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
      <!-- uView 组件 -->
      <u-icon name="photo"></u-icon>
      <!-- iconfont 子图图标 -->
      <view class="icon iconfont icon-edit"></view>
    </view>
  </view>
</template>

<script src="./me.js"></script>

<style lang="scss" scoped>
@import "./me";
</style>
