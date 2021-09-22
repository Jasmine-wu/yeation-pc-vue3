# 网易严选电商项目
- pc
- vue3
- vue-cli
- 组合API开发
## 01-.browserslistrc文件
- 你的js代码适配哪些浏览器？
- 市场份额>1%?
## 02-创建路由
### 创建
- vue2 new Router({})
- vue3 createRouter({})
## 03-vuex容器
- vuex：管理共享状态
- 多个共享组件状态，组件之间传参/修改/同步状态会变得麻烦且难以维护
- 解决：将共享的状态抽取出来，放到vuex中
- 比如：用户信息，token，分类，购物车列表，商品分类列表等
- 用户信息：vuex+本地缓存
- 登陆状体token：vuex+本地缓存
- 购物车列表：vuex
- 分类列表：vuex

### 创建
- vue2 new Vuex.Store({})
- vue3 createStore({})
### -在setup里访问容器里的数据
```js
import { useStore } from "vuex";
  setup() {
    // 1.获取store实例
    const store = useStore();
    // 2.访问state数据
    // const token = store.state.token;
    // 3.访问getters数据
    // const message = store.getters.message;
    // 4.调用mutations里的方法
    const updateToken = () => {
      store.commit("user/updateToken", "updateTokenxxx");
    };
    // 5.调用actions里的方法
    const syncUpdateToken = () => {
      store.dispatch("user/syncUpdateToken", "syncUpdateTokenxxx");
    };
    return { updateToken, syncUpdateToken };
  },

```
### -module模块化
- 模块命名空间默认namespaced:false.这时，state也是区分模块的，而mutaions/actions/getters是挂载到全局的
- 模块namespaced:true。所有选项都区分模块
- 总结：不管namespaced是什么，state都是区分模块的
- vue模块写法，state从选项变成了函数，数据要用return返回
### -getter快捷访问
### -vuex插件-vuex-persistedstate
- 支持vuex的状态持久化。
- yarn add vuex-persistedstate
- 
```js
    // 插件初始化
    // 插件基本配置
    plugins: [createPersistedState({
        // 本地存贮的名字?
        key: "yeation-pc-store",
        // 哪些模块做本地存贮?
        paths: ['user', 'cart']

    }), ]
```


## 04-提高开发效率的几个配置文件
- 问题1：@符号是webpack设置src目录的别名，但我们的vscode编辑器输入@确没有路径提示， 如何让编辑器有路径提示呢？
- 解决：添加jsconfig.js文件，该文件只在当前项目生效
- 问题2:忽略某些文件不进行风格检查
- 理由：如果你引入的第三方库代码风格跟你的不一样，第三方库一引入，eslint就会报错
- 解决：添加.eslintignore文件，忽略第三方库以及dist目录代码风格检查
