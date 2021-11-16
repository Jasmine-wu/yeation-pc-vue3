
<template>
  <!-- 产品组件 -->
  <div class="home-product" ref="target">
    <home-pannel
      :title="product.name"
      v-for="product in products"
      :key="product.id"
    >
      <!-- 头部 -->
      <template #header-right>
        <div class="header-right">
          <div class="subProduct">
            <a
              class="item"
              href="javascript:;"
              v-for="subTitle in product.children"
              :key="subTitle.id"
              >{{ subTitle.name }}</a
            >
          </div>

          <ytn-more />
        </div>
      </template>

      <!-- 内容主体 -->
      <div class="content">
        <a href="javascript:;" class="content-left">
          <img :src="product.picture" alt="" />
        </a>
        <div class="content-right">
          <home-goods
            class="goods-item"
            v-for="goods in product.goods"
            :key="goods.id"
            :data="goods"
          ></home-goods>
        </div>
      </div>
    </home-pannel>
  </div>
</template>

<script>
import { lazyLoadData } from "@/hooks";
import HomePannel from "./home-pannel.vue";
import HomeSkeleton from "./home-skeleton.vue";
import YtnMore from "@/components/library/ytn-more.vue";
import HomeGoods from "./home-goods.vue";
import { findGoods } from "@/api/home";
import { ref } from "vue";

export default {
  name: "HomeProduct",
  components: { HomePannel, HomeSkeleton, YtnMore, HomeGoods },
  setup() {
    const { result, target } = lazyLoadData(findGoods);
    console.log(result);
    const products = ref([]);
    return { target, products: result };
  },
};
</script>
<style lang="less" scoped>
.home-product {
  // 头部
  .header-right {
    display: flex;
    .subProduct {
      margin-right: 60px;
      a {
        font-size: 16px;
        padding: 2px 12px;
        color: #333;
        border-radius: 4px;

        &:hover {
          background-color: @xtxColor;
          color: white;
        }
      }
    }
  }

  // 主体内容
  .content {
    width: 100%;
    height: 610px;
    display: flex;

    &-left {
      display: inline-block;
      width: 240px;
      height: 610px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover; //ji
      }
    }

    // 经典flex布局：
    // flex+换行+margin-right(取消一行最后一个的margin设置)
    &-right {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      .goods-item {
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-of-type(4n) {
          margin-right: 0px;
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>