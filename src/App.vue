<template>
  <div>state token:{{ $store.state.user.profile.id }}</div>
  <button @click="$store.commit('user/setUser', { id: '1000' })">
    updateUser
  </button>
  <router-view></router-view>
</template>
<script>
export default {
  name: "App",
  setup() {},
};
</script>