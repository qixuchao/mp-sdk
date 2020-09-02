import { each } from '../../utils/index';
import logger from '../../logger';

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
      window.TencentGDT = window.TencentGDT || [];
      var timeout = setTimeout(() => {
        onTimeOut();
        clearInterval(timeout);
        timeout = null;
      }, 10 * 1000);

      // 广告初始化
      window.TencentGDT.push({
        placement_id: data.consumerSlotId, // {String} - 广告位id - 必填
        app_id: data.appid, // {String} - appid - 必填
        type: 'native', // 原生模板：native、激励视频：rewardVideo
        // banner：banner广告 interstitial：插屏广告 。 banner、插屏广告必须填写display_type，具体值见各个广告文档说明。
        // display_type: 'banner',
        // containerid: this.id,
        count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
        onComplete: res => {
          clearInterval(timeout);
          if (Array.isArray(res)) {
            onLoaded();
            window.TencentGDT.NATIVE.renderAd(res[0], this.id);
            this.onShow();
          } else {
            logger.info('无广告');
            this.logError(10000);
            onTimeOut();
            // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
            // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
            // setTimeout(function () {
            //   window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
            // }, 3000);
          }
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
