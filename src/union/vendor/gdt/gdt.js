/* global window */
import logger from '../../../logger';
import GdtManager from './GdtManager';
import checkVisible from '../../../utils/checkVisible';
import { addParam } from '../../../utils/index';
import { setFreqControl, getFreqControl } from '../../../utils/storage';
import { MODEL_NAME, UNION_TIMEOUT } from '../../../config';

/**
 * 渲染逻辑上有点怪异，必须先定义TencentGDT，再加载js。js而且不能重复加载。
 * 不渲染的也需要提前定义，再通过loadAd加载，然后通过之前定义onComplete重新渲染
 */
let exposeCount = 0;
// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  Union.register('gdt', {
    src: '//qzs.qq.com/qzone/biz/res/i.js',
    sandbox: false,
    onLoaded() {
      GdtManager().bindGdtInit();
    },
    onInit(data, { onLoaded, onError }) {
      var timeout = setTimeout(() => {
        onError('10002');
        clearInterval(timeout);
        timeout = null;
      }, UNION_TIMEOUT);

      GdtManager().bindSlot(
        data.consumerSlotId,
        this,
        (status, adInfo, code = '10000') => {
          clearInterval(timeout);
          // return onError(code);
          if (status) {
            onLoaded(adInfo);
          } else {
            logger.info('无广告');
            onError(code);
          }
        }
      );
    },
    onBeforeMount() {},
    onMounted() {
      GdtManager().bindEvent(Union);
    },
    onShow() {
      const logImp = () => {
        if (this.adInfo) {
          const imgList = this.adInfo.img_list
            ? this.adInfo.img_list
            : [this.adInfo.img, this.adInfo.img2];

          const {
            slotId,
            consumerSlotId,
            consumerType,
            mediaId
          } = this.requestData;

          const materialReportData = {
            title: this.adInfo.txt,
            desc: this.adInfo.desc,
            imgList,
            slotId,
            consumerSlotId,
            landingPageUrl: this.adInfo.rl,
            consumerType,
            mediaId
          };

          this.onShow();

          new Image().src = addParam(this.adInfo.apurl, {
            callback: '_cb_gdtjson' + exposeCount++,
            datatype: 'jsonp'
          });
          this.log('imp', { EXT: materialReportData });
        }
      };

      if (!window[MODEL_NAME].config.isCheckVisible) {
        logImp();
      } else {
        checkVisible(this.$container, () => {
          logImp();
        });
      }
    },
    getWeight() {},
    reload(data) {
      GdtManager().loadAd(data.consumerSlotId);
    }
  });
};
//});
