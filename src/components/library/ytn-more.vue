<template>
  <!-- 查看更多组件 -->
  <router-link class="ytn-more" :to="path">
    <span class="more">查看更多</span>
    <span>
      <i class="iconfont icon-angle-right" />
    </span>
  </router-link>
</template>
<script>
export default {
  name: "YtnMore",
  props: {
    path: {
      type: String,
      default: "/",
    },
  },
};
</script>
<style lang="less" scoped>
.ytn-more {
  .more {
    font-size: 16px;
    color: #999;
  }
  i {
    font-size: 14px;
  }
  &:hover {
    .more,
    i {
      color: @xtxColor;
    }
  }
}
</style>