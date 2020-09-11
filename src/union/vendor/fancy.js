/* global window */
import { jsonp } from '../helper';
import { addParam, macroReplace } from '../../utils/index';
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

      const queryAdMaterial = () => {
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

        const trackingClickUrl = encodeURIComponent(
          macroReplace(this.data.trackingV2Data.clickTracking[0], {
            DATA: this.requestData
          })
        );

        const replaceMacro = (target, macro, replacestr) => {
          const reg = new RegExp(macro, 'g');
          return target.replace(reg, replacestr);
        };

        jsonp(addParam(url, params), data => {
          clearTimeout(timeout);
          if (Array.isArray(data.ad) && data.ad.length && data.ad[0].src) {
            const htmlStr = replaceMacro(
              data.ad[0].src,
              '__M_PRECLICK__ ',
              trackingClickUrl
            );
            console.log(htmlStr);
            this.$container.innerHTML = htmlStr;
            onLoaded();
          } else {
            onTimeOut();
            this.logError(10000);
          }
        });
      };
      queryAdMaterial();
    },
    onMounted() {},
    onShow() {
      this.log('imp');
    }
  });
};
