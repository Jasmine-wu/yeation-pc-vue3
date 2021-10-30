<template>
  <!-- 人气推荐组件 -->
  <home-pannel title="热门品牌" subTitle="国际经典 品质保障">
    <!-- header-right插槽 -->
    <template #header-right>
      <div class="header-right">
        <a
          href="javascript:;"
          @click="preClickFn"
          :class="{ selected: currentIndex === 0 }"
        >
          <i class="iconfont icon-angle-left prev"></i>
        </a>
        <a
          href="javascript:;"
          @click="nextClickFn"
          :class="{ selected: currentIndex === 1 }"
        >
          <i class="iconfont icon-angle-right next"></i>
        </a>
      </div>
    </template>
    <!-- 面板内容:默认插槽 -->
    <div ref="target" style="position: relative; height: 305px" class="box">
      <ul
        v-if="brands.length"
        class="brand-list"
        :style="{ transform: `translateX(${-currentIndex * 1240}px)` }"
      >
        <li v-for="brand in brands" :key="brand.id">
          <img :src="brand.picture" alt="" />
        </li>
      </ul>
      <!-- 面板骨架屏效果 -->
      <home-skeleton v-else />
    </div>
  </home-pannel>
</template>

<script>
import { ref } from "vue";
import { findBrand } from "@/api/home";
import { lazyLoadData } from "@/hooks";
import HomePannel from "./home-pannel.vue";
import HomeSkeleton from "./home-skeleton.vue";

export default {
  name: "HomeBrand",
  components: { HomePannel, HomeSkeleton },
  setup() {
    const goods = ref([]);
    // 数据懒加载
    // const { target, result } = lazyLoadData(findBrand(10));
    // 传入的参数是函数，且这个参数函数也要传参，怎么做？
    const { target, result } = lazyLoadData(() => findBrand(10));

    // 点击上一页/下一页
    const currentIndex = ref(0);

    const preClickFn = () => {
      if (currentIndex.value >= 1) {
        currentIndex.value--;
      }
    };

    const nextClickFn = () => {
      if (currentIndex.value < 1) {
        currentIndex.value++;
      }
    };

    return { brands: result, target, currentIndex, preClickFn, nextClickFn };
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  // 隐藏多出的部分
  overflow: hidden;

  .brand-list {
    display: flex;
    width: 200%;
    height: 305px;
    // translateX的过渡动画
    transition: all 0.8s;

    li {
      // 阴影动画
      .hoverShadow();
      margin-right: 10px;

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.header-right {
  a {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    background-color: @xtxColor;

    text-align: center;
    line-height: 20px;

    i {
      color: #fff;
      font-size: 13px;
    }
  }
  .selected {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>