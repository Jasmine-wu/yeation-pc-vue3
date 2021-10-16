<template>
  <!-- 首页内容 -->
  <div class="home-top">
    <!-- 上部分：-->
    <div class="container">
      <!-- 左侧分类导航 -->
      <home-category-menu />
      <!-- 右侧轮播图  -->
      <home-banner />
    </div>
  </div>
</template>
<script>
import HomeCategoryMenu from "./components/home-category-menu.vue";
import HomeBanner from "./components/home-banner.vue";

export default {
  name: "home",
  components: {
    HomeCategoryMenu,
    HomeBanner,
  },
};
</script>
