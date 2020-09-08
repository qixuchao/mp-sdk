import { jsonp } from '../helper';
import { addParam } from '../../utils';
const pkg = require('../package.json');

/**
 *
 * @param ip client
 * @param mid
 * @param uid cookie(用户标识)
 * @param sid 广告位id
 * @param rr  ref
 * @param url  广告所在页面url
 * @param reqid  requestId
 * @param device_type  1(手机)
 * @param mimes  c
 * @param jsonp  callback
 * @param v  sdk version
 */

export default Union => {
  Union.register('fancy', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      let timeout = setTimeout(() => {
        onTimeOut();
        clearTimeout(timeout);
        timeout = null;
      }, 10 * 1000);

      const queryAdMaterial = () => {
        const params = {
          ip: 'client',
          mid: data.vendorId,
          uid: '0bf2bfb7-0a35-4fe7-a944-5156d656ab6c',
          sid: data.slotId,
          ff: location.href,
          reqid: data.requestId,
          device_type: 1,
          mimes: 'c',
          v: pkg.version
        };

        const url = 'https://g132.test.amnetapi.com/s2s';
        const testUrl =
          'http://g132.test.amnetapi.com/s2s?rr=http%3A%2F%2Fref.example.com&size=533*800&bf=100&max=30&ip=175.160.152.73&mid=209&device_type=1&ua=Mozilla%2F5.0+%28iPhone%3B+CPU+iPhone+OS+13_2_3+like+Mac+OS+X%29+AppleWebKit%2F605.1.15+%28KHTML%2C+like+Gecko%29+Version%2F13.0.3+Mobile%2F15E148+Safari%2F604.1&url=http%3A%2F%2Fcurrent.example.com&min=15&si=17012&v=1.2.2&uid=0bf2bfb7-0a35-4fe7-a944-5156d656ab6c&mimes=img,c&device=%7b%22density%22%3a%222%22%2c%22height%22%3a640%2c%22width%22%3a100%7d';
        jsonp(testUrl, data => {
          console.log(data);
          clearTimeout(timeout);
          this.$container.appendChild('');
          onLoaded();
        });
      };
    },
    onMounted() {}
  });
};
