# reactProject
用webpack搭建环境 使用react开发一个音乐webapp

1 使用 webpack 搭建开发环境

 webpack 是一个前端资源加载、打包工具，前端的常用资源都可以作为一个模块导出，我们在代码中直接引用即可，最后安装我们的配置把代码打包整合起来。 比如css、js、模块等等



一 创建一个 package.json
    使用npm init
    依次输入项目名（直接按回车 默认的项目名）、版本号（回车）、描述、入口文件、测试用例（回车跳过）、项目git地址、keywords（关键词 暂时不知道干嘛的）、作者、license（许可证 不知道干啥的）

二 添加依赖模块
    npm install react --save
    安装依赖的react 并写入 package.json
    会在 package.json里添加"dependencies": {
                                "react": "^16.2.0"
                            }

    直接在dependencies里增加依赖文件
    只要有配置 直接执行npm install 就可以了 npm会帮我们找到 package.json列出的模块并安装

三 创建webpack.config.js
    基础配置
    module.exports = {
        entry:'./entry.js',         //入口文件 webpack从入口文件入手分析所有的require 模块把所有的资源整合起来打成一个包
        output:{                    //定义最后生成的包放在什么位置
            path:'./dist',          //出口位置
            filename:'bundle.js'    //定义文件名称
        },
        module:{
            loaders:[ //如果我们需要一个css就需要一个css的loader
                {
                    test:/\.css$/,  //test表示我们要匹配的文件
                    exclude:/node_nodules/,//exclude表示哪些文件夹里的文件不需要处理
                    loader:'style!css'
                },
                {test:/\.js|jsx$/,loaders:['babel']}
            ]
        }
    }
    一点要以./开头 如果不加webpack会到node_modules里去找
    module.exports = {
        entry:'./app/index.js',        
        output:{                    
            path:'./dist',         
            filename:'bundle.js'   
        }
    }
    建立app、dist文件夹
    在app/index.js里就可以开始正式的编程了 webpack会帮我们做资源的导入

四 常用loader
    babel - loader 将es6转为es5的语法
    css - loader 
    less - loader 