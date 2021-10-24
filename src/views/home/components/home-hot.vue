<template>
  <!-- 人气推荐组件 -->
  <home-pannel title="人气推荐" subTitle="人气爆款 不容错过">
    <!-- 面板内容:默认插槽 -->
    <div ref="target" style="position: relative; height: 406px">
      <ul v-if="goods.length" class="goods-list">
        <li v-for="good in goods" :key="good.id">
          <img :src="good.picture" alt="" />
          <h2 class="name">{{ good.title }}</h2>
          <h2 class="desc">{{ good.alt }}</h2>
        </li>
      </ul>
      <!-- 面板骨架屏效果 -->
      <home-skeleton v-else />
    </div>
  </home-pannel>
</template>

<script>
import { ref } from "vue";
import { findHot } from "@/api/home";
import { lazyLoadData } from "@/hooks";
import HomePannel from "./home-pannel.vue";
import HomeSkeleton from "./home-skeleton.vue";

export default {
  name: "HomeHot",
  components: { HomePannel, HomeSkeleton },
  setup() {
    const goods = ref([]);
    const { target, result } = lazyLoadData(findHot);
    return { goods: result, target };
  },
};
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  height: 406px;
  justify-content: space-between;
  li {
    // 阴影动画
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    .name {
      width: 306px;
      font-size: 22px;

      text-align: center;
    }
    .desc {
      font-size: 18px;
      text-align: center;
      color: #999;
    }
  }
}
</style>