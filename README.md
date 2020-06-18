# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

## 从 Vue 全家桶切换过来的感悟

在使用 antd-design-pro 和 umi 之前，我是使用过，create-react-app 这个脚手架的，但是初始化完 V4 的 pro 的模板项目后我还是懵逼了。最主要的就是没有提供相关的文档说明，比如 src 下各个文件夹的作用和他们之间是如何让连接在一起工作的。下面我将以我的视角试着解释下各个文件夹的功能和怎么组合在一起工作的。

## 目录

项目的根目录没有什么可说的，和@vue/cli 创建的不同，但是也能看懂，多了 ts 方面和 prettier 的配置，我自己添加了 cz，用来规范自己的提交信息格式。

## dva

这个是必须要介绍的内容，因为`pro`里面到处充斥着`connect`这样的写法，看起来一脸懵逼

官方的解释是`dva = React-Router + Redux + Redux-saga`，在我看来这个东西就属于一个路由+状态管理，只不过这个状态管理不好理解，这时候感觉 React 没有官方的工具就显得轮子多了，据我所知就有好几种状态管理的方案，有选择困难症的同学压力很大。

### Model

在我看来就是组件中的数据和方法，在 dva 中通过将 component 和 model 分离的方式来管理视图，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions。

model 中有一个全局的 namespace，这个让我感觉到了和 vuex 的不同，Vue 项目中只有很少的一部分会用到全局的数据（比如用户登录信息），而 dva 的理想状态下是所有页面的状态都放在全局下，统一管理，这个确实比 Vue 的方式要统一一些，不过代价不小，如果我们目前的项目页面状态都采用这种方式的话，应该会很难受。

#### state

就是一份 Model 的状态数据，通常表现为一个 javascript 对象（当然它可以是任何值）,操作的时候每次都要当作不可变数据（immutable data）来对待，保证每次都是全新对象，没有引用关系，这样才能保证 State 的独立性，便于测试和追踪变化。

#### dispatch

这个概念也比较容易理解，就是通过 dispatch 发起一个 action，这个 action 有两种，分为同步的 Reducers 和异步的 Effects(副作用），effects 流向 Reducers 最终改变 State。

#### subscription

订阅现在使用的比较少，没有搞懂具体使用场景。

#### effects

处理异步操作和业务逻辑，较常用的是 call 、 put 和 select

- call 用来发起异步逻辑的调用，比如 IO 操作或者 http 请求
- put 是用来触发 action 更新 state 的
- select 用于从 state 里获取数据

```
yield put({ type: 'todos/add', payload: 'Learn Dva' });
const result = yield call(fetch, '/todos');
const todos = yield select(state => state.todos);

```

### connect

model 和 Vuex 是很相似的，容易理解，connect 这个概念是以前没有遇到过的。 我第一时间看不明白，在去查看了 redux 的文档过后，我知道了是把 model 中的 state 通过 props 的方式传递给 component ，然后 component 通过 dispatch 来更新 state，注意这里一般都是页面级的 Component，由页面级的继续把 state 分发给纯组件。

下面分析下`src/pages/user/login/index.tsx`最后的 connect

```
export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
```

`login, loading`属于全局下的 dva state，然后通过`userLogin`和`submitting`注入到了`Login`组件中，供组件使用，下面就是在组件中通过 props 获取 connect 传进来的状态数据

```
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
```

![](https://i.loli.net/2020/06/18/JbBjWrUspduwRym.png)

## layouts

## pages
