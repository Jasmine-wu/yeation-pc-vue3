import axios from "axios"
import store from "@/store"
import router from "@/router"

// 导出baseURL，因为有些请求可能不是axios发出的也需要baseURL。
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/';
// 1.创建axios实例
const instance = axios.create({
    baseURL,
    timeout: 5000
});
// 2.请求拦截器 - token注入，主动处理token过期问题。
instance.interceptors.request.use((config) => {
    // 从vuex中获取token
    const { profile } = store.state.user;
    if (profile.token) {
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config;

}, error => {
    Promise.reject(error)
})

// 3.响应拦截器 - 剥离无效数据， 被动处理处理token失效
instance.interceptors.response.use((res) => res.data, error => {

    // error.response:排除无响应
    // 本项目401状态码代表token无效
    // 根据401状态码，被动处理token过期问题
    if (error.response && error.response.status === 401) {
        // 1.清空本地无效用户信息
        store.commit("user/setUser", {});
        // 2.跳转到登陆页
        // 对fullPath进行url编码
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push("/login?redirectUrl=" + fullPath) //已防止这里拼接后面再解析时出错
    }
    Promise.reject(error);
})

// 4.导入发起axios请求的函数
export default (url, method, submitData) => {
    return instance({
        url,
        method,
        // ['属性名']中括号设置一个会变的属性
        [method.toLowerCase() === "get" ? 'params' : 'data']: submitData
    })
}