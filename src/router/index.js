import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [{
    path: '/',
    component: () =>
        import ('@/views/layout.vue'),
    children: [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/home')

    }, {
        path: '/category/:id',
        name: 'category',
        component: () =>
            import ('@/views/category/index.vue') // 一级类目内容展示文件

    }, {
        path: '/category/sub/:id',
        name: 'subCategory',
        component: () =>
            import ('@/views/category/sub.vue') // 二级类目内容展示文件

    }]
}]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router