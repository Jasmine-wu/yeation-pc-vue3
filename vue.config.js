// path
const path = require('path');
module.exports = {
    lintOnSave: false,
    devServer: {
        open: true
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            // 添加你需要注入的less到每个vue文件中的less文件
            patterns: [
                // 绝对路径
                path.join(__dirname, './src/assets/styles/variables.less'),
                path.join(__dirname, './src/assets/styles/mixins.less')
            ]
        }
    }
}