### 使用说明

1. 使用纯JS AJAX模拟提交
2. 因浏览器会报跨域错误，所以必须将静态页面放置在同一个域名下使用
3. 如果确认服务端不存在跨域限制，无需放置同一域名下

### 安装说明

- **下载uniHTML**

```
# uniHTML2 based on vue2
git clone -b v1.0 --depth=1 https://github.com/ibzero/uni_html2.git
# uniHTML3 based on vue3
git clone -b v2.2 --depth=1 https://github.com/ibzero/uniHTML3.git
```

- **初始化uniHTML 安装所需依赖**

uniHTML2 based on vue2

```
npm install
npm i element-ui -S
npm install babel-plugin-component -D
npm install axios --save
```

uniHTML3 based on vue3

```
npm install
npm install element-plus --save
npm install babel-plugin-component -D
npm install axios --save
```

- **下载uni_apitool对应版本，并覆盖到对应目录**

```
https://github.com/ibzero/uni_apitool/archive/v1.0.zip
```

- **运行或构建**

```
# 在线运行
npm run serve
# 本地构建静态文件，目录：dist/apitool
npm run build
```