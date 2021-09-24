<template>
  <div>
    <!-- 顶部导航通栏 -->
    <nav>
      <app-top-toolbar></app-top-toolbar>
    </nav>
    <!-- 头部导航栏 -->
    <header>
      <app-header></app-header>
    </header>
    <!-- 内容容器 -->
    <div class="main">
      <!-- 挂载二级路由 -->
      <!-- app-heaer-nav路由跳转加载的view会挂载在这里 -->
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <footer>
      <app-footer></app-footer>
    </footer>
  </div>
</template>
<script>
import AppTopToolbar from "@/components/app-top-toolbar.vue";
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";
import { useStore } from "vuex";
export default {
  name: "Layout",
  components: {
    AppTopToolbar,
    AppHeader,
    AppFooter,
  },
  setup() {
    // 1.布局开始获取分类数据
    const store = useStore();
    store.dispatch("category/getCategoryList");
  },
};
</script>
