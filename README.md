# 网易严选电商项目
- pc
- vue3
- vue-cli
## 01-.browserslistrc文件
- 你的js代码适配哪些浏览器？
- 市场份额>1%?
## 02-创建路由
### 创建
- vue2 new Router({})
- vue3 createRouter({})
## 03-vuex容器
### 创建
- vue2 new Vuex.Store({})
- vue3 createStore({})
### module模块化
### getter快捷访问

## 04-提高开发效率的几个配置文件
- 问题1：@符号是webpack设置src目录的别名，但我们的vscode编辑器输入@确没有路径提示， 如何让编辑器有路径提示呢？
- 解决：添加jsconfig.js文件，该文件只在当前项目生效
- 问题2:忽略某些文件不进行风格检查
- 理由：如果你引入的第三方库代码风格跟你的不一样，第三方库一引入，eslint就会报错
- 解决：添加.eslintignore文件，忽略第三方库以及dist目录代码风格检查
