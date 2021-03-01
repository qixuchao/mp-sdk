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
      let extended_fields = {};

      const { width, height = 240 } = this.slotSize;

      try {
        extended_fields = JSON.parse(this.data.consumer.extended_fields) || {};
      } catch (e) {}

      let iframeStyle = {
        iframeBodyCssText: 'margin: 0; box-sizing: border-box;',
        iframeCssText: `height: ${height}px;border: none; width: ${width}px`
      };

      withIframeRenderAd(extended_fields.src, `#${this.id}`, iframeStyle);
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
