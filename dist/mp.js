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

  // 全局暴露的属性名
  const MODEL_NAME = 'M$P'; // 全局暴露的配置信息

  const MEDIA_CONFIG_NAME = 'M$P_M_C';

  const isUndefined = value => value === undefined;
  const isString = value => typeof value === 'string';
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
  const macro = str => {
    return str;
  };

  class Event {
    constructor() {
      this._events = {};
    }

    on(type, handler) {
      (this._events[type] = this._events[type] || []).push(handler);
      return this;
    }

    off(type, handler) {}

    once(type, handler) {
      this.on(type, () => {});
    }

    trigger(type, data) {
      each(this._events[type], fn => {
        if (isFunction(fn)) {
          fn.call(this, data);
        }
      });
    }

  }

  function send(url) {
    if (url !== '') {
      var img = document.createElement('img');

      img.onload = function () {
        img = img.onload = null;
      }; // 需要宏替换


      img.src = macro(url);
    }
  }

  const logger = {
    send(urls) {
      if (isString(urls)) {
        urls = [urls];
      }

      each(urls, send);
    }

  };

  var registerQQ = (Union => {
    Union.register('qq', {
      src: '//qzs.qq.com/qzone/biz/res/i.js',
      sandbox: false,

      onInit(data, {
        onMounted,
        onTimeOut
      }) {
        window.TencentGDT = window.TencentGDT || []; // 广告初始化

        window.TencentGDT.push({
          placement_id: data.consumerSlotId,
          // {String} - 广告位id - 必填
          app_id: data.appid,
          // {String} - appid - 必填
          type: 'native',
          // {String} - 原生广告类型 - 必填
          count: 1,
          // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
          onComplete: res => {
            if (res && res.constructor === Array) {
              // res[0] 代表取广告数组第一个数据
              // containerId：广告容器ID
              window.TencentGDT.NATIVE.renderAd(res[0], this.id);
              onMounted();
            } else {
              // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
              // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
              setTimeout(function () {// window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
              }, 3000);
            }
          }
        });
      }

    });
  }); //});

  /*
  <div class="_1gho6uvlbfj"></div>
  <script type="text/javascript">
      (window.slotbydup = window.slotbydup || []).push({
          id: "u6181548",
          container: "_1gho6uvlbfj",
          async: true
      });
  </script>
  <!-- 多条广告如下脚本只需引入一次 -->
  <script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/cm.js" async="async" defer="defer" >
  </script>
  */
  // (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {

  var registerBaidu = (Union => {
    Union.register('baidu', {
      src: '//cpro.baidustatic.com/cpro/ui/cm.js',
      sandbox: false,

      onInit(data, {
        onMounted,
        onTimeOut
      }) {
        (window.slotbydup = window.slotbydup || []).push({
          id: data.consumerSlotId,
          container: this.id,
          async: true
        }); // 检测广告位

        let timeOut;
        let timer = setInterval(() => {
          if (this.$container && this.$container.querySelector('iframe')) {
            onMounted();
            clearTimeout(timeOut);
            timeOut = null;
            clearInterval(timer);
            timer = null;
          }
        }, 100);
        setTimeout(function () {
          onTimeOut();
          clearInterval(timer);
          timer = null;
        }, data.timeOut * 60 * 1000);
      }

    });
  }); // });

  const loadScript = (src, success, fail) => {
    // 寻找script，而不是直接往body中插入，避免代码在head中执行或文档不规范
    const fisrtScript = document.getElementsByTagName('script')[0];
    let script = document.createElement('script');

    script.onload = function () {
      script = script.onload = null;
      success && success();
    };

    script.onerror = function () {
      script = script.onerror = null;
      fail && fail();
    };

    script.src = src;
    fisrtScript.parentNode.insertBefore(script, fisrtScript);
  };

  const createWrapper = (tagName = 'div', id) => {
    const tag = document.createElement(tagName);
    tag.id = id;
    tag.style.display = 'none';
    tag.className = id;
    document.body.appendChild(tag);
    return tag;
  };
  /**
   * @type {String}
   */

  const LOGGER_TYPE = {
    bid: 'bidTracking',
    error: 'errorTracking',
    imp: 'impTracking',
    bidSuc: 'bidSucTracking'
  };
  let UNION_INDEX = 0;
  /**
   * Lifecycle Hooks
   *  init
   *  mounted
   *
   */

  class Union extends Event {
    /**
     * @type String
     * 为什么状态值，不放到实例而是作为静态变量？
     * 因为实例的执行依赖前置的脚本加载，多个实例之间也同时这个状态。固本身这个状态跟实例无关
     * 所以采用静态变量，实例间共享。
     *
     */

    /**
     *
     * @param {String} unionKey
     * @param {Object} options
     *    options.src {String}
     *    options.sandbox {Boolean} default: true
     *    options.onInit {Function}
     * @param {Boolean} force
     */
    static use(unionKey) {
      if (!isUndefined(Union.VENDORS[unionKey]) && Union.VENDORS[unionKey] instanceof Union) {
        return Union.VENDORS[unionKey].fork();
      }
    }

    constructor(options) {
      super();

      _defineProperty(this, "onMounted", () => {
        if (this.status !== '3') {
          this.status = '3';
          console.log('mounted');
          this.trigger('mounted');
        }
      });

      _defineProperty(this, "onTimeOut", () => {
        console.log('timeout');
      });

      this.options = options;
      this.sandbox = this.options.sandbox !== false;
    }

    getContainer() {
      // 默认使用沙盒
      // 如果使用沙盒则不无法重复使用sdk同一份引用，则无视加载状态
      if (this.sandbox === false) {
        this.$container = this.createDiv(this.id);
      } else {
        this.$container = this.createIframe(this.id);
      }
    }

    createIframe(id) {
      return createWrapper('iframe', id);
    }

    createDiv(id) {
      return createWrapper('div', id);
    }

    /**
     * 基于注册的联盟配置重新实例化
     * 保障每一个广告位实例生命周期完整
     * @param {Object}} data
     */
    fork() {
      const union = new Union(this.options);
      union.index = UNION_INDEX++;
      union.id = 'mp_wrapper_' + union.index;
      union.getContainer();
      return union;
    }
    /**
     *
     * @param {Object} data
     */


    run(data = {}) {
      this.data = data;
      console.log('run');

      const onInit = () => {
        isFunction(this.options.onInit) && this.options.onInit.call(this, data.consumer, {
          onMounted: this.onMounted,
          onTimeOut: this.onTimeOut
        });
      };

      if (Union.status === '0') {
        this.trigger('init');
        onInit();
        loadScript(this.options.src, () => {
          Union.status = '1';
          this.trigger('loaded');
        }, () => {
          Union.status = '2';
          this.trigger('loadError');
        });
      } else {
        onInit();
      }

      return this;
    }
    /**
     * @param {String} type bid|error|imp|click|bidSuc
     */


    log(type) {
      logger.send(this.data.trackingData[LOGGER_TYPE[type]]);
    }

    render(selector) {
      const container = document.querySelector(selector);

      if (container) {
        this.log('imp');
        container.appendChild(this.$container);
        this.$container.style.display = 'block';
      } else {
        console.error(`Slot 【${selector}】 does not exist`);
      }
    }

    destroy() {
      this.$container.parentNode.removeChild(this.$container);
    }

  }

  _defineProperty(Union, "VENDORS", {});

  _defineProperty(Union, "status", '0');

  _defineProperty(Union, "register", function (unionKey, options, force = false) {
    console.log('register');

    if (isUndefined(Union.VENDORS[unionKey]) || force) {
      Union.VENDORS[unionKey] = new Union(options);
    } else {
      console.log(`Vendor ${unionKey} already exists`);
    }
  });

  registerQQ(Union);
  registerBaidu(Union);

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
      this.distribute();
    }

    distribute() {
      each(this.consumers, con => {
        const union = Union.use(con.consumer.consumerType);

        if (union) {
          union.on('init', () => {
            console.log('init');
          }).on('mounted', () => {
            this.race(union);
          });
          union.run(con);
        } else {
          console.error(`Union 【${con.consumer.consumerType}】is not register`);
        }
      });
    }
    /**
     * 真实填充 根据配置填充策略进行选择
     *
     * 有竞速模式和随机模式
     * @param {Union} union
     */


    race(union) {
      if (this.status !== '5') {
        this.status = '5';
        union.render(this.container);
      }
    }

  }

  class Mp {
    constructor(slots) {
      // 广告位实例对象
      this.slots = {};
      this.init(slots);
    }

    init(slots) {
      // 广告位配置信息
      this._originalList = slots; // 覆盖原有对象

      window[MODEL_NAME] = this; // 转化媒体配置

      this.MEDIA_CONFIG = {};

      if (window[MEDIA_CONFIG_NAME] && window[MEDIA_CONFIG_NAME].slotBiddings) {
        each(window[MEDIA_CONFIG_NAME].slotBiddings, slotBidding => {
          this.MEDIA_CONFIG[slotBidding.slotId] = slotBidding;
        });
      }

      this.handler(this._originalList);
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
        } else if (isPlainObject(slot) && slot.id) {
          if (isUndefined(this.slots[slot.id])) {
            if (this.MEDIA_CONFIG[slot.id]) {
              // 这里应该去请求广告位，然后调用填充方法
              this.fillAd(slot.container, { ...this.MEDIA_CONFIG[slot.id],
                id: slot.id
              });
            } else {
              console.error(`slot configuration does not exist,id：${slot.id}`);
            }
          } else {
            console.error(`slotid ${slot.id} already exists`);
          }
        }
      });
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


    fillAd(container, slotConfig) {
      this.slots[slotConfig.id] = new Slot(container, slotConfig);
    }

  }

  _defineProperty(Mp, "Ver", '__VERSION__');

  /*global window */
  const _mp = window[MODEL_NAME]; // 判断是否已经存在初始化对象

  if (Array.isArray(_mp) || isUndefined(_mp)) {
    new Mp(_mp);
  }

}());
