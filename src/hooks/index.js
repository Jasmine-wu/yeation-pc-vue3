// 工具函数
import { useIntersectionObserver } from "@vueuse/core"
import { ref } from "vue";

// 数据懒加载：元素在可视区时才加载数据
export const lazyLoadData = (apiFn) => {

    // vue3获取被监听的dom元素
    const result = ref([]);
    const target = ref(null);

    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            // 一旦进入可视区，停止监听
            stop();
            // 请求数据
            apiFn().then(data => {
                result.value = data.result;
            });
        }
    })
    return { target, result };
}