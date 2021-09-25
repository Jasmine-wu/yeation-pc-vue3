<template>
  <div class="category-menu">
    <!-- 分类菜单 -->
    <ul class="menu-content">
      <li v-for="category in menuList" :key="category.id">
        <router-link :to="`/category/${category.id}`">{{
          category.name
        }}</router-link>
        <!-- 为啥要用template v-if包起来，因为有可能dom渲染之前children数据还没拿到 -->
        <template v-if="category.children">
          <router-link
            v-for="sub in category.children"
            :to="`/category/sub/${sub.id}`"
            :key="sub.id"
            >{{ sub.name }}</router-link
          >
        </template>
      </li>
    </ul>

    <!-- 分类推荐弹层次 -->
    <div class="layer">
      <div class="layer-title">
        <span>分类推荐</span>
        <span>根据您的购买记录或者浏览记录推荐</span>
      </div>
      <ul class="layer-content">
        <li v-for="(i, index) in 9" :key="index">
          <img
            class="left"
            src="https://yanxuan-item.nosdn.127.net/5a115da8f2f6489d8c71925de69fe7b8.png"
            alt=""
          />
          <div class="right">
            <p class="name ellipsis-2">【定金购】严选零食大礼包（12件）</p>
            <p class="desc ellipsis">超值组合装，满足馋嘴欲</p>
            <p class="price"><i>¥</i>100.00</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "HomeCategoryMenu",
  setup() {
    // 左侧分类菜单的数据 = 9个一级类目>+2个二级分类+一个品牌>品牌推荐
    const store = useStore();
    // console.log(store.state.category.categoryList); //这是的categoryList还是默认的数据

    const lastBrand = reactive({
      id: "brand",
      name: "品牌",
      children: [{ id: "brand-chilren", name: "品牌推荐" }],
    });
    // 如果获取确保categoryList是网络请求完毕后的categoryList-->计算属性
    const menuList = computed(() => {
      const list = store.state.category.categoryList.map((category) => {
        return {
          id: category.id,
          name: category.name,
          children: category.children && category.children.slice(0, 2),
          goods: category.goods,
        };
      });
      // 计算属性返回的数组其实是伪数组，用不了push
      // 因此要在这里push
      list.push(lastBrand);

      return list;
    });

    // menuList.push(brand); //而不是这里
    return { menuList };
  },
};
</script>
<style lang="less" scoped>
.category-menu {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  .menu-content {
    li {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      &:hover {
        background-color: @xtxColor;
      }
    }
    a {
      color: white;
      font-size: 14px;
      margin-left: 8px;

      &:nth-child(1) {
        font-size: 16px;
      }
    }
  }
  // 分类推荐
  .layer {
    // 绝对定位，固定宽高
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    width: 990px;
    padding: 0 15px;
    border: 1px solid @xtxColor;
    background: rgba(255, 255, 255, 0.8);

    // 标题
    .layer-title {
      height: 60px;
      line-height: 60px;

      span:nth-child(1) {
        font-size: 18px;
      }
      span:nth-child(2) {
        font-size: 15px;
        margin-left: 10px;
        color: #999;
      }
    }
    // 分类详情
    .layer-content {
      display: flex;
      // 换行
      flex-wrap: wrap;
      margin: 10px 0;

      li {
        display: flex;
        width: 310px;
        height: 120px;
        padding: 10px;
        margin-right: 12px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        margin-bottom: 12px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
      img {
        width: 95px;
        height: 95px;
        margin-right: 5px;
      }
    }
  }
}
</style>