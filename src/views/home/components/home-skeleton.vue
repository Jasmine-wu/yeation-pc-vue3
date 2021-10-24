<template>
  <!-- 首页面板骨架效果组件 -->
  <div class="box">
    <div v-for="i in 4" :key="i" class="item" :style="{ background: bg }">
      <ytn-skeleton animated bg="#ccc" width="306px" height="306px" />
      <ytn-skeleton animated bg="#ccc" width="150px" height="30px" />
      <ytn-skeleton animated bg="#ccc" width="120px" height="25px" />
    </div>
  </div>
</template>

<script>
import ytnSkeleton from "@/components/library/ytn-skeleton.vue";
export default {
  components: { ytnSkeleton },
  name: "HomeSkeleton",
  props: {
    bg: {
      type: String,
      default: "#fff",
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 406px;
  display: flex;
  justify-content: space-between;

  .item {
    .ytn-skeleton ~ .ytn-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>