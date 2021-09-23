<template>
  <div>
    <!-- 顶部导航通栏 -->
    <nav>
      <navbar-top></navbar-top>
    </nav>
    <!-- 头部 -->
    <header></header>
    <!-- 内容容器 -->
    <div class="main">
      <!-- 挂载二级路由 -->
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <footer></footer>
  </div>
</template>
<script>
import NavbarTop from "@/components/navbar-top.vue";
export default {
  name: "Layout",
  components: {
    NavbarTop,
  },
};
</script>
