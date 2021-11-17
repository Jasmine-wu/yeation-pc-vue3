
<script>
import { h } from "vue";
export default {
  name: "YtnBreadcrumb",
  render() {
    // 1. 获取默认插槽里的内容
    const items = this.$slots.default();
    // 2. 根据item个数动态生成i
    const dymanicItems = [];
    items.forEach((item, index) => {
      dymanicItems.push(item);
      if (index < items.length - 1) {
        dymanicItems.push(
          h("i", {
            class: "iconfont icon-angle-right ",
            style:
              "font-size: 12px;margin-left: 5px;margin-right: 5px;line-height: 22px;",
          })
        );
      }
    });

    return h("ytn-breadcrumb", { class: "ytn-breadcrumb" }, dymanicItems);
  },

  props: {
    to: {
      // 一级类目默认跳转到首页
      type: String,
      default: "/",
    },
  },
};
</script>

<style lang="less" >
// 去掉scoped
.ytn-breadcrumb {
  display: flex;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
    // 隐藏最后一个item的<
    // 方法一：
    // &:last-of-type {
    //   i {
    //     display: none;
    //   }
    // }
  }
}
</style>