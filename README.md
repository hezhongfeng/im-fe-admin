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

这个是必须要介绍的内容，因为`pro`里面到处充斥着`connect`这样的写法

官方的解释是`dva = React-Router + Redux + Redux-saga`，在我看来这个东西就属于一个路由+状态管理，只不过这个状态管理不好理解，这时候感觉 React 没有官方的工具就显得轮子多了，据我所知就有好几种状态管理的方案，有选择困难症的同学压力很大。

### Model

在我看来就是组件中的数据和方法，在 dva 中通过将 component 和 model 分离的方式来管理视图，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions。

model 中有一个全局的 namespace，这个让我感觉到了和 vuex 的不同，Vue 项目中只有很少的一部分会用到全局的数据（比如用户登录信息），而 dva 的理想状态下是所有页面的状态都放在全局下，统一管理，这个确实比 Vue 的方式要统一一些，不过代价不小，如果我们目前的项目页面状态都采用这种方式的话，应该会很难受。

### connect

model 和 Vuex 是很相似的，容易理解，connect 这个概念是以前没有遇到过的。 让我第一时间看不明白，在去查看了 redux 的文档过后，我知道了是把 model 中的 state 通过 props 的方式传递给 component ，然后 component 通过 dispatch 来更新 state。

```
export default connect(({ products }) => ({
  products,
}))(Products);
```

## layouts

## pages
