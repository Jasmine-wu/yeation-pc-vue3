// 插件：
// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import YtnSkeleton from "./ytn-skeleton.vue"
import YtnSwiper from "./ytn-swiper.vue"
import YtnMore from "./ytn-more.vue"

export default {
    install(app) {
        // 1.app 提供component/directive方法挂载全局组件/指令，不提供原型挂载
        // 2.原型挂载要另外写：app.config.globalProperties.$http = xxx;
        app.component(YtnSkeleton.name, YtnSkeleton)
        app.component(YtnSwiper.name, YtnSwiper)
        app.component(YtnMore.name, YtnMore)


    }
}