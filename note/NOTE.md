# 项目搭建笔记

## 软件安装

### 下载 HBuilderX

点击：https://www.dcloud.io/hbuilderx.html 下载正式版下的标准版。

### 下载 VSCode

前往：https://code.visualstudio.com/ 下载。

## uni-app 安装

### 环境安装

全局安装 `vue-cli`

```shell
npm install -g @vue/cli
```

### 创建项目

```shell
vue create -p dcloudio/uni-preset-vue uniapp-wx-template
```

在提示中选择 `默认模板` 后回车。

创建完毕进入项目：

```shell
cd uniapp-wx-template
```

### 安装 sass

```shell
npm i sass-loader node-sass
```

编译报错：

```shell
Syntax Error: TypeError: this.getOptions is not a function
```

解决方案：https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function

安装 `sass-loader@10.1.1`

### 导入 uni-app 官方 uni-ui 库

文档：https://ext.dcloud.net.cn/plugin?id=55

```shell
npm install @dcloudio/uni-ui -d
```

使用 `npm` 安装好 `uni-ui` 之后，需要配置 `easycom` 规则，让 `npm` 安装的组件支持 `easycom`

打开项目根目录下的 `pages.json` 并添加 `easycom` 节点：

```json
// pages.json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            // uni-ui 规则如下配置
            "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
        }
    },

    // 其他内容
    pages:[
        // ...
    ]
}
```

使用组件：

`src/pages/index/index.vue` 中使用组件。

```html
<uni-badge text="1"></uni-badge>
<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
```

### 本地预览

```bash
npm run dev:mp-weixin
```

此时项目根目录下会生成 `dist/dev/mp-weixin` 目录，打开你的小程序，选择创建小程序，目录选择 `dist/dev/mp-weixin` ，AppID 生成测试号，点击创建即可：

![创建小程序](./images/create-wx-miniapp.png)
