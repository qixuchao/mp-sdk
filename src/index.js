/*global window */
import Mp from './Mp';
import { MODEL_NAME } from './config';
import { isUndefined } from './utils/type';

const _mp = window[MODEL_NAME];

// 判断是否已经存在初始化对象
if (Array.isArray(_mp) || isUndefined(_mp)) {
  new Mp(_mp);
}

// 以下是临时代码
window[MODEL_NAME].fillAd('.adslot', {
  slotId: '17002',
  isConcurrent: false,
  priorityPolicy: 0,
  slotBidding: [
    {
      adKey: 3017029,
      geoCode: [],
      hour: [],
      weight: 30, //消耗方的权重,所有的weight加起来占比表示所占权重。
      consumer: {
        timeOut: 50,
        consumerType: 'baidu', //消耗方类型
        consumerSlotId: '8021223221041374',
        consumerSlotId: 'u6181548',
        appid: '1110655203'
      },
      trackingData: {
        bidTracking:
          'http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/b?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=', //开始请求
        errorTracking:
          'http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/e?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=', //请求返回失败，包括请求成功但是广告数组为0
        impTracking:
          'http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/i?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=', //广告展现
        clickTracking:
          'http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/c?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=', //广告点击
        bidSucTracking:
          'http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/s?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=' //广告返回成功
      }
    }
  ]
});
