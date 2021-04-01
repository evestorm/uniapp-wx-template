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
    <!--    tabBar  -->
    <hx-tabbar :list="tabBar"></hx-tabbar>
  </view>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  computed: {
    ...mapState(["tabBar"]),
  },
  methods: {
    bindClick() {
      console.log(this.title, this.tabBar);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
