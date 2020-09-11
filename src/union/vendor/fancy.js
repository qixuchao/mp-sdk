/* global window */
import { addParam, macroReplace, jsonp, each } from '../../utils/index';
import { UNION_TIMEOUT } from '../index';

const url = 'https://g.fancyapi.com/s2s';
// const testUrl = 'https://g132.test.amnetapi.com/s2s';

export default Union => {
  Union.register('ptgapi', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      let timeout = setTimeout(() => {
        onTimeOut();
        clearTimeout(timeout);
        timeout = null;
      }, UNION_TIMEOUT);

      const params = {
        ip: 'client',
        mid: data.appId,
        si: data.consumerSlotId,
        rr: window.location.href,
        secure: 1, // https
        reqid: this.requestId,
        device_type: 1, //移动端
        mimes: 'img,c',
        rsize: `${this.slotSize.width}*${this.slotSize.height}`, // 广告位容器的尺寸
        device: JSON.stringify({
          height: screen.height,
          width: screen.width,
          density: 2
        }),
        v: '__VERSION__'
      };

      const trackingClickUrls = [];
      each(this.data.trackingV2Data.clickTracking, trackingUrl => {
        const url = macroReplace(trackingUrl, {
          DATA: this.requestData,
          REQUESTID: this.requestId
        });

        trackingClickUrls.push(url);
      });

      jsonp(addParam(url, params), data => {
        clearTimeout(timeout);
        if (Array.isArray(data.ad) && data.ad.length && data.ad[0].src) {
          const htmlStr = macroReplace(data.ad[0].src, {
            M_PRECLICK: JSON.stringify(trackingClickUrls)
          });
          this.$container.innerHTML = htmlStr;
          onLoaded();
        } else {
          onTimeOut();
          this.logError(10000);
        }
      });
    },
    onMounted() {},
    onShow() {
      this.log('imp');
    }
  });
};
