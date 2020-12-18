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

      let iframeStyle = {
        iframeBodyCssText:
          'margin: 0; box-sizing: border-box; border-bottom: 1px solid #f5f5f5;',
        iframeCssText:
          'height: 240px; padding: 0px 15px;border: none; width: 100%'
      };

      if (slotId === '150001') {
        iframeStyle.iframeCssText =
          'width: 100%;padding: 0;height: 59px; border: none;';
      } else if (slotId === '150004') {
        iframeStyle.iframeCssText =
          'padding: 0;height: 169px;border: none;width: 100%;';
      } else if (slotId === '900000066') {
        iframeStyle.iframeCssText =
          'padding: 0;height: 100%;border: none;width: 100%;';
      }

      withIframeRenderAd(
        this.data.consumer.consumerSlotId,
        `#${this.id}`,
        iframeStyle
      );
    },
    onShow() {
      const context = document.querySelector(`#${this.id}`);
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

            addEventListener(iframeDocument, 'click', e => {
              this.onClick();

              window.postMessage(
                JSON.stringify({
                  type: 'adClick',
                  data: {
                    clickUrl,
                    isDestroyPage: !0,
                    timestamp: +new Date()
                  }
                }),
                '*'
              );
            });

            window.postMessage(clickUrl, '*');

            each(imgList, img => {
              if (img && img.getAttribute) {
                materials.push(img.getAttribute('src'));
              }
            });

            const materialData = {
              title: '',
              desc: '',
              slotId: this.requestData.slotId,
              consumerSlotId: this.requestData.consumerSlotId,
              landingPageUrl: clickUrl,
              consumerType: this.requestData.consumerType,
              mediaId: this.requestData.mediaId,
              imgList: materials
            };

            this.log('imp', { EXT: JSON.stringify(materialData) });
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
