/* global window */
import logger from '../../../logger';
import { UNION_TIMEOUT } from '../../index';
import GdtManager from './GdtManager';
import checkVisible from '../../../utils/checkVisible';
import { addParam, getCookie, setCookie } from '../../../utils/index';
import { SLOT_COOKIE_NAME } from '../../../config';

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
    onInit(data, { onLoaded, onTimeOut }) {
      var timeout = setTimeout(() => {
        onTimeOut('10002');
        clearInterval(timeout);
        timeout = null;
      }, UNION_TIMEOUT);

      GdtManager().bindSlot(
        data.consumerSlotId,
        this,
        (status, adInfo, code = '10000') => {
          clearInterval(timeout);
          if (status) {
            onLoaded(adInfo);
          } else {
            logger.info('无广告');
            onTimeOut(code);
          }
        }
      );
    },
    onBeforeMount() {},
    onMounted() {
      GdtManager().bindEvent(Union);
    },
    onShow() {
      checkVisible(this.$container, () => {
        if (this.adInfo) {
          const imgList = this.adInfo.img_list
            ? this.adInfo.img_list
            : [this.adInfo.img, this.adInfo.img2];

          const materialReportData = {
            title: this.adInfo.txt,
            desc: this.adInfo.desc,
            imgList,
            slotId: this.requestData.slotId,
            consumerSlotId: this.requestData.consumerSlotId,
            landingPageUrl: this.adInfo.rl,
            consumerType: this.requestData.consumerType,
            mediaId: this.requestData.mediaId
          };

          let slotCookie = {};
          try {
            slotCookie = JSON.parse(getCookie(SLOT_COOKIE_NAME)) || {};
          } catch (e) {}

          (slotCookie[this.requestData.slotId] =
            slotCookie[this.requestData.slotId] || []).push(
            this.requestData.consumerSlotId
          );

          slotCookie[this.requestData.slotId] = Array.from(
            new Set(slotCookie[this.requestData.slotId])
          );
          setCookie(
            SLOT_COOKIE_NAME,
            JSON.stringify(slotCookie),
            24 * 60 * 60 * 1000
          );

          new Image().src = addParam(this.adInfo.apurl, {
            callback: '_cb_gdtjson' + exposeCount++,
            datatype: 'jsonp'
          });
          this.log('imp', { EXT: materialReportData });
        }
      });
    },
    getWeight() {},
    reload(data) {
      GdtManager().loadAd(data.consumerSlotId);
    }
  });
};
//});
