
import { MODEL_NAME, UNION_TIMEOUT } from '../../config';

/* <script data-ad-client="ca-pub-6438262210043494" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */
// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  Union.register('google', {
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    sandbox: false,
    onInit(data, { onLoaded, onError }) {
      
    },
    onMounted() {},
    onShow() {
      this.log('imp');
    }
  });
};
// });
