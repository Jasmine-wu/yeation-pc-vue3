<template>
  <!-- 首页内容 -->
  <!-- 上部分：左侧分类导航+右侧轮播图 -->
  <div class="home-top">
    <home-category-menu></home-category-menu>
  </div>
</template>
<script>
import HomeCategoryMenu from "./components/home-category-menu.vue";
export default {
  name: "home",
  components: {
    HomeCategoryMenu,
  },
};
</script>
