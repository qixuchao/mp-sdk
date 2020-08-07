meida-prime
====

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