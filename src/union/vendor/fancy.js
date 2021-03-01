/* global window */
import { addParam, macroReplace, jsonp, each } from '../../utils/index';
import { MODEL_NAME, UNION_TIMEOUT } from '../../config';
import { addEventListener } from '../helper';

const url = 'https://g.fancyapi.com/s2s';

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

      this.slotSize.height = this.slotSize.height || 54;

      let { width = screen.width, height } = this.slotSize;

      const params = {
        ip: 'client',
        mid: data.appId || 209,
        si: data.consumerSlotId,
        rr: window.location.href,
        secure: 1, // https
        reqid: this.requestId,
        device_type: 1, //移动端
        mimes: 'img,c',
        rsize: `${width}*${height}`, // 广告位容器的尺寸
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
      // 增加广告的关闭按钮
      const contentStr =
        '<div style="position: relative">' +
        '<div class="close-icon" style="position: absolute;top: 4px; right: 4px; width: 20px; height: 20px">' +
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAJ1BMVEUAAAAAAAD///+ioqIAAAAAAAAAAAAAAAAAAAAAAAD29vabm5uTk5N7waCGAAAADXRSTlNNAP6JRBYILTgh64R/1AbgqwAAAaRJREFUSMeNl8FOwkAURW/iICBumlCQbf0BwxcMCeKWJibGnSR8ACSauMSVW1i4d82KT/DTRKb22V7b3rud0zOlzLx5g6iYwePr1Lvp+8eiNFACHzyyuJcaMH4GLHdpFTjyKMTtCCSOSdi8xhmZMjjYAJzOgsB7/JvbMjhERdYG0sQ8uYFLVGb2Fxz4atAtDGQhK8FCVubgFWrzloOrerD9C8ZoSJqByyZwloGbJrATwBiNSU9gvxmcnMAtQi73BxTS238hpHsCPUIukusiOE4+EeJ+wBFyMLkBLGdJDmIXwV6xlwSlCZODvSSiuY0EpQntudYRXPEQP9Y+gp7H+CkXIQbNxkIgxRAgJQmBNfpgJQsxwRNYyUKcYw5WshAtbMFKFqKLFVjJQrSxAStZiA48WMlCOBhoyiAkkJUmhIGcsQkpAqhOrf8Y+fPIH1z+C+VFIS8zeeHKW0HeXPJ2VQuAXFLkIiWXPbmQqqVZLvby8SEfSOoRJx+a8jGsHuxyqyA3H2o7IzdIasslN3FqW6g3mnrrqjfDenutN+z6FUC/VMjXlG8mS4Tz3LCUhQAAAABJRU5ErkJggg==" style="width: 100%"/>' +
        '</div>' +
        this.adInfo +
        '</div>';

      const iframe = document.createElement('iframe');
      iframe.width = this.slotSize.width;
      iframe.height = this.slotSize.height;
      iframe.style.cssText = 'border: none';

      this.$container.appendChild(iframe);

      const contentDoc = iframe.contentWindow.document;
      contentDoc.body.innerHTML = contentStr;

      addEventListener(iframe.contentWindow, 'message', () => {
        this.onClick();
      });

      addEventListener(contentDoc.querySelector('.close-icon'), 'click', () => {
        this.destroy();
        this.onClose();
      });
    },
    onMounted() {},
    onShow() {
      this.onShow();
      this.log('imp');
    }
  });
};
