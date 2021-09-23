<template>
  <div>
    <!-- 顶部通知栏 -->
    <nav></nav>
    <!-- 头部 -->
    <header></header>
    <!-- 内容容器 -->
    <div class="main">
      主体内容
      <!-- 挂载二级路由 -->
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <footer></footer>
  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
