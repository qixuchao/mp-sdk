/* global window */
import { addParam, macroReplace, jsonp, each } from '../../utils/index';
import { UNION_TIMEOUT } from '../../config';

const url = 'https://g.fancyapi.com/s2s';
// const testUrl = 'https://g132.test.amnetapi.com/s2s';

export default Union => {
  Union.register('ptgapi', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onError }) {
      let timeout = setTimeout(() => {
        onError('10002');
        clearTimeout(timeout);
        timeout = null;
      }, UNION_TIMEOUT);

      let adStyle = null;
      let calcHeight = this.slotSize.height || 54;

      try {
        adStyle = JSON.parse(data.style) || {};
        const containerWidth = this.slotSize.width || screen.width;
        calcHeight = containerWidth * (adStyle.height / adStyle.width);
      } catch (e) {}

      const params = {
        ip: 'client',
        mid: data.appId || 209,
        si: data.consumerSlotId,
        rr: window.location.href,
        secure: 1, // https
        reqid: this.requestId,
        device_type: 1, //移动端
        mimes: 'img,c',
        rsize: `${this.slotSize.width}*${calcHeight}`, // 广告位容器的尺寸
        device: JSON.stringify({
          height: screen.height,
          width: screen.width,
          density: 2
        }),
        v: '__VERSION__'
      };

      const trackingClickUrls = [
        macroReplace(this.data.trackingV2Data.clickTracking[0], {
          DATA: this.requestData,
          REQUESTID: this.requestId
        })
      ];
      // each(this.data.trackingV2Data.clickTracking, trackingUrl => {
      //   const url = macroReplace(trackingUrl, {
      //     DATA: this.requestData,
      //     REQUESTID: this.requestId
      //   });
      //
      //   trackingClickUrls.push(url);
      // });

      jsonp(url, {
        data: params,
        callback: data => {
          clearTimeout(timeout);
          if (Array.isArray(data.ad) && data.ad.length && data.ad[0].src) {
            const htmlStr = macroReplace(data.ad[0].src, {
              M_PRECLICK: trackingClickUrls
            });
            onLoaded(htmlStr);
          } else {
            onError('10000');
          }
        }
      });
    },
    onBeforeMount() {
      this.$container.innerHTML = this.adInfo;
    },
    onMounted() {},
    onShow() {
      this.log('imp');
    }
  });
};
