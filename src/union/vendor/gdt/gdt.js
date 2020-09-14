/* global window */
import { each } from '../../../utils/index';
import logger from '../../../logger';
import { UNION_TIMEOUT } from '../../index';
import GdtManager from './GdtManager';

/**
 * 渲染逻辑上有点怪异，必须先定义TencentGDT，再加载js。js而且不能重复加载。
 * 不渲染的也需要提前定义，再通过loadAd加载，然后通过之前定义onComplete重新渲染
 */
// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  let doClick, onClose;
  Union.register('gdt', {
    src: '//qzs.qq.com/qzone/biz/res/i.js',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      console.log('init', data.consumerSlotId);
      var timeout = setTimeout(() => {
        console.log('timeout');
        onTimeOut();
        clearInterval(timeout);
        timeout = null;
      }, UNION_TIMEOUT);

      GdtManager().bindSlot(data.consumerSlotId, this.id, status => {
        clearInterval(timeout);
        if (status) {
          onLoaded();
        } else {
          logger.info('无广告');
          this.logError(10000);
          console.log(timeout);
          onTimeOut();
        }
      });
    },
    onBeforeMount() {},
    onMounted() {
      if (doClick) {
        return;
      }
      doClick = TencentGDT.TN.doClick;
      onClose = TencentGDT.TN.adClose;

      const getUnionInstance = traceid => {
        var container = document.querySelector('div[id*="' + traceid + '"]');

        return Union.unionInstances[container.parentNode.id];
      };

      TencentGDT.TN.doClick = function (event, traceid) {
        const union = getUnionInstance(traceid);
        if (union) {
          union.onClick();
          doClick.apply(this, arguments);
        }
      };

      TencentGDT.TN.adClose = function (event, traceid) {
        const union = getUnionInstance(traceid);
        if (union) {
          union.onClose();
          onClose.apply(this, arguments);
        }
      };
    },
    onShow() {
      const context = document.querySelector(`#${this.id}`);

      const timer = setInterval(() => {
        const iframe = context.querySelector(`iframe`);

        if (iframe) {
          clearInterval(timer);
          const iframeDocument = iframe.contentWindow.document;
          const imgList = iframeDocument.querySelectorAll('img');
          const materials = [];
          each(imgList, img => {
            if (img && img.getAttribute) {
              materials.push(img.getAttribute('src'));
            }
          });

          const materialData = {
            title: '',
            desc: '',
            imgList: materials
          };

          this.log('imp', { EXT: materialData });
        }
      }, 500);
    },
    getWeight() {},
    reload(data) {
      window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
    }
  });
};
//});
