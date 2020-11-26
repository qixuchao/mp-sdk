# 优量汇源码解读

## 说明
暴露全局变量有：
 - `TencentGDT.NATIVE` 供外部调用
 - `TencentGDT.TN ` 供模板调用
 - `GDT` 内部调用

### TencentGDT.NATIVE
| 属性名称      | 参数                                           | 说明                                            |
| ------------- | ---------------------------------------------- | ----------------------------------------------- |
| loadAd        | function(placement_id:string)                  | 加载广告                                        |
| loadCallback  | function(pid:string,data:object,config:object) | 供外部加载广告之后，回调将信息回注到 TencentGDT |
| doExpose      |                                                |                                                 |
| renderAd      |                                                |                                                 |
| rewardVideoAd |                                                |                                                 |


### TencentGDT.TN
| 属性名称 | 参数 | 说明 |
| -------- | ---- | ---- |
| doExpose |      |      |
| doClick  |      |      |
| adClose  |      |      |

### GDT
| 属性名称    | 参数 | 说明 |
| ----------- | ---- | ---- |
| loadGDT     |      |      |
| closeWindow |      |      |
| showWindow  |      |      |
| init        |      |      |
GDT在gdtlib和qps脚本加载之后会重新覆盖，同时会扩展更多属性和方法


### GDT_HYB
原生广告调用api

## 生命周期
广告sdk初始化完成 jsinited   
GDT 初始化完成


## 其他
- 同一个广告位请求个数： `18`
- 同一个页面请求广告最大次数 `300`