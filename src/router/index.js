import { createRouter, createWebHashHistory } from "vue-router"

const routes = [{
    path: "/",
    component: () =>
        import ("@/views/layout.vue"),
    children: [{
        path: "/",
        name: "home",
        component: () =>
            import ("@/views/home")

    }]
}, ]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;