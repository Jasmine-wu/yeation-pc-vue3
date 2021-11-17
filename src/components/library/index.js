// 插件：
// 扩展vue原有的功能：
// 1.全局组件，2.自定义指令，3.挂载原型方法，注意：没有全局过滤器。
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import YtnSkeleton from "./ytn-skeleton.vue"
import YtnSwiper from "./ytn-swiper.vue"
import YtnMore from "./ytn-more.vue"
import defaultImg from "@/assets/images/200.png"

export default {
    install(app) {
        // 一，注册全局组件
        // 1.app 提供component/directive方法挂载全局组件/指令，不提供原型挂载
        // 2.原型挂载要另外写：app.config.globalProperties.$http = xxx;
        app.component(YtnSkeleton.name, YtnSkeleton)
        app.component(YtnSwiper.name, YtnSwiper)
        app.component(YtnMore.name, YtnMore)

        // 二，注册全局指令
        defineDirectives(app);

    }
}
const defineDirectives = (app) => {

    // 2.1 图片懒加载指令v-lazy(指令名字不需要加v-)
    app.directive("lazy", {
        // 1. 先要确定指令作用的元素已经插入到dom中
        // vue2: 钩子函数 inserted
        // vue3: 钩子函数 mounted
        mounted(el, binding) {

            // 2. 观察指令元素是否进入可视区
            let observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    // 如果被观察元素进入到可视区了
                    // 3.停止观察
                    observer.unobserve(el);
                    // 4.图片加载出错时
                    el.onerror = () => {
                            el.src = defaultImg;

                        }
                        // 5.将指令绑定的图片地址设置到src上
                    el.src = binding.value;
                }

            }, {
                threshold: 0
            });
            // 观察元素
            observer.observe(el);
        }
    })

}