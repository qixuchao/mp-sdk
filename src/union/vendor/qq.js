import { MODEL_NAME } from '../../config';

// (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {
export default Union => {
  Union.register('qq', {
    src: '//qzs.qq.com/qzone/biz/res/i.js',
    sandbox: false,
    onInit(data, { onMounted, onTimeOut }) {
      window.TencentGDT = window.TencentGDT || [];
      // 广告初始化
      window.TencentGDT.push({
        placement_id: data.consumerSlotId, // {String} - 广告位id - 必填
        app_id: data.appid, // {String} - appid - 必填
        type: 'native', // {String} - 原生广告类型 - 必填
        count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
        onComplete: res => {
          if (res && res.constructor === Array) {
            // res[0] 代表取广告数组第一个数据
            // containerId：广告容器ID
            window.TencentGDT.NATIVE.renderAd(res[0], this.id);

            onMounted();
          } else {
            // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
            // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
            setTimeout(function () {
              // window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
            }, 3000);
          }
        }
      });
    }
  });
};
//});
