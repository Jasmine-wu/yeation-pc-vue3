<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- template的好处：他是一个元素，但不会被解析成标签，通常用于隐藏html内容 -->
        <!-- 1.2 根据登陆状态，显示或隐藏 -->
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a>
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>

        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>

        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "AppTopnav",
  setup() {
    //  1.获取用户信息，显示或隐藏导航栏li
    const store = useStore();
    const { profile } = store.state.user;
    alert(profile.token);
    return { profile };
  },
};
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // ～ li: 选中父选择器（li）后面的所有的兄弟li元素
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>