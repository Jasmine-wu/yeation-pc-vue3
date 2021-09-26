<template>
  <div class="category-menu">
    <!-- 分类菜单 -->
    <ul class="menu-content">
      <li
        v-for="category in menuList"
        :key="category.id"
        @mouseenter="categoryId = category.id"
        :class="{ active: categoryId === category.id }"
      >
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
        <template v-else
          ><!-- 无数据时显示骨架屏加载效果插件 -->
          <YtnSkeleton
            width="60px"
            height="18px"
            style="margin-left: 5px"
            bg="rgba(255,255,255,0.2)"
          />
          <YtnSkeleton
            width="90px"
            height="18px"
            style="margin-left: 5px"
            bg="rgba(255,255,255,0.2)"
          />
        </template>
      </li>
    </ul>

    <!-- 分类推荐弹层次 -->
    <div class="layer" @mouseleave="categoryId = null">
      <div class="layer-title">
        <span
          >{{
            curRecoms && curRecoms.id === "brand" ? "品牌" : "分类"
          }}推荐</span
        >
        <span>根据您的购买记录或者浏览记录推荐</span>
      </div>
      <ul class="layer-content" v-if="curRecoms && curRecoms.goods">
        <li v-for="goods in curRecoms.goods" :key="goods.id">
          <router-link to="/">
            <img class="left" :src="goods.picture" alt="" />
            <div class="right">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}</p>
              <p class="price"><i>¥</i>{{ goods.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { findBrand } from "@/api/home.js";

export default {
  name: "HomeCategoryMenu",
  setup() {
    // 1.准备分类菜单数据
    // 左侧分类菜单的数据 = 9个一级类目>+2个二级分类+一个品牌>品牌推荐
    const store = useStore();
    // console.log(store.state.category.categoryList); //这是的categoryList只有默认的数据

    const lastBrand = reactive({
      id: "brand",
      name: "品牌",
      children: [{ id: "brand-chilren", name: "品牌推荐" }],
      goods: [],
    });
    // 如果获取确保categoryList是网络请求完毕后的categoryList-->计算属性
    const menuList = computed(() => {
      // 1.1 9个一级类目>+2个二级分类
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
      // 1.2 一个品牌>品牌推荐
      list.push(lastBrand);

      return list;
    });

    // 2. 准备分类推荐数据，用响应对象实现
    // const curRecoms = reactive({
    //   goods: {},
    // });
    // // 2.1 在鼠标经过enter菜单li时，记住当前一级分类id
    // const addMouseEnterListener = (id) => {
    //   // 2.2 根据一级分类id筛选分类推荐数据（在goods里）
    //   const curCategory = menuList.value.find((category) => category.id === id);
    //   curRecoms.goods = curCategory.goods && curCategory.goods;
    // };
    // return { menuList, addMouseEnterListener, curRecoms };

    // 2. 用计算属性实现:更简洁
    const categoryId = ref(0);
    const curRecoms = computed(() => {
      return menuList.value.find(
        (category) => category.id === categoryId.value
      );
    });

    // 3.单独处理品牌/品牌推荐栏的数据
    findBrand().then((data) => {
      lastBrand.goods =
        data.result.length > 9 ? data.result.slice(0, 9) : data.result;
    });

    // 3.1 思考，为什么用.then获取，可以用await获取结果么？
    // 最好不要！
    // const data = await findBrand();
    // lastBrand.goods =
    //   data.result.length > 9 ? data.result.slice(0, 9) : data.result;

    // 4. 激活当前分类
    // 4.1 鼠标经过menu li，或者鼠标在当前li的layer里时，保持li的激活状态
    // 4.2 鼠标离开layer/li时，取消当前li的激活状态
    // menuList.push(brand); //而不是这里
    return { menuList, categoryId, curRecoms };
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
      // 激活状态
      &:hover,
      &.active {
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
    border-left: none;
    background: rgba(255, 255, 255, 0.8);
    // 默认隐藏
    display: none;

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
        a {
          display: flex;
        }
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
  // 鼠标经过menu时，显示分类推荐弹层
  &:hover {
    .layer {
      display: block;
    }
  }
}

// 骨架屏透明度来回变化的动画
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>