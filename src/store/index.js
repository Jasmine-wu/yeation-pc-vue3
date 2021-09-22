import { createStore } from 'vuex'
import user from '@/store/modules/user'
import category from '@/store/modules/category'
import cart from '@/store/modules/cart'
// 引入vuex状态持久化插件
import createPersistedState from "vuex-persistedstate";

export default createStore({

    modules: {
        user,
        category,
        cart
    },
    // 插件初始化
    // 插件基本配置
    plugins: [createPersistedState({
        // 本地存贮的名字?
        key: "yeation-pc-store",
        // 哪些模块做本地存贮?
        paths: ['user', 'cart']

    }), ]
})