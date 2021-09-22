<template>
  <div>state token:{{ $store.state.user.token }}</div>
  <p>getter: {{ $store.getters["user/message"] }}</p>

  <button @click="updateToken">同步更新state token</button>
  <button @click="syncUpdateToken">异步更新state token</button>

  <router-view></router-view>
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    // 1.获取store实例
    const store = useStore();
    // 2.访问state数据
    // const token = store.state.token;
    // 3.访问getters数据
    // const message = store.getters.message;
    // 4.调用mutations里的方法
    const updateToken = () => {
      store.commit("user/updateToken", "updateTokenxxx");
    };

    const syncUpdateToken = () => {
      store.dispatch("user/syncUpdateToken", "syncUpdateTokenxxx");
    };
    return { updateToken, syncUpdateToken };
  },
};
</script>