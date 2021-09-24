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
        // 定义两个方法控制是否显示/隐藏当前分类下的二级分类弹层
        showSub(state, id) {
            // 1. 先找到当前一级分类数据
            let category = state.categoryList.find(category => category.id === id);
            // 2. 修改open状态
            category.open = true;
        },
        hideSub(state, id) {
            // 1. 先找到当前一级分类数据
            let category = state.categoryList.find(category => category.id === id);
            // 2. 修改open状态
            category.open = false;
        }
    },
    actions: {
        async getCategoryList(context) {
            // 发起请求获取分类数据
            const { result } = await findAllCategory();
            // 给一级类目添加一个open属性，控制二级类目弹层的显示/隐藏,默认是false
            result.forEach(topCategory => {
                topCategory.open = false;
            });
            // 更新分类数据
            context.commit("setCategoryList", result);
        }

    }
}