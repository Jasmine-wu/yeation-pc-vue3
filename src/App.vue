<template>
  <!-- 挂载以及路由 -->
  <router-view></router-view>
  <div class="containner">appxxxxxx</div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="less" scoped>
.containner {
  .hoverShadow();
  color: @xtxColor;
}
</style>
