<template>
  <!-- 首页内容 -->
  <div class="home-top">
    <!-- 上部分：-->
    <div class="container">
      <!-- 左侧分类导航 -->
      <home-category-menu />
      <!-- 右侧轮播图  -->
      <home-banner />
      <!-- 新鲜好物 -->

      <home-new />
      <!-- 人气推荐 -->
      <home-hot />
      <!-- 首页面板骨架效果 -->

      <!-- <home-skeleton /> -->
    </div>
  </div>
</template>
<script>
import HomeCategoryMenu from "./components/home-category-menu.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import HomeSkeleton from "./components/home-skeleton.vue";

export default {
  name: "home",
  components: {
    HomeCategoryMenu,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeSkeleton,
  },
};
</script>

