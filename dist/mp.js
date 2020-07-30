(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
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

  var each = function each(list, callback) {
    if (list) {
      if (Array.isArray(list)) {
        list.forEach(callback);
      } else if (isPlainObject) {
        for (var key in list) {
          callback && callback(list[key], key);
        }
      }
    }
  };
  var macroReplace = function macroReplace(str) {
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

  function _send(url) {
    if (url !== '') {
      var img = document.createElement('img');

      img.onload = function () {
        img = img.onload = null;
      }; // 需要宏替换


      img.src = macroReplace(url);
    }
  }

  var logger = {
    send: function send(urls) {
      if (isString(urls)) {
        urls = [urls];
      }

      each(urls, _send);
    }
  };

  var registerQQ = (function (Union) {
    Union.register('qq', {
      src: '//qzs.qq.com/qzone/biz/res/i.js',
      sandbox: false,
      onInit: function onInit(data, _ref) {
        var _this = this;

        var onLoaded = _ref.onLoaded,
            onTimeOut = _ref.onTimeOut;
        window.TencentGDT = window.TencentGDT || [];
        var timeout = setTimeout(function () {
          onTimeOut();
          clearInterval(timeout);
          timeout = null;
        }, data.timeOut * 1000); // 广告初始化

        window.TencentGDT.push({
          placement_id: data.consumerSlotId,
          // {String} - 广告位id - 必填
          app_id: data.appid,
          // {String} - appid - 必填
          type: 'native',
          // 原生模板：native、激励视频：rewardVideo
          // banner：banner广告 interstitial：插屏广告 。 banner、插屏广告必须填写display_type，具体值见各个广告文档说明。
          // display_type:'',
          count: 1,
          // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
          onComplete: function onComplete(res) {
            clearInterval(timeout);
            onLoaded();

            if (res && res.constructor === Array) {
              // res[0] 代表取广告数组第一个数据
              // containerId：广告容器ID
              window.TencentGDT.NATIVE.renderAd(res[0], _this.id);
            } else {
              onTimeOut(); // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
              // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率

              setTimeout(function () {// window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
              }, 3000);
            }
          }
        });
      },
      onMounted: function onMounted() {}
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

  var registerBaidu = (function (Union) {
    Union.register('baidu', {
      src: '//cpro.baidustatic.com/cpro/ui/cm.js',
      sandbox: false,
      onInit: function onInit(data, _ref) {
        var _this = this;

        var onLoaded = _ref.onLoaded,
            onTimeOut = _ref.onTimeOut;
        (window.slotbydup = window.slotbydup || []).push({
          id: data.consumerSlotId,
          container: this.id,
          async: true
        }); // 检测广告位

        var timeOut;
        var timer = setInterval(function () {
          if (_this.$container && _this.$container.querySelector('iframe')) {
            onLoaded();
            clearTimeout(timeOut);
            timeOut = null;
            clearInterval(timer);
            timer = null;
          }
        }, 100);
        timeOut = setTimeout(function () {
          onTimeOut();
          clearInterval(timer);
          timer = null;
        }, data.timeOut * 1000);
      },
      onMounted: function onMounted() {}
    });
  }); // });

  var loadScript = function loadScript(src, success, fail) {
    // 寻找script，而不是直接往body中插入，避免代码在head中执行或文档不规范
    var fisrtScript = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');

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
  var createWrapper = function createWrapper() {
    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var id = arguments.length > 1 ? arguments[1] : undefined;
    var tag = document.createElement(tagName);
    tag.id = id;
    tag.style.display = 'none';
    tag.className = id;
    document.body.appendChild(tag);
    return tag;
  };

  /**
   * @type {String}
   */

  var LOGGER_TYPE = {
    bid: 'bidTracking',
    error: 'errorTracking',
    imp: 'impTracking',
    bidSuc: 'bidSucTracking'
  };
  var UNION_INDEX = 0; // 代理调用

  function proxyCall(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return isFunction(fn) && fn.apply(this, args);
  }
  /**
   * Lifecycle Hooks
   *  init
   *  mounted
   *
   */


  var Union = /*#__PURE__*/function (_Event) {
    _inherits(Union, _Event);

    var _super = _createSuper(Union);

    _createClass(Union, null, [{
      key: "use",

      /**
       * @type Boolean
       * 为什么状态值，不放到实例而是作为静态变量？
       * 因为实例的执行依赖前置的脚本加载，多个实例之间也同时这个状态。固本身这个状态跟实例无关
       * 所以采用静态变量，实例间共享。
       *
       * 如果开启沙箱模式，则忽略此字段，每次重新注入
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
      value: function use(unionKey) {
        if (!isUndefined(Union.VENDORS[unionKey]) && Union.VENDORS[unionKey] instanceof Union) {
          return Union.VENDORS[unionKey].fork();
        }
      }
    }]);

    function Union(name, options) {
      var _this;

      _classCallCheck(this, Union);

      _this = _super.call(this);

      _defineProperty(_assertThisInitialized(_this), "onLoaded", function () {
        _this.log('bidSuc');
      });

      _defineProperty(_assertThisInitialized(_this), "onMounted", function () {
        if (_this.status !== '3') {
          _this.status = '3';
          console.log('mounted');

          _this.trigger('mounted');
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onTimeOut", function () {
        console.log('timeout', _assertThisInitialized(_this));

        _this.log('error');

        _this.destroy();
      });

      _defineProperty(_assertThisInitialized(_this), "destroy", function () {
        _this.status = '10';
        _this.$container.parentNode && _this.$container.parentNode.removeChild(_this.$container);
      });

      _this.name = name;
      _this.options = options;
      _this.sandbox = _this.options.sandbox !== false;
      return _this;
    }

    _createClass(Union, [{
      key: "getContainer",
      value: function getContainer() {
        // 默认使用沙盒
        // 如果使用沙盒则不无法重复使用sdk同一份引用，则无视加载状态
        if (this.sandbox === false) {
          this.$container = createWrapper('div', this.id);
        } else {
          this.$container = createWrapper('iframe', this.id);
        }
      }
    }, {
      key: "fork",

      /**
       * 基于注册的联盟配置重新实例化
       * 保障每一个广告位实例生命周期完整
       * @param {Object}} data
       */
      value: function fork() {
        var union = new Union(this.name, this.options);
        union.index = UNION_INDEX++;
        union.id = "mp_wrapper_".concat(this.name, "_").concat(union.index);
        union.getContainer();
        return union;
      }
      /**
       *
       * @param {Object} data
       */

    }, {
      key: "run",
      value: function run() {
        var _this2 = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.data = data;
        console.log('run');

        var onInit = function onInit() {
          _this2.log('bid');

          proxyCall.call(_this2, _this2.options.onInit, {
            onTimeOut: _this2.onTimeOut,
            onLoaded: _this2.onLoaded
          });
        };

        if (Union.loaded) {
          this.trigger('init');
          onInit();
          loadScript(this.options.src, function () {
            Union.loaded = true;

            _this2.trigger('loaded');
          }, function () {
            Union.loaded = true;

            _this2.trigger('loadError');
          });
        } else {
          onInit();
        }

        return this;
      }
      /**
       * @param {String} type bid|error|imp|click|bidSuc
       */

    }, {
      key: "log",
      value: function log(type) {
        logger.send(this.data.trackingData[LOGGER_TYPE[type]]);
      }
    }, {
      key: "render",
      value: function render(selector) {
        var container = document.querySelector(selector);

        if (container) {
          this.log('imp'); // 处理不同联盟渲染在填充前预处理，保证显示正常

          proxyCall.call(this, this.options.onMounted);
          container.appendChild(this.$container);
          this.$container.style.display = 'block'; // 绑定点击事件

          if (this.sandbox) ;
        } else {
          console.error("Slot \u3010".concat(selector, "\u3011 does not exist"));
        }
      }
    }]);

    return Union;
  }(Event);

  _defineProperty(Union, "VENDORS", {});

  _defineProperty(Union, "loaded", false);

  _defineProperty(Union, "register", function (unionKey, options) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    console.log('register');

    if (isUndefined(Union.VENDORS[unionKey]) || force) {
      Union.VENDORS[unionKey] = new Union(unionKey, options);
    } else {
      console.log("Vendor ".concat(unionKey, " already exists"));
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
    var maxWeightConsumers = [];
    var maxWeight = 0;
    each(consumers, function (_ref, index) {
      var _ref$weight = _ref.weight,
          weight = _ref$weight === void 0 ? 0 : _ref$weight,
          consumer = _objectWithoutProperties(_ref, ["weight"]);

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

  var Slot = /*#__PURE__*/function () {
    function Slot(container) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Slot);

      this.container = container;
      this.$container = document.querySelector(container); // 是否并非请求

      this.isConcurrent = options.isConcurrent;
      this.priorityPolicy = options.priorityPolicy;
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

    _createClass(Slot, [{
      key: "distribute",
      value: function distribute() {
        var _this = this;

        each(this.consumers, function (con) {
          var union = Union.use(con.consumer.consumerType);
          console.log(_this, union);

          if (union) {
            union.on('init', function () {
              console.log('init');
            }).on('mounted', function () {
              _this.race(union);
            });
            union.run(con);
          } else {
            console.error("Union \u3010".concat(con.consumer.consumerType, "\u3011is not register"));
          }
        });
      }
      /**
       * 真实填充 根据配置填充策略进行选择
       *
       * 有竞速模式和随机模式
       * @param {Union} union
       */

    }, {
      key: "race",
      value: function race(union) {
        console.log(union);

        if (this.status !== '5') {
          this.status = '5';
          union.render(this.container);
        }
      }
    }]);

    return Slot;
  }();

  var Mp = /*#__PURE__*/function () {
    function Mp(slots) {
      _classCallCheck(this, Mp);

      // 广告位实例对象
      this.slots = {};
      this.init(slots);
    }

    _createClass(Mp, [{
      key: "init",
      value: function init(slots) {
        // 广告位配置信息
        this._originalList = slots; // 覆盖原有对象

        window[MODEL_NAME] = this; // 转化媒体配置

        this.MEDIA_CONFIG = {};
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

    }, {
      key: "parseMediaConfig",
      value: function parseMediaConfig() {
        var _this = this;

        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // 转化媒体配置
        this.MEDIA_CONFIG = {};

        if (config.slotBiddings) {
          each(config.slotBiddings, function (slotBidding) {
            _this.MEDIA_CONFIG[slotBidding.slotId] = slotBidding;
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

    }, {
      key: "push",
      value: function push(params) {
        this.handler([params]);
      }
    }, {
      key: "handler",
      value: function handler(slots) {
        var _this2 = this;

        each(slots, function (slot) {
          if (isFunction(slot)) {
            slot.call(_this2, {
              union: {
                register: Union.register,
                use: Union.use
              },
              utils: {}
            });
          } else if (isPlainObject(slot) && slot.id) {
            if (isUndefined(_this2.slots[slot.id])) {
              if (_this2.MEDIA_CONFIG[slot.id]) {
                // 这里应该去请求广告位，然后调用填充方法
                _this2.fillAd(slot.container, _objectSpread2(_objectSpread2({}, _this2.MEDIA_CONFIG[slot.id]), {}, {
                  id: slot.id
                }));
              } else {
                console.error("Slot configuration does not exist,id\uFF1A".concat(slot.id));
              }
            } else {
              console.error("Slotid \"".concat(slot.id, "\" already exists"));
            }
          }
        });
      }
    }, {
      key: "fillAd",
      value: function fillAd(container, slotConfig) {
        this.slots[slotConfig.id] = new Slot(container, slotConfig);
      }
    }]);

    return Mp;
  }();

  _defineProperty(Mp, "Ver", '__VERSION__');

  /*global window */
  var _mp = window[MODEL_NAME]; // 判断是否已经存在初始化对象

  if (Array.isArray(_mp) || isUndefined(_mp)) {
    new Mp(_mp);
  }

}());
