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

// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  Union.register('baidu', {
    src: '//cpro.baidustatic.com/cpro/ui/cm.js',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      (window.slotbydup = window.slotbydup || []).push({
        id: data.consumerSlotId,
        container: this.id,
        async: true
      });
      // 检测广告位
      let timeOut;
      let timer = setInterval(() => {
        if (this.$container && this.$container.querySelector('iframe')) {
          onLoaded();
          clearTimeout(timeOut);
          timeOut = null;
          clearInterval(timer);
          timer = null;
        }
      }, 350);

      timeOut = setTimeout(function () {
        onTimeOut();
        clearInterval(timer);
        timer = null;
      }, (data.timeOut || 10) * 1000);
    },
    onMounted() {
      this.onShow()
    },
    onShow(){
      this.log('imp')
    },
  });
};
// });
