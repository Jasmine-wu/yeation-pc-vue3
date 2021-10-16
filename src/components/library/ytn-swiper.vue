<template>
  <div class="ytn-swiper" @mouseenter="stop()" @mouseleave="start()">
    <ul>
      <!-- 展示当前激活index的图片 -->
      <li
        class="swiper-item"
        :class="{ show: activeIndex === index }"
        v-for="(img, index) in data"
        :key="index"
      >
        <img :src="img.imgUrl" alt="" />
      </li>
    </ul>

    <!-- 上一页/下一页 -->
    <a href="javascript:;" class="swiper-btn pre" @click="preFn()">
      <i class="iconfont icon-angle-left" />
    </a>
    <a href="javascript:;" class="swiper-btn next" @click="nextFn()">
      <i class="iconfont icon-angle-right" />
    </a>

    <!-- 分页器 -->
    <div class="swiper-indicator">
      <!-- 当前激活的小圆圈 -->
      <span
        v-for="(img, index) in data"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      ></span>
    </div>
  </div>
</template>
<script>
import { onUnmounted, ref, watch } from "vue";
export default {
  name: "YtnSwiper",
  props: {
    // 轮播图片数据
    data: {
      type: Array,
      required: true,
    },
    // 控制是否自动播放
    autoPlay: {
      type: Boolean,
      default: false, //默认不开启
    },
    // 自动播放间隔时间
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    // 1.默认激活显示器index，以及index对应的图片
    const activeIndex = ref(0);

    // 2.实现自动播放逻辑
    let timer = null;
    // 2.1
    const autoPlayfn = () => {
      // 先清除已存在的定时器
      timer && clearInterval(timer);

      // 再开启新的
      timer = setInterval(() => {
        if (activeIndex.value >= props.data.length - 1) {
          activeIndex.value = 0;
        } else {
          activeIndex.value++;
        }
      }, props.duration);
    };

    // 2.2 监听多个数据
    watch(
      () => props.data,
      () => {
        // 有数据了且自动播放为true时，才自动播放
        if (props.data && props.data.length && props.autoPlay) {
          autoPlayfn();
        }
      },
      {
        deep: true,
        // 考虑图片data可能是静态数据时，一开始就是有值的，不会变化，这是watch是监听不到的
        // 解决：一开始就执行一次
        immediate: true,
      }
    );

    // 2.3. 鼠标经过，暂停自动播放
    const stop = () => {
      timer && clearInterval(timer);
    };
    // 2.4. 鼠标离开，开启自动播放
    const start = () => {
      if (props.data && props.data.length && props.autoPlay) {
        autoPlayfn();
      }
    };

    // 3. 点击指示器，切换图片显示
    // 4. 点击上一个/下一页，切换图片显示
    // 4.1 上一页
    const preFn = () => {
      if (props.data && props.data.length) {
        if (activeIndex.value <= 0) {
          activeIndex.value = props.data.length - 1;
        } else {
          activeIndex.value--;
        }
      }
    };

    // 4.2 下一页
    const nextFn = () => {
      if (props.data && props.data.length) {
        if (activeIndex.value >= props.data.length - 1) {
          activeIndex.value = 0;
        } else {
          activeIndex.value++;
        }
      }
    };

    // 5. 组件卸载时，销毁定时器
    onUnmounted(() => {
      stop();
    });

    return { activeIndex, stop, start, preFn, nextFn };
  },
};
</script>
<style lang="less" scoped>
.ytn-swiper {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .swiper {
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 2;
      // 默认是看不到的
      opacity: 0;
      // 添加透明度的过渡动画
      transition: opacity 0.5s linear;
      &.show {
        opacity: 1;
      }
    }

    // 上/下一页
    &-btn {
      width: 44px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      border-radius: 50%;
      background: rgba(94, 81, 81, 0.2);
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      z-index: 3;
      &.pre {
        left: 22px;
      }
      &.next {
        right: 22px;
      }
    }
    // 分页
    &-indicator {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      span {
        display: inline-block;
        width: 13px;
        height: 13px;
        margin-right: 7px;
        border-radius: 50%;
        background: rgba(94, 81, 81, 0.2);
      }
      // 激活类
      .active {
        background: white;
      }
    }
  }
}
</style>
