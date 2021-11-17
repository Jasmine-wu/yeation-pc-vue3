<template>
  <div class="goods-wraper">
    <!-- 首页单个商品组件 -->
    <a class="image" href="javascript:;"
      ><img v-lazy="data.picture" alt=""
    /></a>
    <p class="ellipsis-2">{{ data.name }}</p>
    <p class="ellipsis desc" itemref="">{{ data.desc }}</p>
    <p class="price">¥ {{ data.price }}</p>
    <div class="mask">
      <router-link to="/">
        <span>找相似</span>
        <span>发现更多宝贝</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 单个商品信息
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
.goods-wraper {
  position: relative;
  width: 240px;
  height: 300px;
  padding: 10px 30px;
  border: 1px solid transparent;
  // 隐藏遮罩
  overflow: hidden;

  .image {
    // a标签转换成block/inline-block才可以设置宽高
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto; //必须是块元素且设置了宽度
    // img是行内块元素，可直接设置宽高
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    font-size: 16px;
    margin-top: 6px;

    &:last-of-type {
      font-size: 20px;
      color: #cf4444;
    }
    & .desc {
      color: #666;
    }
  }

  // hover
  &:hover {
    border-color: @xtxColor;
    .mask {
      transform: none;
    }
  }

  // 底部弹出遮罩层
  .mask {
    position: absolute;
    // height: 0;
    height: 86px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 999;
    background: @xtxColor;
    // 下移自身高度
    transform: translate3d(0, 100%, 0);
    // 弹出时的过渡动画
    transition: all 0.3s;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      span {
        &:first-of-type {
          border-bottom: 1px solid white;
          padding: 5px 20px;
          margin-bottom: 5px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>