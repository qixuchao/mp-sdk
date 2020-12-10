import { MODEL_NAME, UNION_TIMEOUT } from '../../config';

// https://support.google.com/adsense/answer/1354736?hl=zh-Hans
// <ins class="adsbygoogle" style="display:block">
// adsbygoogle.push({ad_slot:'2656940006'})
// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  Union.register('google', {
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    sandbox: false,
    onInit(data, { onLoaded, onError }) {
      const ins = document.createElement('ins');
      ins.classList.add('adsbygoogle');
      ins.style.cssText = 'display:block';
      this.$container.appendChild(ins);
      window.addEventListener('message', e => {
        console.log(e.target.location.href);
      });
      onLoaded();
    },
    onShow() {
      let extendedFields = {};
      try {
        extendedFields = JSON.parse(this.data.consumer.extended_fields);

        setTimeout(() => {
          (adsbygoogle = window.adsbygoogle || []).push({
            params: {
              google_full_width_responsive: true,
              ...extendedFields,
              google_ad_slot: this.data.consumer.consumerSlotId || '2656940006'
              // google_ad_client: this.data.consumer.extended_fields || 'ca-pub-6438262210043494'
              // google_ad-format:"auto" ,
              // google_full_width_responsive:"true",
              //  google_ad_channel: '',
              // google_ad_width:'',
              // google_ad_height:''
            }
          });
        }, 1000);
        this.log('imp');
      } catch (e) {
        console.error(e);
      }
    }
  });
};
// });
