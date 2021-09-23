<template>
  <div>
    <!-- 顶部导航通栏 -->
    <nav>
      <app-navbar-top></app-navbar-top>
    </nav>
    <!-- 头部导航栏 -->
    <header>
      <app-navbar-header></app-navbar-header>
    </header>
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
import AppNavbarTop from "@/components/app-navbar-top.vue";
import AppNavbarHeader from "@/components/app-navbar-header.vue";

export default {
  name: "Layout",
  components: {
    AppNavbarTop,
    AppNavbarHeader,
  },
};
</script>
