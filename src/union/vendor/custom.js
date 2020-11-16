/* global window */
import { withIframeRenderAd } from '../../utils/index';

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
    }
  });
};
