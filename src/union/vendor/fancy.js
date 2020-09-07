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
    src: '//pic.fancyapi.com/SDK/mobile/fancyapi.mobile.js',
    sandbox: false,
    onInit(data, { onLoaded, onTimeOut }) {
      var timeout = setTimeout(() => {
        onTimeOut();
        clearTimeout(timeout);
        timeout = null;
      }, 10 * 1000);
      f;
      const getMaterialSize = () => {
        const slotWidth = data.templateConfig.width;
        const slotHeight = data.templateConfig.height;
        const slotRatio = data.templateConfig.ratio;

        const screenWidth = window.innerWidth;
      };

      const queryAdMaterial = function () {
        this.$container.appendChild('');
        onLoaded();
      };
    },
    onMounted() {}
  });
};
