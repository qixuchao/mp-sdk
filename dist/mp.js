(function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  const MODEL_NAME = 'M$P';

  const isUndefined = value => value === undefined;
  /*
   * isFunction(class Any{})
   * // => true
   *
   * isFunction(() => {})
   * // => true
   *
   * isFunction(async () => {})
   * // => true
   *
   * isFunction(function * Any() {})
   * // => true
   *
   * isFunction(Math.round)
   * // => true
   *
   * isFunction(/abc/)
   * // => false
   */

  const isFunction = value => typeof value === 'function';
  const toString = Object.prototype.toString;

  function getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }

  const isPlainObject = value => {
    if (getTag(value) !== '[object Object]') {
      return false;
    }

    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    let proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  };

  const each = (list, callback) => {
    if (list) {
      if (Array.isArray(list)) {
        list.forEach(callback);
      } else if (isPlainObject) {
        for (let key in list) {
          callback && callback(list[key], key);
        }
      }
    }
  };

  /**
   * 通过权重计算使用消耗方
   * @param {Array} consumers
   *
   * @returns [Array]
   */

  function getConsumerByweight(consumers) {
    let maxWeightConsumers = [];
    let maxWeight = 0;
    each(consumers, ({
      weight = 0,
      ...consumer
    }, index) => {
      // 需要根据环境进行加权和减权
      if (weight > maxWeight) {
        maxWeight = weight;
        maxWeightConsumers = [consumer];
      } else if (weight === maxWeight) {
        maxWeightConsumers.push(consumer);
      }
    });
    return maxWeightConsumers;
  }

  class Slot {
    constructor(container, options = {}) {
      this.container = container;
      this.$container = document.querySelector(container);
      this.options = options;
      this.status = '0';

      if (options.isConcurrent) {
        this.consumers = options.slotBidding;
      } else {
        this.consumers = getConsumerByweight(options.slotBidding);
      } // 已经加载消耗方个数


      this.loadedConsumerNumber = 0;
    }

  }

  class Mp {
    constructor(slots) {
      this.slots = {};
      this.init(slots);
    }

    init(slots) {
      this._slots = slots;
      this.handler(this._slots); // 覆盖原有对象

      window[MODEL_NAME] = this._p = {
        push: this.push
      };
    }
    /**
     * @param {Object|Function}  params 支持对象和方法
     *    Object
     *        params.slotId
     *        params.container
     *
     *    Funciton 待sdk初始化之后执行，如果已经初始化，则立即执行
     *
     * */


    push(params) {
      if (isFunction(params)) {
        params.call(this);
      } else if (isPlainObject(params)) {
        this.handler([params]);
      }
    }

    handler(slots) {
      if (slots) {
        slots.forEach(slot => {
          if (isUndefined(this.slots[slot.id])) {
            // 这里应该去请求广告位，然后调用填充方法
            this.fillAd(slot.container, {
              id: slot.id
            });
          } else {
            console.error(`slotid ${slot.id} already exists`);
          }
        });
      }
    }
    /**
     * 填充广告
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


    fillAd(container, slotInfo) {
      this.slots[slotInfo.id] = new Slot(container, slotInfo);
    }

  }

  _defineProperty(Mp, "Ver", '__VERSION__');

  /*global window */
  const _mp = window[MODEL_NAME]; // 判断是否已经存在初始化对象

  if (Array.isArray(_mp) || isUndefined(_mp)) {
    new Mp(_mp);
  }

}());
