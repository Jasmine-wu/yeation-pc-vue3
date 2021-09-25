<template>
  <div class="category-menu">
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
}
</style>