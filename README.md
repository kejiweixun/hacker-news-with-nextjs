自学前端, 亲自写项目可能是最好的学习方法, 这是我写的第三个网站.

学了 Nextjs, 这是一个基于 react 的 server side rendering 框架, 先简单看了一遍官方文档, 因为经常看 hacker news, 所以决定用它的 api 模仿着写一个 HN 网站. 我写的前两个项目都是 react 静态网站, 没有数据请求, 但 Nextjs 是 ssr 框架, 在服务端完成数据请求并渲染成 html 文件之后再返回给客户端, 所以写一个有数据请求的网站更能体现 nextjs 的特性.

live demo (要科学上网, HN 以及 HN 的 api 默认无法在国内访问, 所以没有部署到国内的云服务商):
- 部署在[谷歌 App Engine](https://hacker-news-with-nextjs.appspot.com/)


# 收获

- 在 Github issue 反映与 Firebase 有关的 bug
- HN API 有 bug, 发邮件和 HN 确认
- Nextjs: getInitialProps, SSR, routing, jsx
- js: recursive function, promise
- React: useEffect, dangerouslySetInnerHtml
- Google Cloud 部署
- 优化: lighthouse


## 第一次在 Github issue 反映 bug

nextjs 的主要维护者是一个云服务提供商, 有一个叫 now 的云服务平台, 在国内可以正常访问, 也可以在服务器端顺利请求 HN 的 api, 但 now 和 firebase 有冲突, 我在 nextjs 的 issue 留言[反映了这个问题](https://github.com/zeit/now/issues/1830#issuecomment-526880788), 作者表示找到了问题的来源, 但[暂时还没有解决](https://github.com/zeit/node-file-trace/issues/58). 而 HN 的 api 是托管在 firebase 的, 所以我[部署到 now 的版本](http://hacker-news.kejiweixun.now.sh/)没有用 firebase 的 sdk 发起数据请求, 用的是 nextjs 官方文档推荐的通用的 isomorphic-unfetch, 但 isomorphic-unfetch 请求 firebase 的数据经常失败, HN 也建议结合 firebase SDK 使用它的 api.

firebase 官方文档有[使用方法](https://firebase.google.com/docs/database/web/read-and-write), 具体到这个网站, 请求 firebase 的 api 需要先 `npm i firebase`, 然后在相关的 component 中:
```
// 不应该把整个 firebase 都 import 进来
// 只须 import 需要使用的模块
import firebase from 'firebase/app';
import 'firebase/database';
// 没有这个条件可能会出错
if(firebase.apps.length){
  firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com'
  })
};
const root = firebase.database().ref('v0');
// 用 once 监听 value 事件, 表示读取一次数据
// once 的结果习惯叫 snapshot
root.child('topstories')
.once('value')
.then(snap => snap.val())
```

## 关于 HN API

HN API 设计得并不好, 我写的这个网站在打开评论数较多的帖子时速度有点慢, 1.5s 到 3s 都有可能, 有时候甚至更久, 因为帖子的 json 数据没有评论, 只有评论的 id, 而且只是一级评论的 id, 根据这些 id 逐一发送请求, 而这些一级评论的 json 数据也没有评论, 只有子评论的 id, 所以获取子评论需再逐一发送请求, 这样不断递归, 直到没有子评论.

HN API 另一个问题是有 bug, 请求数据有时候会返回 null, 或有些本应该有的 property 却没有, 导致我写的网站大多时候能正常访问, 但当遇到这些意外情况就会崩溃. 一开始我以为是网络问题, 后来我怀疑是不是我使用 firebase sdk 的方法不对? 反复确认 firebase 的文档, 感觉没有问题. 最后给 HN 发邮件询问返回 null 是不是正常现象, 对方回复: That does happen on occasion, and we periodically back-fill those missing items. If you notice some that you’d like us to fix right away, feel free to email (we’ve updated this one). Sorry for the trouble! The next version of the API won’t have this bug. 确认是 api 的问题之后, 我在网站中添加了处理这是意外情况的代码, 避免崩溃.

虽然设计得不好, 但 HN 的 API 除了发帖\登录这些功能没法实现之外, 可以实现 Hacker News 的大部分功能. 它提供了一个实时更新的最大的 item id, 根据这个 id 可以往后查询所有历史 id 的数据, 基于我目前的编程知识, 我想应该可以自己搭建一个 node 服务器, 提前把这些数据都 request 下来, 保存成包含子评论, 而不是子评论 id 的 json 文件, 并根据需要对这些数据提前处理, 然后再提供给我的网站使用. 事实上 HN 有一些[第三方 api](https://node-hnapi.herokuapp.com), 我想应该是这样实现的吧.

## SSR vs. CSR

Nextjs 是 SSR 框架, 它有一个叫 getInitialProps 的函数, 翻译过来就是 "获取初始数据", 即在 server 端渲染 html 文件之前, 先执行这个函数, 通常把 data fetching 之类的操作放在这个函数执行, 然后根据这些获得的数据渲染出完整的 html 文件再 response 给浏览器. 如果 getInitialProps 中的 data fetching 需要比较多的时间, 那用户就要等比较多的时间. getInitialProps 对应 react 的 componentDidMount, 只是后者是 CSR, 即 componentDidMount 里面的函数 (例如 data fetching 等) 是在浏览器端执行, 当然 componentDidMount 和 getInitialProps 可以一起用, 但 nextjs 的 component 分为两类: pages component, 普通 component, getInitialProps 只能用在 pages component, 不能用在普通 component.

另外 getInitialProps 也能运行在客户端, 当通过 `<Link>` 模块或 next 的 router api (如 Router.push) 跳转页面时, getInitialProps 就会在浏览器运行. 在 getInitialProps 中添加 console.log('something...'), 页面初始加载时这个 log 会显示在服务器的 terminal, 点击 `<Link>` 跳转, 这个 log 会显示在浏览器的 console, 而不会显示在服务器端. 像刷新页面, 直接输入 url 访问, 通过 `<a>` 跳转等, 都在服务器端运行. 当 getInitialProps 在浏览器运行, 这就不算 SSR 了, SSR 就是浏览器发送请求, 服务器返回完整的 html.

还有一种情况, 当禁用浏览器的 js 功能, 通过 Link 跳转的页面其 getInitialProps 也不能在浏览器运行, 但用 nextjs 写的网站会智能地切换到 SSR, 通过 Link 跳转的页面其 getInitialProps 也会自动切换到服务器运行, 具体到我模仿的这个 HN 网站, 禁用 js 基本无影响.

所以既然要写一个 SSR 网站, 为什么有些时候还是用 `<Link>` 而不用 `<a>` 呢? `<Link>` 可以实现所谓的 client side transitions, 类似 react-router, 看起来有多个页面, 实际上是一个单页面应用, 所以 nextjs 也可以写 SPA. 另外通过 Link 跳转的页面默认启用 pre fetching, 即在打开这个页面前, 就先把这些页面的 js 文件下载下来, 虽然打开页面后还要等浏览器请求完数据才会显示, 但速度确实更快点. 由于 Link 是 client side routing, 所以只应该放内部链接, 外链应该用 a, 否则会有黄色警示. Link 跳转页面没有进度条之类的提示, 可以用 nprogress 结合 nexjs 的 router evnet 实现 Link 跳转显示进度条. 用 Link 还有一个好处, 因为 Link 的页面的 getInitialProps 在浏览器运行, 所以如果通过 nextjs 的 export 导出 static 页面, 这些页面刷新一下就能显示最新的内容.

出于好奇, 我模仿写的这个网站有两个页面分别用了 SSR 和 CSR, 如果链接中有 csr 字样即表示这个页面的数据通过 CSR 获取. 事实上这个网站的 CSR 页面不是纯粹的 CSR, 因为 nextjs 在 build 的时候, 会把没有使用 getInitialProps 的网页进行 pre render. 

SSR 点击链接后需要等一会, 但跳转后马上看到完整的页面, CSR 相反, 点击后马上跳转, 但先是显示空白, 等一会再显示完整内容.
![nextjs-hacker-news](https://i.imgur.com/iRBsECE.png)

写 SSR 网站既要写前端, 也要写后端, 但 nextjs 自带了一套后端系统, 所以我们只要写前端代码即可, 后端交给 nextjs, 当然 nextjs 也允许开发者对后端进行自定义.

nextjs 以 SSR 闻名, 但它也是一个 static generator, 可以通过 export 导出静态网页, 这意味着用 nextjs 写出来的网站可以没有后端系统, 直接部署到 CDN 都行. 但 static generator 可能有更好的选择, 例如 gatsby 以及 react-static 等, 所以如果一开始就打算写静态网站, 例如个人博客, 我想用 gatsby 更好. 对于我模仿写的这个 HN 网站并不适合导出为 static, 尽管可以. PS, 原版 HN 就是 SSR.

谷歌有一篇标题为 [Rendering on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web) 的文章很有参考意义, 文章最后用一张图概括了多种 render 方式的特点:
![different render methods](https://developers.google.com/web/updates/images/2019/02/rendering-on-the-web/infographic.png)

这些概念有点乱, 各有各的说法, 结合我自己的理解, 我总结了一下: 
- pre render: [react-snap](https://web.dev/prerender-with-react-snap), 注意和 static render 区分;
- static render: gatsby, nextjs export, react-static, fast FP FCP TII, 一个页面一个 static html, 可以部署在 CDN;
- server render: nextjs, fast FP FCP, slow TTFB;
- client render: 所有逻辑, 数据请求, 模板, 路由等, 都通过 js 在浏览器处理.

static render 和 pre render 的区别可以通过禁用 js 进行判断, 禁用 js 后, static render 基本没有影响, 因为网页的互动已经不怎么需要运行 js, 而 pre render 虽然在 csr 的基础上提高了 FP 和 FCP 时间, 但需要在浏览器执行完 js 文件之后才能具备互动能力, 因为 url 跳转这些主要和 html 有关, 所以通常链接可以点.

- 我写的第一个网站: 纯 csr, 禁了浏览器的 js 后, 整个页面空白;
- 我写的第二个网站: csr + pre render(react-snap), 禁了 js 后, 还能显示页面, 因为 html 采取 prerende, 并且这个 html 文件的 `<img>` 元素告诉了浏览器可以在哪里获取图片, 所以 pre render 的网站禁了 js 还能看到图片文字, 但和 js 有关的操作不能用, 例如 react-router 的 HashRouter, 所以我部署到 github page 的版本点顶部的导航菜单无反应;
- 我写的第三个网站: 即这个 HN 网站, ssr + pre render + csr, 禁了 js 对 ssr 部分无影响, 而 csr 部分无法显示内容.

## 关于 nextjs 的 routing

Nextjs 内置了路由功能, 写 Nextjs 网站要添加一个叫 pages 的文件夹, 这个 pages 里面的每一个 component 就是一个页面, 比如 pages/a.js 这个部件就可以直接通过 `example.com/a` 访问, pages 之外的 component 没有这种特权. 除了 pages, 通常还要创建一个叫 static 的文件夹, 它也有特定意义, 用于存放媒体资源\css 等静态文件, 在任意 component 使用这些文件, 都只要 `import "static/pic.jpg"` 这样写即可, 从 static 写起.

对于 `example.com/a/b` 这种路由, 可以通过在 pages 文件夹中再添加一个叫 a 的文件夹, 然后在 a 文件夹中创建一个 b.js 模块. 也可以创建一个 [anyName].js 的模块, 这样 `example.com/a/b`, `example.com/a/c`, `example.com/a/d` 等链接都会自动匹配 pages/a/[anyName].js 这个文件, 这里的 anyName 表示你可以给这个文件起任意名字. 这个功能叫 dynamic routing.

在 Link 模块跳转 dynamic 模块需要添加 as 属性: `<Link href='/a/[anyName]' as='/a/b'></Link>`

在 component 主体我们可以通过 useRouter 获取链接的 query 和 path 信息, 在 getInitialProps 函数中, query, pathname, asPath 作为参数传入.
```
import {useRoute} from 'next/router';
const id = useRouter().query.id;
const path = id = useRouter().pathname;
const pathAndId = useRouter().asPath;
```

create-react-app 和 react-router-dom 都支持设置 baseurl, 即可通过 kejiweixun.com/hacker-news 这种域名访问网站, 但 nextjs 不支持.

## 关于 nextjs 的 jsx

jsx 默认只作用于它所在的 component, 可以通过 global 属性使这些 css rules 突破这个 component 的界限, 从而影响到其他引入了这个 component 的 component. 

要使一些 css rules 作用于整个网页页面(通常一个页面由多个 component 组成), 例如规定 base font size, 设置 background 等, 其中一种方法是在 next/header 的 `<Header>` 模块中加入 style 元素, 然后把包含这个 Header 模块的 component 引入到页面模块中.

nextjs github 的 wiki 栏目对这个问题有[详细说明](https://github.com/zeit/next.js/wiki/Global-styles-and-layouts).

## js recursive function, promise

这个网站有三个重要递归, 第一二个体现在[帖子的评论页](https://hacker-news-with-nextjs.appspot.com/item?id=20847508), 第三个体现在[评论的子评论页](https://hacker-news-with-nextjs.appspot.com/itemcsr?id=20855275). [第一个递归](https://github.com/kejiweixun/hacker-news-with-nextjs/blob/b334d6202454586889a45c4ab04e31cf1fc0f2a1/lib/getItem.js#L48)写在 getInitialPros, 用于获取这个帖子的所有评论. [第二个递归](https://github.com/kejiweixun/hacker-news-with-nextjs/blob/b334d6202454586889a45c4ab04e31cf1fc0f2a1/components/CommentList.js#L65)是根据获取的评论, 按照层级一层一层地显示出来, 这个递归递的是 component, component 也只不过是一个函数. [第三个递归](https://github.com/kejiweixun/hacker-news-with-nextjs/blob/b334d6202454586889a45c4ab04e31cf1fc0f2a1/lib/getItem.js#L20)也写在 getInitialPros, 用于把每一条评论和它对应的帖子 id 和标题绑定在一起, 每条评论都有自己[单独的页面](https://hacker-news-with-nextjs.appspot.com/itemcsr?id=20855275), 这个页面顶部有一个 on 的链接, 链接指向它对应的帖子, 所以要把每个评论和它对应的帖子绑定在一起.

还有[第四个递归](https://github.com/kejiweixun/hacker-news-with-nextjs/blob/b334d6202454586889a45c4ab04e31cf1fc0f2a1/components/CommentList.js#L13), 每条评论都有一个折叠的小按钮, 折叠后显示这个评论有多少条子评论.

有些递归写起来并不直观. 递归有点像循环, 写递归函数通常只需要考虑两个循环, 写第一个循环的时候, 就像写普通函数, 不要想什么递归, 就想我这是写普通函数, 通常第一个循环差不多结束时, 就会进入第二个循环, 这时会很自然地调用自己, 然后这就是递归了. 注意递归要有终止条件, 也就是说要有一个什么时候不再递归的条件.

HN 托管在 firebase 的 API 在国内的访问速度有点慢, 不过得益于 promise 异步函数, 虽然有时候打开一个帖子要请求数百次, 但通常都能在 3s 内完成. Promise.all 可以实现当所有 promise 都 resolve 或 reject 之后再执行下一步操作. promise.all() 接收一个数组作为参数, 这个数组的每一个元素都是 promise, promise.all() 的结果是一个 promise, 这个 promise resolve 出来的结果是一个数组. 用 promise 需要注意的是, 每一个 then 都要 return. await 后面的 promise 如果第一次 resolve 出来的结果也是一个 promise, 那这个新的 promise 会继续 resolve 下去, 总之 await 后面的 promise 会一直 resolve 到不是 promise 为止.

## 加深对 react 的理解

正如正面说过的, 我用 CSR 的方式写了两个页面, 这两个页面用 [useEffect()](https://github.com/kejiweixun/hacker-news-with-nextjs/blob/master/pages/askcsr.js) 请求 API 以获取数据.

useEffect() 接收一个函数作为参数, 这里把这个函数称作 effect 函数, effect 函数只能返回一个函数, 或者什么到不返回, 即返回 undefined. effect 函数经常会在里面调用一个 async 函数, async 函数调用后会返回一个 promise, 所以 effect 函数不能 return someAsyncFunction(), 应该 someAsyncFunction(). 正如前面所说, effect 函数要不什么都不 return, 即 return undefined, 要不 return 一个函数, 这个函数是所谓的 clean up 函数, 大概是当 component unmount 前执行, 这个函数通常用来告诉 useEffect: 这个 component unmount 之后就不要再 setData 啦, 这样浪费资源啊. 

useEffect 可以接收第二个参数, 这个参数要用数组的形式传入, 通常把某个或某些变量写在这个数组中, 它的作用和 componentDidUpdate 类似, 即当这个数组里面的值发生变化时, 即使 component 没有 mount 或 unmount, 只要这个数组里的值 update 了, 就执行 effect 函数, 这个数组可以是一个空数组, 作用是: effect 函数只有当 componentDidMount 时才执行, componentDidUpdate 时不会执行. 一个 component 里可以使用多个 useEffect, 所以可以分别控制哪些 effect 函数可以在哪些时候执行.

关于 useEffect 的 clean up 函数, github 的一个 [issue](https://github.com/facebook/react/issues/14326) 有参考价值.

前面我说过, 我对一个 component 用了递归, 这个 component 用于渲染一个评论, 递归之后就能按照层级渲染这个评论及其每一级的子评论, 每条评论都有一个用于折叠的小按钮, 而这个 component 是一个有 state 的 component, 递归之后每个评论的 state 是互相独立的吗? 是的, 每递归一次都是独立的.

请求回来的评论是 html, 可以用 dangerouslySetInnerHtml 把它嵌入到 DOM 中, 在对 dangerouslySetInnerHtml 中的 html 进行 style 时遇到了问题, nextjs 的 jsx 在 dangerouslySetInnerHtml 所在的 component 似乎无法对 dangerouslySetInnerHtml 的 html 中的子元素进行单独选中, 后来通过把这些 css 放在 next/header 的 `<Header>` 模块中的 [global jsx](https://github.com/kejiweixun/hacker-news-with-nextjs/blob/b334d6202454586889a45c4ab04e31cf1fc0f2a1/components/Meta.js#L36)解决.

一个有趣的细节是, react 将要取消对 javascript:void(0) 的支持. 评论的折叠按钮需要绑定一个事件, 我一开始用 `<span></span>` 元素包裹这个按钮, 后来发现不能通过键盘的 Tab 键选中, 于是把它改为 `<a></a>` 元素, 具体是 [`<a onClick={...} href='javascript:void(0)'>`](https://github.com/kejiweixun/hacker-news-with-nextjs/commit/7335067b72513d8eba3558cf57c88a51b6840141), 当我了解到 javascript:void(0) 将要被 react 取消支持, 于是改成了 [`<a onClick={(e) => {e.preventDefault();...}} href='#'>`](https://github.com/kejiweixun/hacker-news-with-nextjs/commit/bb43ee69c26ea4fba140d319566dc13ef3185234).

## 部署到 Google Cloud

部署到 Google Cloud 的 App Engine 需要注意端口, 其他都很简单. 具体点说, 先在电脑安装并设置 [google cloud sdk](https://cloud.google.com/sdk/docs/), 然后在项目根目录创建 app.yaml, 最后在根目录处 `gcloud app deploy` 即可.

gcloud 会自动在根目录创建 .gcloudignore 文件, 会自动把 node_modules 加入去, 建议自己手动创建 .gcloudignore, 除了 node_modules 之外再加上添加 .next 文件夹, 然后在 package.json 添加 `"gcp-build": "npm run build"` 这行 script, script 中还要有 start 命令: `"start": "next start -p $PORT"`.

我猜过程是这样的: gcloud 会把除了 node_modules 等被 ignore 的文件上传到服务器, 然后自觉地 npm i, 然后如果发现有 gcp-build, 就执行 gcp-build, 如果没有, 就 npm start. 前面因为我把 .next 添加到 .gcloudignore, 所以在服务器端通过 `"gcp-build": "npm run build"` 生成 .next.

nextjs 如果没有指定端口, npm start 之后就默认在 3000 端口工作, 我测试过发现这样无法访问, App Engine 貌似要在 8081 端口才能正常工作, 所以可以明确端口是 8081, 好像 8080 也可以, 或用 $PORT 等它自己决定. $PORT 是 nextjs 的要求, 如果你在 gcp 部署自己的 node 服务器, 用 `process.env.PORT`.


## 根据 Lighthouse 优化

用 Lighthouse 跑一下分, 和官方 HN 网站得分几乎一样, performance 差不多满分, 不知道为什么, 我的网站明显没有官方的快, 我猜可能是 api 以及我的网络的问题, 毕竟 firebase 无法在国内访问. Accessibility 不合格, 只有四十多分, 主要是因为导航按钮\链接等可以点击的地方设计得太小了, 这可以理解, 确实小, 确实不利于在手机上操作. 

SEO 分数也只有六十多, 其中一个原因是没有强制 https, 搜了一下发现可以在 app.yaml 添加下面的 handler 开启强制 https, 还提示没有 description metadata, 所以在 `<Header>` 添加了 `<meta name='Discription' content='hacker news in nextjs, by kejiweixun'/>`, 没想到 Description 要大写开头. 操作完这两个问题, SEO 分数已经达到七十多.
```
handlers:
- url: /.*
  script: auto
  secure: always
  redirect_http_response_code: 301
```

其他问题改起来伤筋动骨, 不改了, 至少已经比官方 HN 高分了, 这些问题并不妨碍 HN 成为一个优秀的网站. 事实上就在我写这个 README 的昨天, HN 的用户开了一个[新的帖子](https://hacker-news-with-nextjs.appspot.com/itemcsr?id=20854214), 大赞 HN 简洁的设计, 楼主表示: 他现在在一个网速很慢的国家, 那些所谓的现代网站大多打不开了, 但 HN 还是那么流畅, loads instantly.

所以什么才是 Accessibility?