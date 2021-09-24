import { topCategory } from "@/api/constants"
import { findAllCategory } from "@/api/category"
export default {
    namespaced: true,
    state() {
        return {
            // 商品分类列表
            categoryList: topCategory.map(item => ({ name: item }))
        }
    },
    mutations: {
        // 更新分类数据
        setCategoryList(state, playload) {
            state.categoryList = playload

        },
    },
    actions: {
        async getCategoryList(context) {
            // 发起请求获取分类数据
            const { result } = await findAllCategory();
            // 更新分类数据
            console.log(result);
            context.commit("setCategoryList", result);
        }

    }
}