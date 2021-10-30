<template>
  <!-- 首页面板封装 -->
  <div class="container">
    <div class="header">
      <div class="header-left">
        <h3 class="title">{{ title }}</h3>
        <span class="subTitle">{{ subTitle }}</span>
      </div>
      <!-- 头部右侧插槽 -->
      <slot name="header-right" />
    </div>

    <!-- 主体默认插槽 -->
    <slot />
  </div>
</template>
<script>
export default {
  name: "HomePannel",
  props: {
    title: {
      type: String,
      defalut: "",
    },
    subTitle: {
      type: String,
      defalut: "",
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &-left {
    display: flex;
    align-items: flex-end;

    .title {
      font-size: 32px;
    }
    .subTitle {
      margin-left: 10px;
      font-size: 16px;
      padding: 4px 0;
      color: #999;
    }
  }
}
</style>