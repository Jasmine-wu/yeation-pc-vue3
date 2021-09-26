import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 执行样式初始化库
import "normalize.css"
// 执行自己的样式重置文件
import "@/assets/styles/common.less"
// 导入自己的全局组件库
import YtnUI from "@/components/library"

createApp(App).use(store).use(router).use(YtnUI).mount('#app');