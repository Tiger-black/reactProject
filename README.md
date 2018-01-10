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

五 webpack dev server 搭建开发环境
    webpack dev server是一个小型的Node Express服务器，它为通过webpack打包生成的资源文件提供web服务
    1.搭建本地服务器
    2.自动刷新
    server.js



2 react开发
    两种开发思路
    1.从上至下 先写大配置在写里面小的组件
    2.从下至上 先写里面每一个小的组件然后再把组件拼接起来形成一个页面

    我们用第二种 时候多人开发 自己维护自己的组件

    使用jpayer插件实现音乐播放

    当页面跳出需要解绑已绑定的事件
    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }

    es6的写法 模板表达式
    `{$this.props.progress}%`

    要想使用refs 
    你在 changeProgress 里面使用this的时候一定要在 constructor 里面绑定，不然找不到this
    constructor(props) {
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
    }

    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        console.log(progressBar)
    }

    render() {
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{ width: `${this.props.progress}%`}} > </div>
            </div>
        )
    }

组件直接的通讯
    1、利用props从父组件传递到子组件中
    2、从子组件把数据回传给父组件 先用简单的方法 回调函数
    3、两个没有关系子组件 互相传递数据 需要把数据回传给他们统一的父组件 再由父组件派发；
        如果层级关系比较深这种情况相当麻烦可以用事件订阅的方法解决

作为一个单页应用把数据放在root下面去管理、页面之间的数据也可以进行交互，这样我们页面应用的数据就在root里面维护


export default Player;?????????


react rotuer管理页面
    两种url模式
    1、browserHistory  //？？？浏览器历史
        yoursite.com/a/b
    2、hasHistory      //？？？哈希url
        yoursite.com/#a/b

    提供两种组件 本质一样 提供一个装载页面的组件 你把页面的组件传给它 他来管理和展示这个页面
    1、IndexRoute 系统第一次进入 默认使用 IndexRoute
    2、Route

    link组件 
    <link to='url'></link>