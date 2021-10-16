
<template>
  <!-- 按照该项目首页轮播图需求重写ytn-swiper基础轮播图 -->
  <div class="home-banner">
    <ytn-swiper :data="imgs" autoPlay></ytn-swiper>
  </div>
</template>
<script>
import { findBanner } from "@/api/home";
import { ref } from "vue";
export default {
  name: "HomeBanner",
  setup() {
    // 1.定义响应式图片数组
    const imgs = ref([]);
    findBanner().then((data) => {
      imgs.value = data.result;
    });

    return { imgs };
  },
};
</script>
<style lang="less" scoped>
// 设置首页轮播图宽高/位置
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 97;

  // 重写下一个/下一页位置
  // 深度操作符vue3写法
  ::v-deep(.swiper-btn) {
    &.pre {
      left: 272px;
    }
  }
  ::v-deep(.swiper-indicator) {
    transform: translateX(-50%+125px);
  }
}
</style>