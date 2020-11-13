/* global window */
import { addParam, macroReplace, jsonp, each } from '../../utils/index';
import { UNION_TIMEOUT } from '../index';

export default Union => {
  Union.register('adimatch', {
    src: '',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      onLoaded();
    },
    onBeforeMount() {
      let iframeStyle = 'padding: 0px 0px;';
      let iframe = document.createElement('iframe');
      iframe.style.cssText = `width: 100%;border: none;${iframeStyle}`;

      this.$container.appendChild(iframe);

      let iframeDoc = iframe.contentDocument;
      iframeDoc.body.style.cssText =
        'margin: 0; box-sizing: border-box; border-bottom: 1px solid #f5f5f5;';
      let script = iframeDoc.createElement('script');
      script.src = this.data.consumer.src;
      iframeDoc.body.appendChild(script);
    }
  });
};
