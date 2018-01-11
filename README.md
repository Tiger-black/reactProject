# reactProject
用webpack搭建环境 使用react开发一个音乐webapp


webpack可以说是一个模块管理器

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

    组件之间的通讯
        1、利用props从父组件传递到子组件中
        2、从子组件把数据回传给父组件 先用简单的方法 回调函数
        3、两个没有关系子组件 互相传递数据 需要把数据回传给他们统一的父组件 再由父组件派发；
            如果层级关系比较深这种情况相当麻烦可以用事件订阅的方法解决

        作为一个单页应用把数据放在root下面去管理、页面之间的数据也可以进行交互，这样我们页面应用的数据就在root里面维护


        export default Player;?????????
        
        解决方案 事件订阅方式 
        大概思路是有一个全局事件的管理器 
        点某一个按钮的时候发送一个事件 其他页面只要订阅这个事件就可以监听到这个事件 从而进行操作
        pubsub-js 模块


3 react rotuer管理页面

    React Router被拆分成三个包：react-router,react-router-dom和react-router-native。react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。
    进行网站（将会运行在浏览器环境中）构建，我们应当安装react-router-dom。react-router-dom暴露出react-router中暴露的对象与方法，因此你只需要安装并引用react-router-dom即可。
    
    一 路由器(Router)
    在你开始项目前，你需要决定你使用的路由器的类型。对于网页项目，存在<BrowserRouter>与<HashRouter>两种组件。
    当存在服务区来管理动态请求时，需要使用<BrowserRouter>组件，而<HashRouter>被用于静态网站。
    通常，我们更倾向选择<BrowserRouter>，但如果你的网站仅用来呈现静态文件，那么<HashRouter>将会是一个好选择。
    对于我们的项目，将设将会有服务器的动态支持，因此我们选择<BrowserRouter>作为路由器组件。

    两种url模式
    1、browserHistory  //？？？浏览器历史
        yoursite.com/a/b
    2、hasHistory      //？？？哈希url
        yoursite.com/#a/b

    二 历史(History)
    每个路由器都会创建一个history对象并用其保持追踪当前location[注1]并且在有变化时对网站进行重新渲染。这个history对象保证了React Router提供的其他组件的可用性，所以其他组件必须在router内部渲染。一个React Router组件如果向父级上追溯却找不到router组件，那么这个组件将无法正常工作。

    [1] locations 是一个含有描述URL不同部分属性的对象：

    // 一个基本的location对象
    { pathname: '/', search: '', hash: '', key: 'abc123' state: {} }

    三 渲染<Router>
    路由器组件无法接受两个及以上的子元素。基于这种限制的存在，创建一个<App>组件来渲染应用其余部分是一个有效的方法（对于服务端渲染，将应用从router组件中分离也是重要的）。

    import { BrowserRouter } from 'react-router-dom'
    ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ), document.getElementById('root'))

    四 <App>
    应用通过<App>组件定义。简化一下，我们将应用拆分成两个部分。<Header>组件包含网站的导航链接。<Main>组件则呈现其余内容。

    // this component will be rendered by our <___Router>
    const App = () => (
    <div>
        <Header />
        <Main />
    </div>
    )
    注意：你可以按你喜欢的方式对应用布局，但是将路由与导航拆分出来对于这个入门教程会成家简单。

    五 路由(Route)
    <Route>组件是 React Router 中主要的结构单元。在任意位置只要匹配了URL的路径名 ( pathname ) 你就可以创建<Route>元素进行渲染。

    六 路径(Path)
    <Route>接受一个数为string类型的path，该值路由匹配的路径名的类型。例如：<Route path='/roster'/>会匹配以/roster[注2]开头的路径名。在当前path参数与当前location的路径相匹配时，路由就会开始渲染React元素。若不匹配，路由不会进行任何操作[注3]。

    [2] 你可以渲染无路径的<Route>，其将会匹配所有location。此法用于访问存在上下文中的变量与方法。
    [3] 如果你使用children参数，即便在当前location不匹配时route也将进行渲染。

    <Route path='/roster'/>
    // 当路径名为'/'时, path不匹配
    // 当路径名为'/roster'或'/roster/2'时, path匹配
    // 当你只想匹配'/roster'时，你需要使用"exact"参数
    // 则路由仅匹配'/roster'而不会匹配'/roster/2'
    <Route exact path='/roster'/>

    注意：在匹配路由时，React Router只关注location的路径名。当URL如下时：
    http://www.example.com/my-projects/one?extra=false
    React Router去匹配的只是'/my-projects/one'这一部分。

    七 匹配路径
    path-to-regexp 包用来决定route元素的path参数与当前location是否匹配。它将路径字符串编译成正则表达式，并与当前location的路径名进行匹配比较。除了上面的例子外，路径字符串有更多高级的选项，详见[path-to-regexp文档]。
    当路由地址匹配成功后，会创建一个含有以下属性的match对象：

    url ：与当前location路径名所匹配部分
    path ：路由的地址
    isExact ：path 是否等于 pathname
    params ：从path-to-regexp获取的路径中取出的值都被包含在这个对象中
    使用route tester这款工具来对路由与URL进行检验。

    注意：本例中路由路径仅支持绝对路径[注
    [4] 当需要支持相对路径的<Route>与<Link>时，你需要多做一些工作。相对<Link>将会比你之前看到的更为复杂。因其使用了父级的match对象而非当前URL来匹配相对路径。

    八 创建你的路由
    可以在路由器(router)组件中的任意位置创建多个<Route>，但通常我们会把它们放在同一个位置。使用<Switch>组件来包裹一组<Route>。<Switch>会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染。
    对于本网站，我们希望匹配一下路径：

    / ： 主页
    /roster ： 团体列表
    /roster/:number ：运动员页面，使用运动员的编号作为标识
    /schedule ：团队的赛程表
    为了在应用中能匹配路径，在创建<Route>元素时必须带有需要匹配的path作为参数。
    <Switch>
        <Route exact path='/' component={Home}/>
        {/* both /roster and /roster/:number begin with /roster */}
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/>
    </Switch>

    九 <Route>是如何渲染的？
    当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。
    1、component ： 一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，其为component参数所对应的React组件（使用React.createElement创建）。
    2、render ： 一个返回React element的函数[注5]。当匹配成功后调用该函数。该过程与传入component参数类似，并且对于行级渲染与需要向元素传入额外参数的操作会更有用。

        [5] 这是一个本质上无状态的函数组件。内部实现，component参数与render参数的组件是用很大的区别的。使用component参数的组件会使用React.createElement来创建元素，使用render参数的组件则会调用render函数。如果我们定义一个内联函数并将其传给component参数，这将会比使用render参数慢很多。

        <Route path='/one' component={One}/>
        // React.createElement(props.component)
        <Route path='/two' render={() => <Two />}/>
        // props.render()


    3、children ： 一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。
    
    1、<Route path='/page' component={Page} />

    2、const extraProps = { color: 'red' }
    <Route path='/page' render={(props) => (
    <Page {...props} data={extraProps}/>
    )}/>

    3、<Route path='/page' children={(props) => (
    props.match
        ? <Page {...props}/>
        : <EmptyPage {...props}/>
    )}/>
    通常component参数与render参数被更经常地使用。children参数偶尔会被使用，它更常用在path无法匹配时呈现的'空'状态。在本例中并不会有额外的状态，所以我们将使用<Route>的component参数。

    通过<Route>渲染的元素会被传入一些参数。分别是match对象，当前location对象[注6]以及history对象（由router创建）[注7]。
        [6] <Route>与<Switch>组件都会带有location参数。这能让你使用与实际location不同的location去匹配地址。
        [7] 可以传入staticContext参数，不过这仅在服务端渲染时有用。

    十 <Main>
    现在我们清楚了根路由的结构，我们需要实际渲染我们的路由。对于这个应用，我们将会在<Main>组件中渲染<Switch>与<Route>，这一过程会将route匹配生成的HTML放在<main>节点中。
    import { Switch, Route } from 'react-router-dom'
    const Main = () => (
        <main>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/roster' component={Roster}/>
                <Route path='/schedule' component={Schedule}/>
            </Switch>
        </main>
    )
    注意：主页路由包含额外参数。该参数用来保证路由能准确匹配path。

    十一 嵌套路由
    运动员路由/roster/:number并未包含在上述<Switch>中。它由<Roster>组件负责在路径包含'/roster'的情形下进行渲染。
    在<Roster>组件中，我们将为两种路径进行渲染：

    /roster  ：对应路径名仅仅是/roster时，因此需要在exact元素上添加exact参数。
    /roster/:number ： 该路由使用一个路由参数来获取/roster后的路径名。
    const Roster = () => (
        <Switch>
            <Route exact path='/roster' component={FullRoster}/>
            <Route path='/roster/:number' component={Player}/>
        </Switch>
    )
    组合在相同组件中分享共同前缀的路由是一种有用的方法。这就需要简化父路由并且提供一个区域来渲染具有相同前缀的通用路由。
    例如，<Roster>用来渲染所有以/roster开始的全部路由。
    const Roster = () => (
        <div>
            <h2>This is a roster page!</h2>
            <Switch>
            <Route exact path='/roster' component={FullRoster}/>
            <Route path='/roster/:number' component={Player}/>
            </Switch>
        </div>
    )

    十二 路径参数
    有时路径名中存在我们需要获取的参数。例如，在运动员界面，我们需要获取运动员的编号。我们可以向route的路径字符串中添加path参数
    如'/roster/:number'中:number这种写法意味着/roster/后的路径名将会被获取并存在match.params.number中。
    例如，路径名'/roster/6'会获取到一个对象：{ number: '6' } // 注获取的值是字符串类型的

    <Player>组件可以使用props.match.params对象来确定需要被渲染的运动员的数据。
    // 返回运动员对象的API
    import PlayerAPI from './PlayerAPI'
    const Player = (props) => {
        const player = PlayerAPI.get(
            parseInt(props.match.params.number, 10)
        )
        if (!player) {
            return <div>Sorry, but the player was not found</div>
        }
        return (
            <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>{player.position}</h2>
            </div>
        )
    }
    你可以通过阅读path-to-regexp文档来了解更多。https://github.com/pillarjs/path-to-regexp#parameters

    除了<Player>组件，我们的页面还包含<FullRoster>, <Schedule>以及 <Home>组件。
    const FullRoster = () => (
        <div>
            <ul>
            {
                PlayerAPI.all().map(p => (
                <li key={p.number}>
                    <Link to={`/roster/${p.number}`}>{p.name}</Link>
                </li>
                ))
            }
            </ul>
        </div>
        )
        const Schedule = () => (
        <div>
            <ul>
            <li>6/5 @ Evergreens</li>
            <li>6/8 vs Kickers</li>
            <li>6/14 @ United</li>
            </ul>
        </div>
        )
        const Home = () => (
        <div>
            <h1>Welcome to the Tornadoes Website!</h1>
        </div>
    )

    十三 Link
    现在，我们应用需要在各个页面间切换。如果使用锚点元素（就是）实现，在每次点击时页面将被重新加载。React Router提供了<Link>组件用来避免这种状况的发生。当你点击<Link>时，URL会更新，组件会被重新渲染，但是页面不会重新加载。

    import { Link } from 'react-router-dom'
    const Header = () => (
    <header>
        <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/roster'>Roster</Link></li>
            <li><Link to='/schedule'>Schedule</Link></li>
        </ul>
        </nav>
    </header>
    )
    <Link>使用'to'参数来描述需要定位的页面。它的值即可是字符串也可是location对象（包含pathname，search，hash与state属性）。
    如果其值为字符串将会被转换为location对象。
    <Link to={{ pathname: '/roster/7' }}>Player #7</Link> 注意：本例的link的pathname属性只能是绝对路径[注4]。

    十四 例子 
    一个完整的网站例子
        // For this demo, we are using the UMD build of react-router-dom
        const {
        HashRouter,
        Switch,
        Route,
        Link
        } = ReactRouterDOM

        // A simple data API that will be used to get the data for our
        // components. On a real website, a more robust data fetching
        // solution would be more appropriate.
        const PlayerAPI = {
        players: [
            { number: 1, name: "Ben Blocker", position: "G" },
            { number: 2, name: "Dave Defender", position: "D" },
            { number: 3, name: "Sam Sweeper", position: "D" },
            { number: 4, name: "Matt Midfielder", position: "M" },
            { number: 5, name: "William Winger", position: "M" },
            { number: 6, name: "Fillipe Forward", position: "F" }
        ],
        all: function() { return this.players},
        get: function(id) {
            const isPlayer = p => p.number === id
            return this.players.find(isPlayer)
        }
        }

        // The FullRoster iterates over all of the players and creates
        // a link to their profile page.
        const FullRoster = () => (
        <div>
            <ul>
            {
                PlayerAPI.all().map(p => (
                <li key={p.number}>
                    <Link to={`/roster/${p.number}`}>{p.name}</Link>
                </li>
                ))
            }
            </ul>
        </div>
        )

        // The Player looks up the player using the number parsed from
        // the URL's pathname. If no player is found with the given
        // number, then a "player not found" message is displayed.
        const Player = (props) => {
        const player = PlayerAPI.get(
            parseInt(props.match.params.number, 10)
        )
        if (!player) {
            return <div>Sorry, but the player was not found</div>
        }
        return (
            <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>Position: {player.position}</h2>
            <Link to='/roster'>Back</Link>
            </div>
        )
        }

        // The Roster component matches one of two different routes
        // depending on the full pathname
        const Roster = () => (
        <Switch>
            <Route exact path='/roster' component={FullRoster}/>
            <Route path='/roster/:number' component={Player}/>
        </Switch>
        )

        const Schedule = () => (
        <div>
            <ul>
            <li>6/5 @ Evergreens</li>
            <li>6/8 vs Kickers</li>
            <li>6/14 @ United</li>
            </ul>
        </div>
        )

        const Home = () => (
        <div>
            <h1>Welcome to the Tornadoes Website!</h1>
        </div>
        )

        // The Main component renders one of the three provided
        // Routes (provided that one matches). Both the /roster
        // and /schedule routes will match any pathname that starts
        // with /roster or /schedule. The / route will only match
        // when the pathname is exactly the string "/"
        const Main = () => (
        <main>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/roster' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
            </Switch>
        </main>
        )

        // The Header creates links that can be used to navigate
        // between routes.
        const Header = () => (
        <header>
            <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/roster'>Roster</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
            </nav>
        </header>
        )

        const App = () => (
        <div>
            <Header />
            <Main />
        </div>
        )

        // This demo uses a HashRouter instead of BrowserRouter
        // because there is no server to match URLs
        ReactDOM.render((
        <HashRouter>
            <App />
        </HashRouter>
        ), document.getElementById('root'))


    十五 获取路由
    希望当下你已准备好深入构建你自己的网站了。

    我们已经了解了构建网站所需要的所有必须组件（<BrowserRouter>, <Route>, 以及 <Link>）。
    当然，还有一些我们没有涉及的组件。
    所幸React Router拥有优质的文档，你可以查看并从中了解更多的信息。文档也提供一系列的例子与源代码。
    https://reacttraining.com/react-router/web/guides/quick-start