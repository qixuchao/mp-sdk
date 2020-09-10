/* mp.js v1.6.0 */
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
  var MODEL_NAME = 'M$P'; // 全局暴露的配置信息

  var MEDIA_CONFIG_NAME = 'M$P_M_C';

  var isUndefined = function isUndefined(value) {
    return value === undefined;
  };
  var isString = function isString(value) {
    return typeof value === 'string';
  };
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

  var isFunction = function isFunction(value) {
    return typeof value === 'function';
  };
  var toString = Object.prototype.toString;

  function getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }

  var isLikeArray = function isLikeArray(value) {
    return !!(value && value.length !== undefined);
  };
  var isPlainObject = function isPlainObject(value) {
    if (getTag(value) !== '[object Object]') {
      return false;
    }

    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  };

  /* gloabl window */
  var isDebug = /(localhost|127\.0\.0\.1|([192,10]\.168\.\d{1,3}\.\d{1,3}))/.test(window.location.hostname) || /_mp_debug_/.test(window.location.search);
  var each = function each(list, callback) {
    if (list) {
      if (Array.isArray(list) || isLikeArray(list)) {
        for (var i = 0; i < list.length; i++) {
          if (callback && callback(list[i], i) === false) {
            break;
          }
        }
      } else if (isPlainObject(list)) {
        for (var key in list) {
          if (callback && callback(list[key], key) === false) {
            break;
          }
        }
      }
    }
  };

  var hasOwnProperty = function hasOwnProperty(own, property) {
    return Object.prototype.hasOwnProperty.call(own, property);
  };

  var getRandom = function getRandom(min, max) {
    return Math.floor(min + Math.random() * max);
  };
  var generateName = function generateName(prefix, suffix) {
    prefix = prefix || '';
    suffix = suffix || '';
    return prefix + '_' + Math.random().toString(36).slice(-6) + '_' + suffix;
  };
  /**
   *
   * @param {String} str 需要宏替换的字符串
   * @param {Object} data 替换自定义数据
   */

  var macroReplace = function macroReplace() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      REQUESTID: ''
    };
    var needEncode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    // 内置数据
    var builtData = {
      OS: 3,
      // H5
      APP: window.location.hostname,
      IP: '127.0.0.1',
      TS: +new Date()
    };

    var encode = function encode(value) {
      if (isPlainObject(value)) {
        value = JSON.stringify(value);
      }

      return needEncode ? encodeURIComponent(value) : value;
    };

    return str.replace(/__(.*?)__/g, function (fragment) {
      var variable = fragment.match(/__(.*)__/);
      var value = builtData[variable[1]] || data[variable[1]];
      return value === undefined ? fragment : encode(value);
    });
  };
  /**
   * 将对象url参数化
   * @param  {object} paramObj 参数对象
   * @return {string}          url query param
   */

  var param = function param(obj) {
    var str = [];

    for (var i in obj) {
      if (!isUndefined(obj[i]) && hasOwnProperty(obj, i)) {
        str.push(i + '=' + encodeURIComponent(obj[i]));
      }
    }

    return str.join('&');
  };

  var extend = function extend() {
    var obj,
        args = arguments,
        i = 1,
        len = args.length,
        src = args[0],
        key; //如果只有一个参数则将这个参数合并到当前调用对象上

    if (len === 1) {
      i = 0;
      src = this;
    }

    for (; i < len; i++) {
      if (obj = args[i]) {
        for (key in obj) {
          src[key] = obj[key];
        }
      }
    }

    return src;
  };
  /**
   * 解析url
   * @param  {String}  str      需要解析的URL
   * @param {boolean} [isNoCaseSensitive] 是否不区分大小写 default:false 默认是区分的
   *                                      如果值为true，则会全部转成小写
   * @return {String}
   */


  var parseUrl = function parseUrl(str, isNoCaseSensitive) {
    var arr,
        part,
        url = {}; //去掉首位空格

    if (!(str || '').replace(/^\s+|\s+$/, '')) {
      return {};
    }

    str = str.replace(/\S*\?/, '');

    if (str) {
      if (isNoCaseSensitive) {
        str = str.toLocaleLowerCase();
      }

      arr = str.split('&');

      for (var i in arr) {
        part = arr[i].split('=');
        url[part[0]] = decodeURIComponent(part[1]);
      }
    }

    return url;
  };
  /**
   * 增加参数
   *
   * @param {string}  url
   * @param {object}  params
   * @return {String}
   */


  var addParam = function addParam(url, params) {
    var SEARCH_REG = /\?([^#]*)/,
        HASH_REG = /#(.*)/,
        searchStr;
    url = url || '';
    var search = {},
        searchMatch = url.match(SEARCH_REG);

    if (searchMatch) {
      search = parseUrl(searchMatch[0]);
    } //合并当前search参数


    search = extend.call(search, search, params);
    searchStr = '?' + param(search); //是否存在search

    if (SEARCH_REG.test(url)) {
      url = url.replace(SEARCH_REG, searchStr);
    } else {
      //是否存在hash
      if (HASH_REG.test(url)) {
        url = url.replace(HASH_REG, searchStr + '#' + url.match(HASH_REG)[1]);
      } else {
        url += searchStr;
      }
    }

    return url;
  };

  var Event = /*#__PURE__*/function () {
    function Event() {
      _classCallCheck(this, Event);

      this._events = {};
    }

    _createClass(Event, [{
      key: "on",
      value: function on(type, handler) {
        (this._events[type] = this._events[type] || []).push(handler);
        return this;
      }
    }, {
      key: "off",
      value: function off(type, handler) {}
    }, {
      key: "once",
      value: function once(type, handler) {
        this.on(type, function () {});
      }
    }, {
      key: "trigger",
      value: function trigger(type, data) {
        var _this = this;

        each(this._events[type], function (fn) {
          if (isFunction(fn)) {
            fn.call(_this, data);
          }
        });
      }
    }]);

    return Event;
  }();

  function _send(url, data) {
    if (url !== '') {
      var img = document.createElement('img');

      img.onload = function () {
        img = img.onload = null;
      }; // 宏替换


      img.src = macroReplace(url, data);
    }
  }

  var logger = {
    send: function send(urls, data) {
      if (isString(urls)) {
        urls = [urls];
      }

      each(urls, function (url) {
        return _send(url, data);
      });
    },
    info: function info() {
      if (isDebug) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        console['log'].apply(window, args);
      }
    }
  };

  /**
   * 渲染逻辑上有点怪异，必须先定义TencentGDT，再加载js。js而且不能重复加载。
   * 不渲染的也需要提前定义，再通过loadAd加载，然后通过之前定义onComplete重新渲染
   */
  // (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {

  var registerQQ = (function (Union) {
    var doClick, onClose;
    Union.register('gdt', {
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
        }, 10 * 1000); // 广告初始化

        window.TencentGDT.push({
          placement_id: data.consumerSlotId,
          // {String} - 广告位id - 必填
          app_id: data.appid,
          // {String} - appid - 必填
          type: 'native',
          // 原生模板：native、激励视频：rewardVideo
          // banner：banner广告 interstitial：插屏广告 。 banner、插屏广告必须填写display_type，具体值见各个广告文档说明。
          // display_type: 'banner',
          // containerid: this.id,
          count: 1,
          // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
          onComplete: function onComplete(res) {
            clearInterval(timeout);

            if (Array.isArray(res)) {
              onLoaded();
              window.TencentGDT.NATIVE.renderAd(res[0], _this.id);

              _this.onShow();
            } else {
              logger.info('无广告');

              _this.logError(10000);

              onTimeOut(); // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
              // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
              // setTimeout(function () {
              //   window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
              // }, 3000);
            }
          }
        });
      },
      onBeforeMount: function onBeforeMount() {},
      onMounted: function onMounted() {
        if (doClick) {
          return;
        }

        doClick = TencentGDT.TN.doClick;
        onClose = TencentGDT.TN.adClose;

        var getUnionInstance = function getUnionInstance(traceid) {
          var container = document.querySelector('div[id*="' + traceid + '"]');
          return Union.unionInstances[container.parentNode.id];
        };

        TencentGDT.TN.doClick = function (event, traceid) {
          var union = getUnionInstance(traceid);

          if (union) {
            union.onClick();
            doClick.apply(this, arguments);
          }
        };

        TencentGDT.TN.adClose = function (event, traceid) {
          var union = getUnionInstance(traceid);

          if (union) {
            union.onClose();
            onClose.apply(this, arguments);
          }
        };
      },
      onShow: function onShow() {
        var _this2 = this;

        var context = document.querySelector("#".concat(this.id));
        var timer = setInterval(function () {
          var iframe = context.querySelector("iframe");

          if (iframe) {
            clearInterval(timer);
            var iframeDocument = iframe.contentWindow.document;
            var imgList = iframeDocument.querySelectorAll('img');
            var materials = [];
            each(imgList, function (img) {
              if (img && img.getAttribute) {
                materials.push(img.getAttribute('src'));
              }
            });
            var materialData = {
              title: '',
              desc: '',
              imgList: materials
            };

            _this2.log('imp', {
              EXT: materialData
            });
          }
        }, 500);
      },
      getWeight: function getWeight() {},
      reload: function reload(data) {
        window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
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

  var registerBaidu = (function (Union) {
    Union.register('bd', {
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
        }, 350);
        timeOut = setTimeout(function () {
          onTimeOut();
          clearInterval(timer);
          timer = null;
        }, 10 * 1000);
      },
      onMounted: function onMounted() {
        this.onShow();
      },
      onShow: function onShow() {
        this.log('imp');
      }
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
   *
   * @param  {string} url  [description]
   * @param  {object||function} opts
   */

  var jsonp = function jsonp(url, opts) {
    if (isFunction(opts)) {
      opts = {
        callback: opts
      };
    }

    var callbackFnName = opts.callbackFnName || generateName('', 'jsonp');
    opts = opts || {};

    window[callbackFnName] = function (data) {
      opts.callback && opts.callback(data || {});

      try {
        delete window[callbackFnName];
      } catch (e) {}

      window[callbackFnName] = undefined;
    };

    var data = opts.data || {}; //无缓存

    data.v = Math.random().toString(36).slice(-6);
    data.jsonp = callbackFnName;
    loadScript(addParam(url, data));
  };

  /**
   *
   * @param ip client
   * @param mid
   * @param uid cookie(用户标识)
   * @param si 广告位id
   * @param rr  ref
   * @param url  广告所在页面url
   * @param reqid  requestId
   * @param device_type  1(手机)
   * @param mimes  c
   * @param jsonp  callback
   * @param v  sdk version
   * @param device  sdk version
   */

  var registerFancy = (function (Union) {
    Union.register('ptgapi', {
      src: '',
      sandbox: false,
      onInit: function onInit(data, _ref) {
        var _this = this;

        var onLoaded = _ref.onLoaded,
            onTimeOut = _ref.onTimeOut;
        var timeout = setTimeout(function () {
          onTimeOut();
          clearTimeout(timeout);
          timeout = null;
        }, 10 * 1000);

        var queryAdMaterial = function queryAdMaterial() {
          console.log('data', data);
          var params = {
            ip: 'client',
            mid: data.vendorId || '209',
            si: data.slotId || '17012',
            rr: location.href,
            secure: 1,
            reqid: data.requestId,
            device_type: 1,
            mimes: 'img,c',
            device: JSON.stringify({
              height: screen.height,
              width: screen.width,
              density: 2
            }),
            v: '1.3'
          };
          var url = 'https://g132.test.amnetapi.com/s2s';
          jsonp(addParam(url, params), function (data) {
            clearTimeout(timeout);

            if (Array.isArray(data.ad) && data.ad.length && data.ad[0].src) {
              _this.$container.innerHTML = data.ad[0].src;
              onLoaded();
            }
          });
        };

        queryAdMaterial();
      },
      onMounted: function onMounted() {}
    });
  });

  var ERROR_TYPE = {
    10000: '广告数组为空',
    10001: 'js加载失败',
    10002: '获取广告超时',
    10003: '广告异常'
  };
  /**
   * @type {String}
   */

  var LOGGER_TYPE = {
    bid: 'bidTracking',
    error: 'errorTracking',
    imp: 'impTracking',
    bidSuc: 'bidSucTracking',
    click: 'clickTracking',
    winner: 'bidSelectedTracking'
  };
  var UNION_INDEX = 0;
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
       *
       * @type Object
       * 用于存储广告位实例
       */

      /**
       * @type Object
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
       *    options.onBeforeMount
       *    options.onMounted {Function}
       *    options.getWeight {Function} 返回权重值
       * @param {Boolean} force
       */
      value: function use(unionKey) {
        if (!isUndefined(Union.VENDORS[unionKey]) && Union.VENDORS[unionKey] instanceof Union) {
          var union = Union.VENDORS[unionKey].fork();
          Union.unionInstances[union.id] = union;
          return union;
        }
      }
    }]);

    function Union(name, options) {
      var _this;

      _classCallCheck(this, Union);

      _this = _super.call(this);

      _defineProperty(_assertThisInitialized(_this), "onLoaded", function (adInfo) {
        _this.log('bidSuc', adInfo);

        _this.adInfo = adInfo;

        _this.trigger('loaded');

        _this.trigger('complete');
      });

      _defineProperty(_assertThisInitialized(_this), "onTimeOut", function () {
        console.log('timeout');

        if (_this.status === '1') {
          _this.logError(10002);

          _this.trigger('complete');

          _this.destroy();
        }
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
      /**
       * 数据加载完成
       */

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

          _this2.callHook('onInit', data.consumer || {}, {
            onTimeOut: _this2.onTimeOut,
            onLoaded: _this2.onLoaded
          });
        };

        this.trigger('init');
        onInit(); // 同类联盟代码是否已经加载

        if (Union.vendorLoaded[this.name] === 'init') {
          Union.vendorLoaded[this.name] = 'loading';
          loadScript(this.options.src, function () {
            _this2.status = '1';
            Union.vendorLoaded[_this2.name] = 'loaded';
          }, function () {
            Union.vendorLoaded[_this2.name] = 'init';

            _this2.logError(10001);

            _this2.trigger('loadError');

            _this2.trigger('complete');
          });
        } else {
          this.status = '1';
        }

        return this;
      }
    }, {
      key: "logError",
      value: function logError(code) {
        var data = {
          DATA: {
            err: code,
            errorMessage: ERROR_TYPE[code]
          }
        };
        this.log('error', data);
      }
      /**
       * @param {String} type bid|error|imp|click|bidSuc
       * @param extralData  额外的上报数据，上报imp时增加广告位素材的上报
       */

    }, {
      key: "log",
      value: function log(type) {
        var extralData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var data = {
          REQUESTID: this.requestId,
          // 一次广告加载周期内（从bid到bidsuc到imp）的上报请求该字段需保持一致，可以按如下规则生成：slotId-consumerSlotId-ts-(100以内随机数)
          DATA: _objectSpread2(_objectSpread2({}, this.requestData), extralData.DATA),
          EXT: extralData.EXT
        };
        var trackingData = this.data.trackingV2Data || this.data.trackingData;
        var trackingUrl = trackingData[LOGGER_TYPE[type]];
        logger.send(trackingUrl, data);
      }
    }, {
      key: "render",
      value: function render(selector) {
        this.log('winner');
        var container = document.querySelector(selector);

        if (container) {
          // 处理不同联盟渲染在填充前预处理，保证显示正常
          this.callHook('onBeforeMount');
          container.appendChild(this.$container);
          this.$container.style.display = 'block'; // 处理不同联盟渲染在填充前预处理，保证显示正常

          this.callHook('onMounted');
        } else {
          console.error("Slot \u3010".concat(selector, "\u3011 does not exist"));
        }
      }
    }, {
      key: "hasReload",
      value: function hasReload() {
        if (this.reload) {
          this.reload(this.data.consumer);
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "callHook",
      value: function callHook(fnName) {
        var fn = this.options[fnName];

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return isFunction(fn) && fn.apply(this, args);
      }
    }, {
      key: "onClick",
      value: function onClick() {
        console.log('click');
        this.log('click');
      }
    }, {
      key: "onClose",
      value: function onClose() {
        this.trigger('close');
      }
    }, {
      key: "onShow",
      value: function onShow() {
        this.callHook('onShow');
      }
    }]);

    return Union;
  }(Event);

  _defineProperty(Union, "VENDORS", {});

  _defineProperty(Union, "unionInstances", {});

  _defineProperty(Union, "vendorLoaded", {});

  _defineProperty(Union, "register", function (unionKey, options) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (isUndefined(Union.VENDORS[unionKey]) || force) {
      Union.VENDORS[unionKey] = new Union(unionKey, options);
      Union.vendorLoaded[unionKey] = 'init';
    } else {
      console.log("Vendor ".concat(unionKey, " already exists"));
    }
  });
  registerQQ(Union);
  registerBaidu(Union);
  registerFancy(Union);

  var callFunction = function callFunction() {
    return arguments[0] && arguments[0].apply(this, Array.prototype.slice.call(arguments, 1));
  }; // 广告位状态
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
    /**
     *
     * @param {String} container
     * @param {Object} slotConfig 服务端广告位配置
     * @param {Object} config 全局配置
     * @param {Object} slotOptions 媒体端配置
     *                    slotOptions.fallback // 当广告位无渲染或渲染失败回调
     *                    slotOptions.onClose // 当广告位被关闭回调
     */
    function Slot(container) {
      var slotConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 ? arguments[2] : undefined;
      var slotOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Slot);

      this.container = container;
      this.$container = document.querySelector(container); // 是否并非请求

      this.isConcurrent = slotConfig.isConcurrent;
      this.priorityPolicy = slotConfig.priorityPolicy;
      this.slotConfig = slotConfig;
      this.config = config;
      this.slotOptions = slotOptions;
      this.slotId = slotConfig.slotId;
      this.status = '0'; //

      this.templateConfig = slotConfig.templateConfig || {};

      if (slotConfig.isConcurrent) {
        this.consumers = slotConfig.slotBidding;
      } else {
        this.consumers = getConsumerByweight(slotConfig.slotBidding);
      }

      this.consumerLength = this.consumers && this.consumers.length;
      this.completeNumber = 0; // 已经加载消耗方个数

      this.loadedConsumerNumber = 0;
      this.distribute();
    }

    _createClass(Slot, [{
      key: "distribute",
      value: function distribute() {
        var _this = this;

        if (this.consumerLength > 0) {
          each(this.consumers, function (con) {
            var union = Union.use(con.consumer.consumerType);

            if (union) {
              // 存放一个广告位请求不同消耗方请求id，标记为同一次请求
              union.requestId = "".concat(_this.slotId, "-").concat(con.consumer.consumerSlotId, "-").concat(new Date().getTime(), "-").concat(getRandom(0, 100)); // 存放不同消耗方的不同配置信息

              union.requestData = {
                category: _this.isConcurrent,
                sdkVersion: '__VERSION__',
                policyVersion: _this.config.policyVersion,
                slotId: _this.slotId,
                err: 0,
                consumerType: con.consumer.consumerType,
                consumerSlotId: con.consumer.consumerSlotId
              };
              union.on('init', function () {// console.log('init');
              }).on('loaded', function () {
                console.log('loaded');

                _this.race(union);
              }).on('complete', _this.handleComplete.bind(_this)).on('close', function () {
                callFunction(_this.slotConfig.onClose);
              });
              union.run(con);
            } else {
              console.error("Union \u3010".concat(con.consumer.consumerType, "\u3011is not register"));
            }
          });
        } else {
          callFunction(this.slotOptions.complete, false);
        }
      }
    }, {
      key: "handleComplete",
      value: function handleComplete() {
        if (++this.completeNumber === this.consumerLength && this.status !== '5') {
          callFunction(this.slotOptions.complete, false);
        }
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
        if (this.status !== '5') {
          callFunction(this.slotOptions.complete, true);
          this.status = '5';
          console.log('winer ' + union.name);
          this.winner = union;
          union.render(this.container);
        }
      }
    }, {
      key: "reload",
      value: function reload() {
        if (!(this.winner && this.winner.hasReload())) {
          this.status = '4';
          this.distribute();
        }

        return this;
      }
    }]);

    return Slot;
  }();

  var Mp = /*#__PURE__*/function () {
    function Mp(slots) {
      _classCallCheck(this, Mp);

      _defineProperty(this, "Ver", '__VERSION__');

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
       *        params.complete {Function} 广告渲染完成回调，{Boolean} status =true 填充成功
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
          } else if (isPlainObject(slot)) {
            if (!isUndefined(slot.id)) {
              if (isUndefined(_this2.slots[slot.id]) || slot.force) {
                if (_this2.MEDIA_CONFIG[slot.id]) {
                  // 这里应该去请求广告位，然后调用填充方法
                  _this2.fillAd(slot.container, _objectSpread2(_objectSpread2({}, _this2.MEDIA_CONFIG[slot.id]), {}, {
                    id: slot.id
                  }), slot.force, {
                    /**
                     *
                     * @param args
                     *    status {boolean} 状态
                     *    detail {Object}
                     *      detail.union {string} 胜出的联盟
                     *      detail.time {number} 渲染时间戳
                     */
                    complete: function complete() {
                      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                      }

                      slot.complete && slot.complete.apply(this, args);

                      if (args[0] === false) {
                        slot.fallback && slot.fallback();
                      }
                    }
                  });
                } else {
                  console.error("Slot configuration does not exist,id\uFF1A".concat(slot.id));
                }
              } else {
                console.error("Slotid \"".concat(slot.id, "\" already exists"));
              }
            } else if (!isUndefined(slot.mediaid) && !isUndefined(slot.secret)) {
              if (isUndefined(_this2.mediaid)) {
                _this2.mediaid = slot.mediaid;
                _this2.secret = slot.secret;
              } else {
                console.error("mediaid \"".concat(slot.id, "\" already exists"));
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
       * @param {Object} options slot传入配置
       */

    }, {
      key: "fillAd",
      value: function fillAd(container, slotConfig, force, options) {
        // 强制渲染先移除前一个广告
        if (this.slots[slotConfig.id] && force) {
          this.slots[slotConfig.id] = this.slots[slotConfig.id].reload();
        } else {
          this.slots[slotConfig.id] = new Slot(container, slotConfig, this.config, options);
        }
      }
    }]);

    return Mp;
  }();

  /*global window */
  var _mp = window[MODEL_NAME]; // 判断是否已经存在初始化对象

  if (Array.isArray(_mp) || isUndefined(_mp)) {
    new Mp(_mp);
  }

}());
