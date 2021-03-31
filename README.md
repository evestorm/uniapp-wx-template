# uniapp-wx-template

## 介绍

[uni-app](https://uniapp.dcloud.io/) 搭建的 [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/) 项目模板。

## 框架搭建步骤

[框架搭建笔记](./note/NOTE.md)

## 项目安装与开发

```bash
npm i
```

### 本地开发

```bash
npm run dev:mp-weixin
```

此时项目根目录下会生成 `dist/dev/mp-weixin` 目录，打开你的小程序，选择创建小程序，目录选择 `dist/dev/mp-weixin` ，AppID 生成测试号，点击创建即可：

![创建小程序](./note/images/create-wx-miniapp.png)

### 编译生产环境代码

```bash
npm run build
```

### 更新项目

cli 创建的项目，编译器安装在项目下。并且不会跟随 HBuilderX 升级。如需升级编译器，执行 npm update，或者手动修改 package.json 中的 uni 相关依赖版本后执行 npm install。更新后可能会有新增的依赖并不会自动安装，手动安装缺少的依赖即可。

### VUE/CLI 配置

详情查看 [Configuration Reference](https://cli.vuejs.org/config/)。
