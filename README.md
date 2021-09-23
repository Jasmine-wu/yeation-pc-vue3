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
#### 常见问题：
- 问题（1）在setup中store.state.user.profile获取的数据不是响应式的。
  - 那么，在html中使用setup return的profile.token也不是响应式。
- 解决：
  - 方案-：在html中直接用：$store.state.user.profile.token,这样获取的数据是响应式的
  - 方案二：在setup获取profile，但用计算属性包裹一下再return出去。然后html再使用profile.token

 ```js
      setup() {
        //  1.获取用户信息，显示或隐藏导航栏li
        const store = useStore();
        // const { profile } = store.state.user; //注意：这样获取的数据不是响应式的
        const profile = computed(() => store.state.user.profile);

        return { profile };
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
## 05 axios封装
### -1.创建axios实例
- 导出baseURL的必要，因为有些请求可能不是axios发出的也需要baseURL。
### -2.请求拦截器 
#### -（1）token注入
#### -（2）主动处理token过期问题。
### -3.响应拦截器 
#### -（1）剥离无效数据
- axios内部对响应数据包了一层data
#### -（2）被动处理token失效问题
- 被动处理token过期问题一般是，后台返回一个token无效的状态，用户判断响应状态码进行token过期后的逻辑处理
- token过期场景1:假如进入到购物车页，点击支付结算，如果未登陆或者token过期，1.跳转到登陆页，2，跳转时传递当前路由地址给登陆页（因为登陆成功以后要自动跳转到原地址（支付页））
- 被动处理token失效逻辑：
  - 判断状态码，如果是过期的状态码
  - 清除用户数据
  - 跳转到登陆页，同时传递当前页路由地址过去（登陆成功时可自动跳转回来）
    - 1.如何在js文件拿到当前路由地址？
  ```js
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
  
  ```
    - 2.为什么要用.value？
      - currentRoute是ref对象
    - 3.为什么是fullPath而不是path？
      - 假如路由是/user?id=100&a=xxx, .path获取到的结果是/user,而.fullPath获取的结果是/user?id=100&a=xxx
    - 4.为什么会用encodeURIComponent包裹路由地址？
      - encodeURIComponent是js原生的url编码API，对path进行编码，为了防止url里的特殊字符将来再解析时出错
### -4.导出发起axios请求的函数
- 1.动态设置属性
用['属性名']设置会变的属性
```js
    a[10>1?"age":"name"]  //运行结果a[age] 
```
```js
// 需求：根据请求方法，将数据动态设置到data/params属性上
    [method.toLowerCase() === "get" ? 'params' : 'data']: submitData
```
- 2. 不同的请求方法，提交数据的参数不一样
- 如果是get => params
- 如果非post => data

```js
  // 4.导入发起axios请求的函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // ['属性名']中括号设置一个会变的属性
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
```

## 06-路由设计
-  App挂载一级路由
-  一级路由加载layout布局容器
-  layout布局容器挂载二级路由
```js
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
```

## 07-less的使用
- 语法：
  - 定义公共变量：=>vairables.less
  - 嵌套语法
  - 定义自定义函数以及内置函数的混入文件 => mixins.less
- 注释：
  - ～ li，表示选中排在父选择器后面的所有兄弟li元素
  - & ：父选择器的引用
  - < : 子代选择器
### -定义公共变量和混入代码

```less
      // 1.定义一个类函数
      .abc(){
          width:100px;
          height:100px;
          background-color: red;
      }

      // 2.复用这个类函数
      .box{
          .abc()
      }
      // 3.在标签中使用class box
```
- 在style标签中使用less文件中定义的函数
```less
    <style lang="less" scoped>
    @import "./assets/styles/mixins.less";
    .containner {
      .hoverShadow ();
    }
    </style>
```
### -自动导入公共变量文件以及混入文件
- 问题： 每次使用公用的变量和mixin的时候需要单独引入到文件中。
- 解决： 使用vuecli的vuecli的插件style-resoures-loader来完成自动注入到每个less文件或者vue组件中style标签中。
```bash
# 1.添加vuecli插件
  vue add tyle-resoures-loader
```
```js
// 2.在vue.config.js文件中
// 2.1
const path = require('path');
        pluginOptions: {
              'style-resources-loader': {
                  preProcessor: 'less',
                  // 2.2添加你需要注入到每个vue文件中的less文件
                  patterns: [
                      // 使用绝对路径
                      path.join(__dirname, './src/assets/styles/variables.less'),
                      path.join(__dirname, './src/assets/styles/mixins.less')
                  ]
              }
          }
```
## 08-样式初始化文件
### -安装样式重置的包并导入
- 1.yarn add normalize.css
- 2.在main.js中导入: import "normalize.css"
### -创建自己的样式重置文件并导入-common.less













