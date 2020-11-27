meida-prime
====

## 开发
```js
 npm run dev
```
开发调试支持两种模式：示例模式和仿真模式
- 示例模式：访问examples中示例页面，进行调试操作，由于部分消耗方在域名申请过程中有绑定关系，在本地访问无法出广告，只能通过绑定host来解决。
- 仿真模式：配置[media-preme-sdk]()替换媒体资源链接，通过媒体环境和调用关系进行调试，替换的资源地址，应该media目录下的文件而不是直接访问mp，否则会丢失配置信息。   
localhost:10001/media/xxx.js 通过服务访问，会自动将配置信息和sdk打包输出，固media目录下只需要存放媒体消耗方配置信息

## 发布
```js
 npm run build
```

## 使用
```html
<div class="._1gho6uvlbfj"></div>
<script type="text/javascript">
    (window.M$P = window.M$P || []).push({
        id: "222",
        container: "._1gho6uvlbfj",
        fallback:function(){

        }
    });
</script>
<!-- 多条广告如下脚本只需引入一次 -->
<script type="text/javascript" src="//static.xxx.com/m/mp.js" async="async" defer="defer" >
</script>
```

```js
(window.M$P = window.M$P || []).push({
    id: "222",
    container: "._1gho6uvlbfj",
    fallback:function(){

    }
});
//// H5 SDK接入全局只需运行一次
 (function() {
    var doc = document, 
    fs = doc.getElementsByTagName('script')[0], 
    s = doc.createElement('script');
    s.async = true; 
    s.src = '//static.xxx.com/m/mp.js';
    fs && fs.parentNode.insertBefore(s, fs);
})();
```

## 开发
```
npm run dev 
// OR
yarn run dev
```



```
npm run build 
// OR
yarn run build
```




## 已支持的联盟
[-] 优量汇   
[-] 百度    
