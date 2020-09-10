import { jsonp } from '../helper';
import { addParam } from '../../utils/index';
// const pkg = require('../package.json');

/**
 *
 * @param ip client
 * @param mid
 * @param uid cookie(用户标识)
 * @param si 广告位id
 * @param rr  ref
 * @param url  广告所在页面url
 * @param reqid  requestId
 * @param device_type  1(手机)
 * @param mimes  c
 * @param jsonp  callback
 * @param v  sdk version
 * @param device  sdk version
 */

export default Union => {
  Union.register('ptgapi', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      let timeout = setTimeout(() => {
        onTimeOut();
        clearTimeout(timeout);
        timeout = null;
      }, 10 * 1000);

      const queryAdMaterial = () => {
        console.log('data', data);
        const params = {
          ip: 'client',
          mid: data.vendorId || '209',
          si: data.slotId || '17012',
          rr: location.href,
          secure: 1,
          reqid: data.requestId,
          device_type: 1,
          mimes: 'img,c',
          device: JSON.stringify({
            height: screen.height,
            width: screen.width,
            density: 2
          }),
          v: '1.3'
        };

        const url = 'https://g132.test.amnetapi.com/s2s';
        jsonp(addParam(url, params), data => {
          clearTimeout(timeout);
          if (Array.isArray(data.ad) && data.ad.length && data.ad[0].src) {
            this.$container.innerHTML = data.ad[0].src;
            onLoaded();
          }
        });
      };

      queryAdMaterial();
    },
    onMounted() {}
  });
};
