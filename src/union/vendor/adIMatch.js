/* global window */
import { withIframeRenderAd, addEventListener } from '../helper';
import { each } from '../../utils/index';
import checkVisible from '../../utils/checkVisible';
import { MODEL_NAME } from '../../config';

export default Union => {
  Union.register('custom', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onError }) {
      setTimeout(onLoaded);
    },
    onBeforeMount() {
      const slotId = this.requestData.slotId;

      let adStyle = null;
      let calcHeight = this.slotSize.height || 240;
      let extended_fields = {};

      try {
        adStyle = JSON.parse(this.data.consumer.style) || {};
        const containerWidth = this.slotSize.width || screen.width;
        calcHeight = containerWidth * (adStyle.height / adStyle.width);
      } catch (e) {}

      try {
        extended_fields = JSON.parse(this.data.consumer.extended_fields) || {};
      } catch (e) {}

      let iframeStyle = {
        iframeBodyCssText:
          'margin: 0; box-sizing: border-box; border-bottom: 1px solid #f5f5f5;',
        iframeCssText: `height: ${calcHeight}px;border: none; width: 100%`
      };

      withIframeRenderAd(
        extended_fields.src || this.data.consumer.consumerSlotId, // 兼容之前取consumerSlotId作为js地址的逻辑
        `#${this.id}`,
        iframeStyle
      );
    },
    onShow() {
      const context = document.querySelector(`#${this.id}`);

      const {
        slotId,
        consumerSlotId,
        consumerType,
        mediaId
      } = this.requestData;

      const timer = setInterval(() => {
        const iframe = context.querySelector(`iframe`);
        const iframeDocument = iframe.contentWindow.document;

        const imgList = iframeDocument.querySelectorAll('img');
        if (imgList.length) {
          clearInterval(timer);

          const logImp = () => {
            const materials = [];

            const clickUrl = iframeDocument
              .querySelector('a')
              .getAttribute('href');

            addEventListener(iframeDocument, 'click', () => {
              this.onClick();

              // 点击广告时将点击链接上报，外部如果需要可以通过window.addEventListener('message', () => {})获取
              window.postMessage(
                JSON.stringify({
                  type: 'adClick',
                  data: {
                    clickUrl,
                    isDestroyPage: !0, // 是否在跳转后销毁之前的页面
                    timestamp: +new Date()
                  }
                }),
                '*'
              );
            });

            each(imgList, img => {
              if (img && img.getAttribute) {
                materials.push(img.getAttribute('src'));
              }
            });

            const materialData = {
              title: '',
              desc: '',
              slotId,
              consumerSlotId,
              landingPageUrl: clickUrl,
              consumerType,
              mediaId,
              imgList: materials
            };

            this.onShow();

            this.log('imp', { EXT: materialData });
          };

          if (!window[MODEL_NAME].config.isCheckVisible) {
            logImp();
          } else {
            checkVisible(this.$container, () => {
              logImp();
            });
          }
        }
      }, 300);
    }
  });
};
