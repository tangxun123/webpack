const webpack = require("webpack");  // 访问webpack内部插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
 *  终端指令: node_modules/.bin/webpack 　自动引用webpack.config.js文件中的配置选项, 　
 *  npm可以引导任务执行，可以在package.json配置命令 npm run build
 */
module.exports = {
    mode: "development", // production 或 development
    devtool: "eval-source-map", // 生成Source Maps（使调试更容易） --> 详情： imgs/devtool.png

    // 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    entry: {
        app: __dirname + "/app/main.js", // 唯一的入口文件 , 对象时可多个入口
    },
    output: {
        path: __dirname + "/build", // 打包后的文件存放的位置
        filename: "[name].js", // 打包后输出文件的文件名
    },

    // 使用webpack构建本地服务器，浏览器监听代码进行实时刷新　npm install --save-dev webpack-dev-server －－＞详情：imgs/devServer.png
    devServer: {
        contentBase: "./public", // 本地服务器所加载的页面所在的目录
        port: 8080, //　端口
        // historyApiFallBack: true, // 不跳转
        inline: true // 实时刷新
    },

    module: {
        // loader 用于对模块的源代码进行转换
        rules: [
            {   
            //     // 能够解析jsx 及 es6语法
            //     // npm install --save-dev babel-core babel-loader
            /**
             * 直接执行上面的指令会导致 babel-core和babel-loader版本冲突，
             * babel-loader 8.x 对应 babel-core 7.x　， 　babel-loader 7.x 对应 babel-core 6.x
             * 此时删除babel-core的包，执行　npm i @babel/core -D　，　使用`@babel/core`代替`babel-core`来安装
             * 
             */
                test: /\.(jsx?|babel|es6)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                // 解析css及样式表 css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能---style-loader将所有的计算后的样式加入页面中
                // npm install --save-dev style-loader css-loader
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader",
                        options: {
                            modules: true // 指定启用css modules
                        }
                    },
                    {
                        // npm install --save-dev postcss-loader autoprefixer  // 自动添加前缀的插件
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
            
        ]
    },
    // plugins(插件)目的在于解决 loader 无法实现的其他事,是用来拓展Webpack功能的
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究!'), // 加入版权信息的插件
        new HtmlWebpackPlugin({
            template:__dirname + "/app/index.template.html", // 以此路径下的文件为模板，npm run build打包生成build文件下的html及js
        })
    ]
}