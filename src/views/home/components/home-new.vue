<template>
  <!-- 新鲜好物组件 -->
  <home-pannel title="新鲜好物" subTitle="新鲜出炉 品质好货">
    <!-- 2.6之后的新语法v-slot:header-right，简写：#header-right -->
    <!-- slot属性的写法在2.6以后废弃了 -->
    <template #header-right>
      <ytn-more></ytn-more>
    </template>

    <!-- 元素具名过渡动画 -->
    <div ref="target" style="position: relative; height: 406px">
      <transition name="fade">
        <!-- 面板内容:默认插槽 -->
        <ul v-if="goods && goods.length" class="goods-list">
          <li v-for="good in goods" :key="good.id">
            <router-link to="/">
              <img :src="good.picture" alt="" />
              <!-- 一行省略ellipsis -->
              <h2 class="name ellipsis">{{ good.name }}</h2>
              <h2 class="price">¥{{ good.price }}</h2>
            </router-link>
          </li>
        </ul>

        <!-- 面板骨架屏效果组件 -->
        <home-skeleton v-else bg="#f0f9f4" />
      </transition>
    </div>
  </home-pannel>
</template>

<script>
import { ref } from "vue";
import { findNew } from "@/api/home";
import { lazyLoadData } from "@/hooks";
import HomeSkeleton from "./home-skeleton.vue";
import HomePannel from "./home-pannel.vue";

export default {
  name: "HomeNew",
  components: {
    HomePannel,
    HomeSkeleton,
  },
  setup() {
    const goods = ref([]);
    const { target, result } = lazyLoadData(findNew);
    return { goods: result, target };
  },
};
</script>

<style lang="less" scoped>
::v-deep(.ytn-more) {
  .more {
    font-size: 14px;
    padding: 5px 0;
    color: #999;
  }
}
.goods-list {
  display: flex;
  height: 406px;
  justify-content: space-between;
  li {
    // 阴影动画
    .hoverShadow();
    background: #f0f9f4;
    img {
      width: 306px;
      height: 306px;
    }
    .name {
      width: 306px;
      padding: 0 30px 0;
      font-size: 22px;
    }
    .price {
      font-size: 22px;
      text-align: center;
      color: @priceColor;
    }
  }
}
</style>

