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

## layouts

## pages
