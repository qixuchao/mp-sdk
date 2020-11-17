/* global window */
import { withIframeRenderAd, addEventListener } from '../helper';
import { each } from '../../utils/index';
import checkVisible from '../../checkVisible/index';

export default Union => {
  Union.register('custom', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      setTimeout(onLoaded);
    },
    onBeforeMount() {
      const slotId = this.requestData.slotId;

      let iframeStyle = '';

      if (slotId === '150001') {
        iframeStyle = 'padding: 0;height: 59px';
      } else if (slotId === '150004') {
        iframeStyle = 'padding: 0;height: 169px';
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

        addEventListener(iframeDocument, 'click', () => {
          this.onClick();
        });

        const imgList = iframeDocument.querySelectorAll('img');
        if (imgList.length) {
          clearInterval(timer);
          checkVisible(this.$container, () => {
            const materials = [];
            const clickUrl = iframeDocument
              .querySelector('a')
              .getAttribute('href');
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
          });
        }
      }, 300);
    }
  });
};
