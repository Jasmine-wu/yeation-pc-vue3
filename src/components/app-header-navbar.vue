
<template>
  <!-- 提取头部导航组件给头部导航以及吸顶头部导航使用 -->
  <ul class="app-header-navbar">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 一级类目 -->
    <li
      v-for="category in categoryList"
      :key="category.id"
      @mouseenter="showSub(true, category.id)"
      @mouseleave="showSub(false, category.id)"
    >
      <!-- 点击一级类目跳转： -->
      <RouterLink
        :to="`/category/${category.id}`"
        @click="showSub(false, category.id)"
        >{{ category.name }}</RouterLink
      >
      <!-- 二级类目 -->
      <div class="layer" :class="{ open: category.open }">
        <ul>
          <li v-for="subCategory in category.children" :key="subCategory.id">
            <!-- 点击一级类目跳转： -->
            <RouterLink
              :to="`/category/sub/${subCategory.id}`"
              @click="showSub(false, category.id)"
            >
              <img :src="subCategory.picture" alt="" />
              <p>{{ subCategory.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "AppHeaderNavBar",
  setup() {
    const store = useStore();

    const categoryList = computed(() => {
      return store.state.category.categoryList;
    });
    // 修改open属性的状态
    const showSub = (isShow, topId) => {
      if (isShow) {
        store.commit("category/showSub", topId);
      } else {
        store.commit("category/hideSub", topId);
      }
    };
    return { categoryList, showSub };
  },
};
</script>
<style lang="less" scoped>
.app-header-navbar {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative; //父相
  // 子代选择器 >
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // 显示二级类目
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}

// 二级类目的样式
.layer {
  // 显示二级类目的动态类
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute; //子绝
  z-index: 9999; //解决层级问题
  left: -200px;
  top: 56px;
  overflow: hidden;
  height: 0; //
  opacity: 0; //默认隐藏
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s; //show动画
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>