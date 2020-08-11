/* gloabl window */
import { MODEL_NAME, MEDIA_CONFIG_NAME } from './config';
import { each } from './utils/index';
import { isUndefined, isFunction, isPlainObject } from './utils/type';
import Union from './union/index';
import Slot from './Slot';

class Mp {
  Ver = '__VERSION__';

  constructor(slots) {
    // 广告位实例对象
    this.slots = {};
    this.init(slots);
  }

  init(slots) {
    // 广告位配置信息
    this._originalList = slots;
    // 覆盖原有对象
    window[MODEL_NAME] = this;

    // 转化媒体配置
    this.MEDIA_CONFIG = {};

    this.config = window[MEDIA_CONFIG_NAME].config || {};

    this.parseMediaConfig(window[MEDIA_CONFIG_NAME]);

    this.handler(this._originalList);
  }
  /**
   * 解析媒体配置文件
   * @param {Object} slotInfo
   *            {String} slotInfo.slotId
   *            {Boolean} slotInfo.isConcurrent //是否开启并发，开启并发后，所有的消耗方会同时请求，没有开启时，默认根据消耗方的权重随机选择一个消耗方。
   *            {Number} slotInfo.priorityPolicy // 开启并发时有效， 0 表示时间优先，哪个消耗方先返回用哪个消耗方，1 或 2表示权重随机，返回成功的消耗方里，根据权重随机选择一个消耗方。
   *            {Array}  slotInfo.slotBidding
   *                        {Number} slotInfo.slotBidding.weight  权重，在整个slotBidding中权重之和占比是它真实权重。
   *                        {Object} slotInfo.slotBidding.consumer
   *                        {Object} slotInfo.slotBidding.consumer.timeOut  超时时间
   *                        {Object} slotInfo.slotBidding.consumer.consumerType  消耗方类型
   *                        {Object} slotInfo.slotBidding.consumer.consumerSlotId  //消耗方广告位ID，用来调用消耗方各自接口使用的广告位ID
   *            {Array}  slotInfo.trackingData
   * 
   * @example
   * 
   *  {
      "vendorId": 192,//请求ftx广告的sid
      "slotBiddings": [

          {
              "slotId": "17002",//后台广告位ID，里面会有多个消耗方
              "isConcurrent":false,//是否开启并发，开启并发后，所有的消耗方会同时请求，没有开启时，默认根据消耗方的权重随机选择一个消耗方。
              "priorityPolicy":0,// 开启并发时有效， 0 表示时间优先，哪个消耗方先返回用哪个消耗方，1 或 2表示权重随机，返回成功的消耗方里，根据权重随机选择一个消耗方。
              "slotBidding": [
                  {
                      "adKey": 3017029,
                      "geoCode": [],
                      "hour": [],
                      "weight": 30,//消耗方的权重,所有的weight加起来占比表示所占权重。
                      "consumer": {
                          "timeOut": 50,
                          "consumerType": "ptgapi",//消耗方类型
                          "consumerSlotId": "36281732"//消耗方广告位ID，用来调用消耗方各自接口使用的广告位ID
                      },
                      "trackingData": {
                          "bidTracking": "http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/b?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=",//开始请求
                          "errorTracking": "http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/e?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=",//请求返回失败，包括请求成功但是广告数组为0
                          "impTracking": "http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/i?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=",//广告展现
                          "clickTracking": "http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/c?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=",//广告点击
                          "bidSucTracking": "http://t2.fancyapi.com/NTAwMDAwMDAwMg68af/NTAwMDAwMDAwMg68af/s?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o="//广告返回成功
                      }
                  }
              ]
          }
        ],
    "config": {
      "geoParserUrl": "http://ugo.xiawan8.com/public/whereami",
      "geoParserToken": "25b83539e0806d57b3a595d92a9f76b8",
      "ptgApiUrl": "http://g.fancyapi.com/s2s?",//请求ftx的域名
      "antiSpamUrl": "http://antispam.fancyapi.com/score",//反作弊
      "policyVersion": 3365//配置文件版本号
    }
  }
   */
  parseMediaConfig(config = {}) {
    // 转化媒体配置
    this.MEDIA_CONFIG = {};
    if (config.slotBiddings) {
      each(config.slotBiddings, slotBidding => {
        this.MEDIA_CONFIG[slotBidding.slotId] = slotBidding;
      });
    }
  }
  /**
   * @param {Object|Function}  params 支持对象和方法
   *    Object
   *        params.slotId  {String} 广告位id
   *        params.container {String} 广告位选择器
   *        params.fallback {Function} 广告无填充回调
   *
   *    Funciton 待sdk初始化之后执行，如果已经初始化，则立即执行
   *
   * */
  push(params) {
    this.handler([params]);
  }

  handler(slots) {
    each(slots, slot => {
      if (isFunction(slot)) {
        slot.call(this, {
          union: {
            register: Union.register,
            use: Union.use
          },
          utils: {}
        });
      } else if (isPlainObject(slot)) {
        if (!isUndefined(slot.id)) {
          if (isUndefined(this.slots[slot.id]) || slot.force) {
            if (this.MEDIA_CONFIG[slot.id]) {
              // 这里应该去请求广告位，然后调用填充方法
              this.fillAd(
                slot.container,
                {
                  ...this.MEDIA_CONFIG[slot.id],
                  id: slot.id
                },
                slot.force
              );
            } else {
              console.error(`Slot configuration does not exist,id：${slot.id}`);
            }
          } else {
            console.error(`Slotid "${slot.id}" already exists`);
          }
        } else if (!isUndefined(slot.mediaid) && !isUndefined(slot.secret)) {
          if (isUndefined(this.mediaid)) {
            this.mediaid = slot.mediaid;
            this.secret = slot.secret;
          } else {
            console.error(`mediaid "${slot.id}" already exists`);
          }
        }
      }
    });
  }
  /**
   * 广告填充
   * @param {String} container
   * @param {Object} slotConfig
   * @param {Boolean} force 强制渲染
   */
  fillAd(container, slotConfig, force) {
    // 强制渲染先移除前一个广告
    if (this.slots[slotConfig.id] && force) {
      this.slots[slotConfig.id] = this.slots[slotConfig.id].reload();
    } else {
      this.slots[slotConfig.id] = new Slot(container, slotConfig, this.config);
    }
  }
}

export default Mp;
