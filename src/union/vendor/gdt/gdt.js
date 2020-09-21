/* global window */
import logger from '../../../logger';
import { UNION_TIMEOUT } from '../../index';
import GdtManager from './GdtManager';

/**
 * 渲染逻辑上有点怪异，必须先定义TencentGDT，再加载js。js而且不能重复加载。
 * 不渲染的也需要提前定义，再通过loadAd加载，然后通过之前定义onComplete重新渲染
 */
// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  Union.register('gdt', {
    src: '//qzs.qq.com/qzone/biz/res/i.js',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      var timeout = setTimeout(() => {
        console.log('timeout');
        onTimeOut('10002');
        clearInterval(timeout);
        timeout = null;
      }, UNION_TIMEOUT);

      GdtManager().bindSlot(data.consumerSlotId, this.id, status => {
        clearInterval(timeout);
        if (status) {
          onLoaded();
        } else {
          logger.info('无广告');
          console.log(timeout);
          onTimeOut('10000');
        }
      });
    },
    onBeforeMount() {},
    onMounted() {
      GdtManager().bindEvent(Union);
    },
    onShow() {
      if (window.GDT && window.GDT.getPosData) {
        const adMaterialData = window.GDT.getPosData(
          this.data.consumer.consumerSlotId
        );

        if (adMaterialData && adMaterialData.data) {
          const materialReportData = {
            title: adMaterialData.data[0].txt,
            desc: adMaterialData.data[0].desc,
            imgList: [adMaterialData.data[0].img, adMaterialData.data[0].img2]
          };
          this.log('imp', { EXT: materialReportData });
        }
      }
    },
    getWeight() {},
    reload(data) {
      GdtManager().loadAd(data.consumerSlotId);
    }
  });
};
//});
