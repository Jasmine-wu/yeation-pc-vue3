<template>
  <!-- 4.根据卷去的顶部高度，动态设置类show -->
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- fixbug：吸顶头部和非吸顶头部监听的是mouseenter/mouseleave/click事件，共用的是同一个容器open属性。
    最开始当鼠标enter非吸顶头部的app-header-navbar时，open属性设置为true，即所有的app-header-navbar都会显示二级类目。
    这时，当用户鼠标向上准备离开非吸顶头部的app-header-navbar时，会发现，二级类目并没有隐藏。
    解决：两个app-header-navbar同一事件只在当前页dom中存在一个:v-show="y >= 78"
     -->
    <div class="container" v-show="y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNavbar />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted, ref } from "vue";
import AppHeaderNavbar from "./app-header-navbar";
import { useWindowScroll } from "@vueuse/core";
export default {
  name: "AppHeaderSticky",
  components: { AppHeaderNavbar },
  // 方式一：传统方式监听滚动时间
  // setup() {
  //   // 3.监听屏幕滚动向上卷的高度
  //   const y = ref(0);
  //   onMounted(() => {
  //     window.onscroll = () => {
  //       y.value = document.documentElement.scrollTop;
  //     };
  //   });
  //   return { y };
  // },

  // 方式二：使用@vueuse/core库
  setup() {
    const { y } = useWindowScroll();
    return { y };
  },
};
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;

  border-bottom: 1px solid #e4e4e4;
  //1.默认固定在移屏幕顶部上移-80px的位置且透明度为0
  transform: translateY(-100%);
  opacity: 0;
  //2.当屏幕向上滚出80px时，取消transform
  //&.show的意识是父元素app-header-sticky的类show
  &.show {
    transition: all 0.2s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
