<template>
  <view class="lottery">
    <!-- 导航栏 -->
    <hx-navbar ref="hxnb" class="hxnb" :config="config"> </hx-navbar>
    <!-- 主体 -->
    <view
      class="container"
      :style="{ paddingTop, height: show ? `${ignoreNavbarHeight};overflow: hidden;` : '' }"
    >
      <!-- 抽奖九宫格 -->
      <view class="lucky-box d-flex j-center a-center">
        <LuckyGrid
          ref="LuckDraw"
          class="pl-3 pt-5 luck-draw"
          width="520rpx"
          height="410rpx"
          rows="3"
          cols="3"
          :blocks="blocks"
          :prizes="prizes"
          :default-style="defaultStyle"
          :default-config="defaultConfig"
          :active-style="activeStyle"
          :buttons="buttons"
          @start="startCallBack"
          @end="endCallBack"
        />
      </view>
      <!-- 规则 -->
      <view class="rules-wrapper mx-3 mt-5 px-3 pt-3 pb-5">
        <view class="header d-flex a-center j-center mb-2">
          <view class="title">活动规则</view>
        </view>
        <view class="rules-list">
          <view class="rule-item" v-for="(rule, idx) in activityRules" :key="idx">
            <view class="rule-title chat-bubble">
              {{ rule.name }}
              <view class="chat-bubble-arrow-border"></view>
              <view class="chat-bubble-arrow"></view>
            </view>
            <view class="rule-content">
              <u-parse :html="rule.content"></u-parse>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 获奖弹窗，使用 cover-view 防止canvas遮盖弹窗 -->
    <cover-view
      class="popup d-flex j-center a-center"
      v-if="show"
      :style="{ height: ignoreNavbarHeight }"
    >
      <cover-view class="inner">
        <!-- 背景 -->
        <cover-image
          class="img"
          :src="
            isBingo
              ? `${$utils.combImg('home/popup-winning.png')}`
              : `${$utils.combImg('home/popup-not-winning.png')}`
          "
        ></cover-image>
        <!-- 中奖 -->
        <cover-view class="winning" v-if="isBingo">
          <cover-view class="item1">{{ bingoDesc }}</cover-view>
          <cover-view class="item2 mt-2">{{ bingoName }}</cover-view>
          <button class="item-btn my-4" @click="closePopup">收下</button>
        </cover-view>
        <!-- 未中奖 -->
        <cover-view class="not-winning" v-if="!isBingo">
          <cover-view class="item1">很遗憾，您未中奖</cover-view>
          <cover-view class="item2">再接再厉!</cover-view>
        </cover-view>
        <!-- 关闭 -->
        <cover-view class="close-btn" @click="closePopup">
          <cover-image
            class="btn"
            :src="$utils.combImg('workbench/dialog_close.png')"
          ></cover-image>
        </cover-view>
      </cover-view>
    </cover-view>
    <!-- 警告 -->
    <u-toast ref="uToast" />
  </view>
</template>

<script src="./lottery.js"></script>

<style lang="scss" scoped>
@import "./lottery.scss";
</style>
