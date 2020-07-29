import { MODEL_NAME } from '../../config';

/*
<div class="_1gho6uvlbfj"></div>
<script type="text/javascript">
    (window.slotbydup = window.slotbydup || []).push({
        id: "u6181548",
        container: "_1gho6uvlbfj",
        async: true
    });
</script>
<!-- 多条广告如下脚本只需引入一次 -->
<script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/cm.js" async="async" defer="defer" >
</script>
*/

(window[MODEL_NAME] || []).push(({ union }) => {
  union.register('baidu', {
    src: '//cpro.baidustatic.com/cpro/ui/cm.js',
    onInit(data) {
      (window.slotbydup = window.slotbydup || []).push({
        id: data.consumerSlotId,
        container: '_1gho6uvlbfj',
        async: true
      });
    }
  });
});
