/* mp.js v1.10.0 */
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

  var MEDIA_CONFIG_NAME = 'M$P_M_C'; // localstorage 存贮数据的属性名

  var MEDIA_STORAGE_NAME = 'M$P_BF';
  var UNION_TIMEOUT = 1000 * 10;

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
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var id = arguments.length > 2 ? arguments[2] : undefined;
    var tag = document.createElement(tagName);
    tag.id = id;
    tag.style.display = 'none';
    tag.className = id;
    context.appendChild(tag);
    return tag;
  };
  function addEventListener(el, eventName, callback, isUseCapture) {
    if (el.addEventListener) {
      el.addEventListener(eventName, callback, !!isUseCapture);
    } else {
      el.attachEvent('on' + eventName, callback);
    }
  }
  var withIframeRenderAd = function withIframeRenderAd(url, container, props) {
    var iframe = document.createElement('iframe');
    iframe.style.cssText = props.iframeCssText;
    document.querySelector(container).appendChild(iframe);
    var iframeDoc = iframe.contentDocument;
    iframeDoc.body.style.cssText = props.iframeBodyCssText;
    var script = iframeDoc.createElement('script');
    script.src = url;
    iframeDoc.body.appendChild(script);
  };

  /*global window*/
  var ua = window.navigator.userAgent;
  var browser = {
    isMobile: /(iPhone|iPod|Android|ios|mobile)/i.test(ua),
    isAndroid: /Android|Linux/.test(ua),
    isIos: /\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(ua)
  };

  var e = function e(t) {
    if (!(this instanceof e)) return new e(t);
    var i = {
      swfContainerId: 'fingerprintjs2',
      swfPath: 'flash/compiled/FontList.swf',
      detectScreenOrientation: !0,
      sortPluginsFor: [/palemoon/i],
      userDefinedFonts: []
    };
    this.options = this.extend(t, i), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map;
  };

  e.prototype = {
    extend: function extend(e, t) {
      if (null == e) return t;

      for (var i in e) {
        null != e[i] && t[i] !== e[i] && (t[i] = e[i]);
      }

      return t;
    },
    get: function get(e) {
      var t = [];
      t = this.userAgentKey(t), t = this.languageKey(t), t = this.colorDepthKey(t), t = this.pixelRatioKey(t), t = this.hardwareConcurrencyKey(t), t = this.screenResolutionKey(t), t = this.availableScreenResolutionKey(t), t = this.timezoneOffsetKey(t), t = this.sessionStorageKey(t), t = this.localStorageKey(t), t = this.indexedDbKey(t), t = this.addBehaviorKey(t), t = this.openDatabaseKey(t), t = this.cpuClassKey(t), t = this.platformKey(t), t = this.doNotTrackKey(t), t = this.pluginsKey(t), t = this.canvasKey(t), t = this.webglKey(t), t = this.adBlockKey(t), t = this.hasLiedLanguagesKey(t), t = this.hasLiedResolutionKey(t), t = this.hasLiedOsKey(t), t = this.hasLiedBrowserKey(t), t = this.touchSupportKey(t), t = this.customEntropyFunction(t);
      var i = this;
      this.fontsKey(t, function (t) {
        var a = [];
        i.each(t, function (e) {
          var t = e.value;
          'undefined' != typeof e.value.join && (t = e.value.join(';')), a.push(t);
        });
        var r = i.x64hash128(a.join('~~~'), 31);
        return e(r, t);
      });
    },
    customEntropyFunction: function customEntropyFunction(e) {
      return 'function' == typeof this.options.customFunction && e.push({
        key: 'custom',
        value: this.options.customFunction()
      }), e;
    },
    userAgentKey: function userAgentKey(e) {
      return this.options.excludeUserAgent || e.push({
        key: 'user_agent',
        value: this.getUserAgent()
      }), e;
    },
    getUserAgent: function getUserAgent() {
      return navigator.userAgent;
    },
    languageKey: function languageKey(e) {
      return this.options.excludeLanguage || e.push({
        key: 'language',
        value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ''
      }), e;
    },
    colorDepthKey: function colorDepthKey(e) {
      return this.options.excludeColorDepth || e.push({
        key: 'color_depth',
        value: screen.colorDepth || -1
      }), e;
    },
    pixelRatioKey: function pixelRatioKey(e) {
      return this.options.excludePixelRatio || e.push({
        key: 'pixel_ratio',
        value: this.getPixelRatio()
      }), e;
    },
    getPixelRatio: function getPixelRatio() {
      return window.devicePixelRatio || '';
    },
    screenResolutionKey: function screenResolutionKey(e) {
      return this.options.excludeScreenResolution ? e : this.getScreenResolution(e);
    },
    getScreenResolution: function getScreenResolution(e) {
      var t;
      return t = this.options.detectScreenOrientation && screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height], 'undefined' != typeof t && e.push({
        key: 'resolution',
        value: t
      }), e;
    },
    availableScreenResolutionKey: function availableScreenResolutionKey(e) {
      return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e);
    },
    getAvailableScreenResolution: function getAvailableScreenResolution(e) {
      var t;
      return screen.availWidth && screen.availHeight && (t = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : [screen.availHeight, screen.availWidth]), 'undefined' != typeof t && e.push({
        key: 'available_resolution',
        value: t
      }), e;
    },
    timezoneOffsetKey: function timezoneOffsetKey(e) {
      return this.options.excludeTimezoneOffset || e.push({
        key: 'timezone_offset',
        value: new Date().getTimezoneOffset()
      }), e;
    },
    sessionStorageKey: function sessionStorageKey(e) {
      return !this.options.excludeSessionStorage && this.hasSessionStorage() && e.push({
        key: 'session_storage',
        value: 1
      }), e;
    },
    localStorageKey: function localStorageKey(e) {
      return !this.options.excludeSessionStorage && this.hasLocalStorage() && e.push({
        key: 'local_storage',
        value: 1
      }), e;
    },
    indexedDbKey: function indexedDbKey(e) {
      return !this.options.excludeIndexedDB && this.hasIndexedDB() && e.push({
        key: 'indexed_db',
        value: 1
      }), e;
    },
    addBehaviorKey: function addBehaviorKey(e) {
      return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && e.push({
        key: 'add_behavior',
        value: 1
      }), e;
    },
    openDatabaseKey: function openDatabaseKey(e) {
      return !this.options.excludeOpenDatabase && window.openDatabase && e.push({
        key: 'open_database',
        value: 1
      }), e;
    },
    cpuClassKey: function cpuClassKey(e) {
      return this.options.excludeCpuClass || e.push({
        key: 'cpu_class',
        value: this.getNavigatorCpuClass()
      }), e;
    },
    platformKey: function platformKey(e) {
      return this.options.excludePlatform || e.push({
        key: 'navigator_platform',
        value: this.getNavigatorPlatform()
      }), e;
    },
    doNotTrackKey: function doNotTrackKey(e) {
      return this.options.excludeDoNotTrack || e.push({
        key: 'do_not_track',
        value: this.getDoNotTrack()
      }), e;
    },
    canvasKey: function canvasKey(e) {
      return !this.options.excludeCanvas && this.isCanvasSupported() && e.push({
        key: 'canvas',
        value: this.getCanvasFp()
      }), e;
    },
    webglKey: function webglKey(e) {
      return this.options.excludeWebGL ? e : this.isWebGlSupported() ? (e.push({
        key: 'webgl',
        value: this.getWebglFp()
      }), e) : e;
    },
    adBlockKey: function adBlockKey(e) {
      return this.options.excludeAdBlock || e.push({
        key: 'adblock',
        value: this.getAdBlock()
      }), e;
    },
    hasLiedLanguagesKey: function hasLiedLanguagesKey(e) {
      return this.options.excludeHasLiedLanguages || e.push({
        key: 'has_lied_languages',
        value: this.getHasLiedLanguages()
      }), e;
    },
    hasLiedResolutionKey: function hasLiedResolutionKey(e) {
      return this.options.excludeHasLiedResolution || e.push({
        key: 'has_lied_resolution',
        value: this.getHasLiedResolution()
      }), e;
    },
    hasLiedOsKey: function hasLiedOsKey(e) {
      return this.options.excludeHasLiedOs || e.push({
        key: 'has_lied_os',
        value: this.getHasLiedOs()
      }), e;
    },
    hasLiedBrowserKey: function hasLiedBrowserKey(e) {
      return this.options.excludeHasLiedBrowser || e.push({
        key: 'has_lied_browser',
        value: this.getHasLiedBrowser()
      }), e;
    },
    fontsKey: function fontsKey(e, t) {
      return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t);
    },
    flashFontsKey: function flashFontsKey(e, t) {
      return this.options.excludeFlashFonts ? t(e) : this.hasSwfObjectLoaded() && this.hasMinFlashInstalled() ? 'undefined' == typeof this.options.swfPath ? t(e) : void this.loadSwfAndDetectFonts(function (i) {
        e.push({
          key: 'swf_fonts',
          value: i.join(';')
        }), t(e);
      }) : t(e);
    },
    jsFontsKey: function jsFontsKey(e, t) {
      var i = this;
      return setTimeout(function () {
        var a = ['monospace', 'sans-serif', 'serif'],
            r = ['Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style', 'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New', 'Garamond', 'Geneva', 'Georgia', 'Helvetica', 'Helvetica Neue', 'Impact', 'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode', 'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO', 'Palatino', 'Palatino Linotype', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol', 'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS', 'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3'],
            n = ['Abadi MT Condensed Light', 'Academy Engraved LET', 'ADOBE CASLON PRO', 'Adobe Garamond', 'ADOBE GARAMOND PRO', 'Agency FB', 'Aharoni', 'Albertus Extra Bold', 'Albertus Medium', 'Algerian', 'Amazone BT', 'American Typewriter', 'American Typewriter Condensed', 'AmerType Md BT', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Antique Olive', 'Aparajita', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo', 'Arabic Typesetting', 'ARCHER', 'ARNO PRO', 'Arrus BT', 'Aurora Cn BT', 'AvantGarde Bk BT', 'AvantGarde Md BT', 'AVENIR', 'Ayuthaya', 'Bandy', 'Bangla Sangam MN', 'Bank Gothic', 'BankGothic Md BT', 'Baskerville', 'Baskerville Old Face', 'Batang', 'BatangChe', 'Bauer Bodoni', 'Bauhaus 93', 'Bazooka', 'Bell MT', 'Bembo', 'Benguiat Bk BT', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BernhardFashion BT', 'BernhardMod BT', 'Big Caslon', 'BinnerD', 'Blackadder ITC', 'BlairMdITC TT', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Condensed', 'Bodoni MT Poster Compressed', 'Bookshelf Symbol 7', 'Boulder', 'Bradley Hand', 'Bradley Hand ITC', 'Bremen Bd BT', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Californian FB', 'Calisto MT', 'Calligrapher', 'Candara', 'CaslonOpnface BT', 'Castellar', 'Centaur', 'Cezanne', 'CG Omega', 'CG Times', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charlesworth', 'Charter Bd BT', 'Charter BT', 'Chaucer', 'ChelthmITC Bk BT', 'Chiller', 'Clarendon', 'Clarendon Condensed', 'CloisterBlack BT', 'Cochin', 'Colonna MT', 'Constantia', 'Cooper Black', 'Copperplate', 'Copperplate Gothic', 'Copperplate Gothic Bold', 'Copperplate Gothic Light', 'CopperplGoth Bd BT', 'Corbel', 'Cordia New', 'CordiaUPC', 'Cornerstone', 'Coronet', 'Cuckoo', 'Curlz MT', 'DaunPenh', 'Dauphin', 'David', 'DB LCD Temp', 'DELICIOUS', 'Denmark', 'DFKai-SB', 'Didot', 'DilleniaUPC', 'DIN', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'English 111 Vivace BT', 'Engravers MT', 'EngraversGothic BT', 'Eras Bold ITC', 'Eras Demi ITC', 'Eras Light ITC', 'Eras Medium ITC', 'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'EUROSTILE', 'Exotc350 Bd BT', 'FangSong', 'Felix Titling', 'Fixedsys', 'FONTIN', 'Footlight MT Light', 'Forte', 'FrankRuehl', 'Fransiscan', 'Freefrm721 Blk BT', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'FrnkGothITC Bk BT', 'Fruitger', 'FRUTIGER', 'Futura', 'Futura Bk BT', 'Futura Lt BT', 'Futura Md BT', 'Futura ZBlk BT', 'FuturaBlack BT', 'Gabriola', 'Galliard BT', 'Gautami', 'Geeza Pro', 'Geometr231 BT', 'Geometr231 Hv BT', 'Geometr231 Lt BT', 'GeoSlab 703 Lt BT', 'GeoSlab 703 XBd BT', 'Gigi', 'Gill Sans', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gloucester MT Extra Condensed', 'GOTHAM', 'GOTHAM BOLD', 'Goudy Old Style', 'Goudy Stout', 'GoudyHandtooled BT', 'GoudyOLSt BT', 'Gujarati Sangam MN', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Gurmukhi MN', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'Heather', 'Heiti SC', 'Heiti TC', 'HELV', 'Herald', 'High Tower Text', 'Hiragino Kaku Gothic ProN', 'Hiragino Mincho ProN', 'Hoefler Text', 'Humanst 521 Cn BT', 'Humanst521 BT', 'Humanst521 Lt BT', 'Imprint MT Shadow', 'Incised901 Bd BT', 'Incised901 BT', 'Incised901 Lt BT', 'INCONSOLATA', 'Informal Roman', 'Informal011 BT', 'INTERSTATE', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Jazz LET', 'Jenson', 'Jester', 'Jokerman', 'Juice ITC', 'Kabel Bk BT', 'Kabel Ult BT', 'Kailasa', 'KaiTi', 'Kalinga', 'Kannada Sangam MN', 'Kartika', 'Kaufmann Bd BT', 'Kaufmann BT', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korinna BT', 'Kristen ITC', 'Krungthep', 'Kunstler Script', 'Lao UI', 'Latha', 'Leelawadee', 'Letter Gothic', 'Levenim MT', 'LilyUPC', 'Lithograph', 'Lithograph Light', 'Long Island', 'Lydian BT', 'Magneto', 'Maiandra GD', 'Malayalam Sangam MN', 'Malgun Gothic', 'Mangal', 'Marigold', 'Marion', 'Marker Felt', 'Market', 'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'Meiryo', 'Meiryo UI', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Tai Le', 'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Minion', 'Minion Pro', 'Miriam', 'Miriam Fixed', 'Mistral', 'Modern', 'Modern No. 20', 'Mona Lisa Solid ITC TT', 'Mongolian Baiti', 'MONO', 'MoolBoran', 'Mrs Eaves', 'MS LineDraw', 'MS Mincho', 'MS PMincho', 'MS Reference Specialty', 'MS UI Gothic', 'MT Extra', 'MUSEO', 'MV Boli', 'Nadeem', 'Narkisim', 'NEVIS', 'News Gothic', 'News GothicMT', 'NewsGoth BT', 'Niagara Engraved', 'Niagara Solid', 'Noteworthy', 'NSimSun', 'Nyala', 'OCR A Extended', 'Old Century', 'Old English Text MT', 'Onyx', 'Onyx BT', 'OPTIMA', 'Oriya Sangam MN', 'OSAKA', 'OzHandicraft BT', 'Palace Script MT', 'Papyrus', 'Parchment', 'Party LET', 'Pegasus', 'Perpetua', 'Perpetua Titling MT', 'PetitaBold', 'Pickwick', 'Plantagenet Cherokee', 'Playbill', 'PMingLiU', 'PMingLiU-ExtB', 'Poor Richard', 'Poster', 'PosterBodoni BT', 'PRINCETOWN LET', 'Pristina', 'PTBarnum BT', 'Pythagoras', 'Raavi', 'Rage Italic', 'Ravie', 'Ribbon131 Bd BT', 'Rockwell', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rod', 'Roman', 'Sakkal Majalla', 'Santa Fe LET', 'Savoye LET', 'Sceptre', 'Script', 'Script MT Bold', 'SCRIPTINA', 'Serifa', 'Serifa BT', 'Serifa Th BT', 'ShelleyVolante BT', 'Sherwood', 'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signboard', 'SILKSCREEN', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed', 'SimSun', 'SimSun-ExtB', 'Sinhala Sangam MN', 'Sketch Rockwell', 'Skia', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Socket', 'Souvenir Lt BT', 'Staccato222 BT', 'Steamer', 'Stencil', 'Storybook', 'Styllo', 'Subway', 'Swis721 BlkEx BT', 'Swiss911 XCm BT', 'Sylfaen', 'Synchro LET', 'System', 'Tamil Sangam MN', 'Technical', 'Teletype', 'Telugu Sangam MN', 'Tempus Sans ITC', 'Terminal', 'Thonburi', 'Traditional Arabic', 'Trajan', 'TRAJAN PRO', 'Tristan', 'Tubular', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Condensed', 'Tw Cen MT Condensed Extra Bold', 'TypoUpright BT', 'Unicorn', 'Univers', 'Univers CE 55 Medium', 'Univers Condensed', 'Utsaah', 'Vagabond', 'Vani', 'Vijaya', 'Viner Hand ITC', 'VisualUI', 'Vivaldi', 'Vladimir Script', 'Vrinda', 'Westminster', 'WHITNEY', 'Wide Latin', 'ZapfEllipt BT', 'ZapfHumnst BT', 'ZapfHumnst Dm BT', 'Zapfino', 'Zurich BlkEx BT', 'Zurich Ex BT', 'ZWAdobeF'];
        i.options.extendedJsFonts && (r = r.concat(n)), r = r.concat(i.options.userDefinedFonts);

        var o = 'mmmmmmmmmmlli',
            s = '72px',
            l = document.getElementsByTagName('body')[0],
            h = document.createElement('div'),
            u = document.createElement('div'),
            c = {},
            d = {},
            g = function g() {
          var e = document.createElement('span');
          return e.style.position = 'absolute', e.style.left = '-9999px', e.style.fontSize = s, e.style.lineHeight = 'normal', e.innerHTML = o, e;
        },
            p = function p(e, t) {
          var i = g();
          return i.style.fontFamily = "'" + e + "'," + t, i;
        },
            f = function f() {
          for (var e = [], t = 0, i = a.length; t < i; t++) {
            var r = g();
            r.style.fontFamily = a[t], h.appendChild(r), e.push(r);
          }

          return e;
        },
            m = function m() {
          for (var e = {}, t = 0, i = r.length; t < i; t++) {
            for (var n = [], o = 0, s = a.length; o < s; o++) {
              var l = p(r[t], a[o]);
              u.appendChild(l), n.push(l);
            }

            e[r[t]] = n;
          }

          return e;
        },
            T = function T(e) {
          for (var t = !1, i = 0; i < a.length; i++) {
            if (t = e[i].offsetWidth !== c[a[i]] || e[i].offsetHeight !== d[a[i]]) return t;
          }

          return t;
        },
            S = f();

        l.appendChild(h);

        for (var x = 0, v = a.length; x < v; x++) {
          c[a[x]] = S[x].offsetWidth, d[a[x]] = S[x].offsetHeight;
        }

        var E = m();
        l.appendChild(u);

        for (var M = [], A = 0, y = r.length; A < y; A++) {
          T(E[r[A]]) && M.push(r[A]);
        }

        l.removeChild(u), l.removeChild(h), e.push({
          key: 'js_fonts',
          value: M
        }), t(e);
      }, 1);
    },
    pluginsKey: function pluginsKey(e) {
      return this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.push({
        key: 'ie_plugins',
        value: this.getIEPlugins()
      }) : e.push({
        key: 'regular_plugins',
        value: this.getRegularPlugins()
      })), e;
    },
    getRegularPlugins: function getRegularPlugins() {
      for (var e = [], t = 0, i = navigator.plugins.length; t < i; t++) {
        e.push(navigator.plugins[t]);
      }

      return this.pluginsShouldBeSorted() && (e = e.sort(function (e, t) {
        return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
      })), this.map(e, function (e) {
        var t = this.map(e, function (e) {
          return [e.type, e.suffixes].join('~');
        }).join(',');
        return [e.name, e.description, t].join('::');
      }, this);
    },
    getIEPlugins: function getIEPlugins() {
      var e = [];

      if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject') || 'ActiveXObject' in window) {
        var t = ['AcroPDF.PDF', 'Adodb.Stream', 'AgControl.AgControl', 'DevalVRXCtrl.DevalVRXCtrl.1', 'MacromediaFlashPaper.MacromediaFlashPaper', 'Msxml2.DOMDocument', 'Msxml2.XMLHTTP', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'QuickTimeCheckObject.QuickTimeCheck.1', 'RealPlayer', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'Scripting.Dictionary', 'SWCtl.SWCtl', 'Shell.UIHelper', 'ShockwaveFlash.ShockwaveFlash', 'Skype.Detection', 'TDCCtl.TDCCtl', 'WMPlayer.OCX', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1'];
        e = this.map(t, function (e) {
          try {
            return new ActiveXObject(e), e;
          } catch (t) {
            return null;
          }
        });
      }

      return navigator.plugins && (e = e.concat(this.getRegularPlugins())), e;
    },
    pluginsShouldBeSorted: function pluginsShouldBeSorted() {
      for (var e = !1, t = 0, i = this.options.sortPluginsFor.length; t < i; t++) {
        var a = this.options.sortPluginsFor[t];

        if (navigator.userAgent.match(a)) {
          e = !0;
          break;
        }
      }

      return e;
    },
    touchSupportKey: function touchSupportKey(e) {
      return this.options.excludeTouchSupport || e.push({
        key: 'touch_support',
        value: this.getTouchSupport()
      }), e;
    },
    hardwareConcurrencyKey: function hardwareConcurrencyKey(e) {
      return this.options.excludeHardwareConcurrency || e.push({
        key: 'hardware_concurrency',
        value: this.getHardwareConcurrency()
      }), e;
    },
    hasSessionStorage: function hasSessionStorage() {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return !0;
      }
    },
    hasLocalStorage: function hasLocalStorage() {
      try {
        return !!window.localStorage;
      } catch (e) {
        return !0;
      }
    },
    hasIndexedDB: function hasIndexedDB() {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return !0;
      }
    },
    getHardwareConcurrency: function getHardwareConcurrency() {
      return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 'unknown';
    },
    getNavigatorCpuClass: function getNavigatorCpuClass() {
      return navigator.cpuClass ? navigator.cpuClass : 'unknown';
    },
    getNavigatorPlatform: function getNavigatorPlatform() {
      return navigator.platform ? navigator.platform : 'unknown';
    },
    getDoNotTrack: function getDoNotTrack() {
      return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : 'unknown';
    },
    getTouchSupport: function getTouchSupport() {
      var e = 0,
          t = !1;
      'undefined' != typeof navigator.maxTouchPoints ? e = navigator.maxTouchPoints : 'undefined' != typeof navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);

      try {
        document.createEvent('TouchEvent'), t = !0;
      } catch (i) {}

      var a = ('ontouchstart' in window);
      return [e, t, a];
    },
    getCanvasFp: function getCanvasFp() {
      var e = [],
          t = document.createElement('canvas');
      t.width = 2e3, t.height = 200, t.style.display = 'inline';
      var i = t.getContext('2d');
      return i.rect(0, 0, 10, 10), i.rect(2, 2, 6, 6), e.push('canvas winding:' + (i.isPointInPath(5, 5, 'evenodd') === !1 ? 'yes' : 'no')), i.textBaseline = 'alphabetic', i.fillStyle = '#f60', i.fillRect(125, 1, 62, 20), i.fillStyle = '#069', this.options.dontUseFakeFontInCanvas ? i.font = '11pt Arial' : i.font = '11pt no-real-font-123', i.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE03", 2, 15), i.fillStyle = 'rgba(102, 204, 0, 0.2)', i.font = '18pt Arial', i.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE03", 4, 45), i.globalCompositeOperation = 'multiply', i.fillStyle = 'rgb(255,0,255)', i.beginPath(), i.arc(50, 50, 50, 0, 2 * Math.PI, !0), i.closePath(), i.fill(), i.fillStyle = 'rgb(0,255,255)', i.beginPath(), i.arc(100, 50, 50, 0, 2 * Math.PI, !0), i.closePath(), i.fill(), i.fillStyle = 'rgb(255,255,0)', i.beginPath(), i.arc(75, 100, 50, 0, 2 * Math.PI, !0), i.closePath(), i.fill(), i.fillStyle = 'rgb(255,0,255)', i.arc(75, 75, 75, 0, 2 * Math.PI, !0), i.arc(75, 75, 25, 0, 2 * Math.PI, !0), i.fill('evenodd'), e.push('canvas fp:' + t.toDataURL()), e.join('~');
    },
    getWebglFp: function getWebglFp() {
      var e,
          t = function t(_t) {
        return e.clearColor(0, 0, 0, 1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), '[' + _t[0] + ', ' + _t[1] + ']';
      },
          i = function i(e) {
        var t,
            i = e.getExtension('EXT_texture_filter_anisotropic') || e.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || e.getExtension('MOZ_EXT_texture_filter_anisotropic');
        return i ? (t = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === t && (t = 2), t) : null;
      };

      if (e = this.getWebglCanvas(), !e) return null;
      var a = [],
          r = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}',
          n = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}',
          o = e.createBuffer();
      e.bindBuffer(e.ARRAY_BUFFER, o);
      var s = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
      e.bufferData(e.ARRAY_BUFFER, s, e.STATIC_DRAW), o.itemSize = 3, o.numItems = 3;
      var l = e.createProgram(),
          h = e.createShader(e.VERTEX_SHADER);
      e.shaderSource(h, r), e.compileShader(h);
      var u = e.createShader(e.FRAGMENT_SHADER);
      e.shaderSource(u, n), e.compileShader(u), e.attachShader(l, h), e.attachShader(l, u), e.linkProgram(l), e.useProgram(l), l.vertexPosAttrib = e.getAttribLocation(l, 'attrVertex'), l.offsetUniform = e.getUniformLocation(l, 'uniformOffset'), e.enableVertexAttribArray(l.vertexPosArray), e.vertexAttribPointer(l.vertexPosAttrib, o.itemSize, e.FLOAT, !1, 0, 0), e.uniform2f(l.offsetUniform, 1, 1), e.drawArrays(e.TRIANGLE_STRIP, 0, o.numItems), null != e.canvas && a.push(e.canvas.toDataURL()), a.push('extensions:' + e.getSupportedExtensions().join(';')), a.push('webgl aliased line width range:' + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))), a.push('webgl aliased point size range:' + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))), a.push('webgl alpha bits:' + e.getParameter(e.ALPHA_BITS)), a.push('webgl antialiasing:' + (e.getContextAttributes().antialias ? 'yes' : 'no')), a.push('webgl blue bits:' + e.getParameter(e.BLUE_BITS)), a.push('webgl depth bits:' + e.getParameter(e.DEPTH_BITS)), a.push('webgl green bits:' + e.getParameter(e.GREEN_BITS)), a.push('webgl max anisotropy:' + i(e)), a.push('webgl max combined texture image units:' + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), a.push('webgl max cube map texture size:' + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)), a.push('webgl max fragment uniform vectors:' + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)), a.push('webgl max render buffer size:' + e.getParameter(e.MAX_RENDERBUFFER_SIZE)), a.push('webgl max texture image units:' + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)), a.push('webgl max texture size:' + e.getParameter(e.MAX_TEXTURE_SIZE)), a.push('webgl max varying vectors:' + e.getParameter(e.MAX_VARYING_VECTORS)), a.push('webgl max vertex attribs:' + e.getParameter(e.MAX_VERTEX_ATTRIBS)), a.push('webgl max vertex texture image units:' + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), a.push('webgl max vertex uniform vectors:' + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)), a.push('webgl max viewport dims:' + t(e.getParameter(e.MAX_VIEWPORT_DIMS))), a.push('webgl red bits:' + e.getParameter(e.RED_BITS)), a.push('webgl renderer:' + e.getParameter(e.RENDERER)), a.push('webgl shading language version:' + e.getParameter(e.SHADING_LANGUAGE_VERSION)), a.push('webgl stencil bits:' + e.getParameter(e.STENCIL_BITS)), a.push('webgl vendor:' + e.getParameter(e.VENDOR)), a.push('webgl version:' + e.getParameter(e.VERSION));

      try {
        var c = e.getExtension('WEBGL_debug_renderer_info');
        c && (a.push('webgl unmasked vendor:' + e.getParameter(c.UNMASKED_VENDOR_WEBGL)), a.push('webgl unmasked renderer:' + e.getParameter(c.UNMASKED_RENDERER_WEBGL)));
      } catch (d) {}

      return e.getShaderPrecisionFormat ? (a.push('webgl vertex shader high float precision:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision), a.push('webgl vertex shader high float precision rangeMin:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin), a.push('webgl vertex shader high float precision rangeMax:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax), a.push('webgl vertex shader medium float precision:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision), a.push('webgl vertex shader medium float precision rangeMin:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin), a.push('webgl vertex shader medium float precision rangeMax:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax), a.push('webgl vertex shader low float precision:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision), a.push('webgl vertex shader low float precision rangeMin:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin), a.push('webgl vertex shader low float precision rangeMax:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax), a.push('webgl fragment shader high float precision:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision), a.push('webgl fragment shader high float precision rangeMin:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin), a.push('webgl fragment shader high float precision rangeMax:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax), a.push('webgl fragment shader medium float precision:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision), a.push('webgl fragment shader medium float precision rangeMin:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin), a.push('webgl fragment shader medium float precision rangeMax:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax), a.push('webgl fragment shader low float precision:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision), a.push('webgl fragment shader low float precision rangeMin:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin), a.push('webgl fragment shader low float precision rangeMax:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax), a.push('webgl vertex shader high int precision:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision), a.push('webgl vertex shader high int precision rangeMin:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin), a.push('webgl vertex shader high int precision rangeMax:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax), a.push('webgl vertex shader medium int precision:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision), a.push('webgl vertex shader medium int precision rangeMin:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin), a.push('webgl vertex shader medium int precision rangeMax:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax), a.push('webgl vertex shader low int precision:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision), a.push('webgl vertex shader low int precision rangeMin:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin), a.push('webgl vertex shader low int precision rangeMax:' + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax), a.push('webgl fragment shader high int precision:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision), a.push('webgl fragment shader high int precision rangeMin:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin), a.push('webgl fragment shader high int precision rangeMax:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax), a.push('webgl fragment shader medium int precision:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision), a.push('webgl fragment shader medium int precision rangeMin:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin), a.push('webgl fragment shader medium int precision rangeMax:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax), a.push('webgl fragment shader low int precision:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision), a.push('webgl fragment shader low int precision rangeMin:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin), a.push('webgl fragment shader low int precision rangeMax:' + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax), a.join('~')) : a.join('~');
    },
    getAdBlock: function getAdBlock() {
      var e = document.createElement('div');
      e.innerHTML = '&nbsp;', e.className = 'adsbox';
      var t = !1;

      try {
        document.body.appendChild(e), t = 0 === document.getElementsByClassName('adsbox')[0].offsetHeight, document.body.removeChild(e);
      } catch (i) {
        t = !1;
      }

      return t;
    },
    getHasLiedLanguages: function getHasLiedLanguages() {
      if ('undefined' != typeof navigator.languages) try {
        var e = navigator.languages[0].substr(0, 2);
        if (e !== navigator.language.substr(0, 2)) return !0;
      } catch (t) {
        return !0;
      }
      return !1;
    },
    getHasLiedResolution: function getHasLiedResolution() {
      return screen.width < screen.availWidth || screen.height < screen.availHeight;
    },
    getHasLiedOs: function getHasLiedOs() {
      var e,
          t = navigator.userAgent.toLowerCase(),
          i = navigator.oscpu,
          a = navigator.platform.toLowerCase();
      e = t.indexOf('windows phone') >= 0 ? 'Windows Phone' : t.indexOf('win') >= 0 ? 'Windows' : t.indexOf('android') >= 0 ? 'Android' : t.indexOf('linux') >= 0 ? 'Linux' : t.indexOf('iphone') >= 0 || t.indexOf('ipad') >= 0 ? 'iOS' : t.indexOf('mac') >= 0 ? 'Mac' : 'Other';
      var r;
      if (r = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, r && 'Windows Phone' !== e && 'Android' !== e && 'iOS' !== e && 'Other' !== e) return !0;

      if ('undefined' != typeof i) {
        if (i = i.toLowerCase(), i.indexOf('win') >= 0 && 'Windows' !== e && 'Windows Phone' !== e) return !0;
        if (i.indexOf('linux') >= 0 && 'Linux' !== e && 'Android' !== e) return !0;
        if (i.indexOf('mac') >= 0 && 'Mac' !== e && 'iOS' !== e) return !0;
        if (0 === i.indexOf('win') && 0 === i.indexOf('linux') && i.indexOf('mac') >= 0 && 'other' !== e) return !0;
      }

      return a.indexOf('win') >= 0 && 'Windows' !== e && 'Windows Phone' !== e || (a.indexOf('linux') >= 0 || a.indexOf('android') >= 0 || a.indexOf('pike') >= 0) && 'Linux' !== e && 'Android' !== e || (a.indexOf('mac') >= 0 || a.indexOf('ipad') >= 0 || a.indexOf('ipod') >= 0 || a.indexOf('iphone') >= 0) && 'Mac' !== e && 'iOS' !== e || 0 === a.indexOf('win') && 0 === a.indexOf('linux') && a.indexOf('mac') >= 0 && 'other' !== e || 'undefined' == typeof navigator.plugins && 'Windows' !== e && 'Windows Phone' !== e;
    },
    getHasLiedBrowser: function getHasLiedBrowser() {
      var e,
          t = navigator.userAgent.toLowerCase(),
          i = navigator.productSub;
      if (e = t.indexOf('firefox') >= 0 ? 'Firefox' : t.indexOf('opera') >= 0 || t.indexOf('opr') >= 0 ? 'Opera' : t.indexOf('chrome') >= 0 ? 'Chrome' : t.indexOf('safari') >= 0 ? 'Safari' : t.indexOf('trident') >= 0 ? 'Internet Explorer' : 'Other', ('Chrome' === e || 'Safari' === e || 'Opera' === e) && '20030107' !== i) return !0;
      var a = eval.toString().length;
      if (37 === a && 'Safari' !== e && 'Firefox' !== e && 'Other' !== e) return !0;
      if (39 === a && 'Internet Explorer' !== e && 'Other' !== e) return !0;
      if (33 === a && 'Chrome' !== e && 'Opera' !== e && 'Other' !== e) return !0;
      var r;

      try {
        throw 'a';
      } catch (n) {
        try {
          n.toSource(), r = !0;
        } catch (o) {
          r = !1;
        }
      }

      return !(!r || 'Firefox' === e || 'Other' === e);
    },
    isCanvasSupported: function isCanvasSupported() {
      var e = document.createElement('canvas');
      return !(!e.getContext || !e.getContext('2d'));
    },
    isWebGlSupported: function isWebGlSupported() {
      if (!this.isCanvasSupported()) return !1;
      var e,
          t = document.createElement('canvas');

      try {
        e = t.getContext && (t.getContext('webgl') || t.getContext('experimental-webgl'));
      } catch (i) {
        e = !1;
      }

      return !!window.WebGLRenderingContext && !!e;
    },
    isIE: function isIE() {
      return 'Microsoft Internet Explorer' === navigator.appName || !('Netscape' !== navigator.appName || !/Trident/.test(navigator.userAgent));
    },
    hasSwfObjectLoaded: function hasSwfObjectLoaded() {
      return 'undefined' != typeof window.swfobject;
    },
    hasMinFlashInstalled: function hasMinFlashInstalled() {
      return swfobject.hasFlashPlayerVersion('9.0.0');
    },
    addFlashDivNode: function addFlashDivNode() {
      var e = document.createElement('div');
      e.setAttribute('id', this.options.swfContainerId), document.body.appendChild(e);
    },
    loadSwfAndDetectFonts: function loadSwfAndDetectFonts(e) {
      var t = '___fp_swf_loaded';

      window[t] = function (t) {
        e(t);
      };

      var i = this.options.swfContainerId;
      this.addFlashDivNode();
      var a = {
        onReady: t
      },
          r = {
        allowScriptAccess: 'always',
        menu: 'false'
      };
      swfobject.embedSWF(this.options.swfPath, i, '1', '1', '9.0.0', !1, a, r, {});
    },
    getWebglCanvas: function getWebglCanvas() {
      var e = document.createElement('canvas'),
          t = null;

      try {
        t = e.getContext('webgl') || e.getContext('experimental-webgl');
      } catch (i) {}

      return t || (t = null), t;
    },
    each: function each(e, t, i) {
      if (null !== e) if (this.nativeForEach && e.forEach === this.nativeForEach) e.forEach(t, i);else if (e.length === +e.length) {
        for (var a = 0, r = e.length; a < r; a++) {
          if (t.call(i, e[a], a, e) === {}) return;
        }
      } else for (var n in e) {
        if (e.hasOwnProperty(n) && t.call(i, e[n], n, e) === {}) return;
      }
    },
    map: function map(e, t, i) {
      var a = [];
      return null == e ? a : this.nativeMap && e.map === this.nativeMap ? e.map(t, i) : (this.each(e, function (e, r, n) {
        a[a.length] = t.call(i, e, r, n);
      }), a);
    },
    x64Add: function x64Add(e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var i = [0, 0, 0, 0];
      return i[3] += e[3] + t[3], i[2] += i[3] >>> 16, i[3] &= 65535, i[2] += e[2] + t[2], i[1] += i[2] >>> 16, i[2] &= 65535, i[1] += e[1] + t[1], i[0] += i[1] >>> 16, i[1] &= 65535, i[0] += e[0] + t[0], i[0] &= 65535, [i[0] << 16 | i[1], i[2] << 16 | i[3]];
    },
    x64Multiply: function x64Multiply(e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var i = [0, 0, 0, 0];
      return i[3] += e[3] * t[3], i[2] += i[3] >>> 16, i[3] &= 65535, i[2] += e[2] * t[3], i[1] += i[2] >>> 16, i[2] &= 65535, i[2] += e[3] * t[2], i[1] += i[2] >>> 16, i[2] &= 65535, i[1] += e[1] * t[3], i[0] += i[1] >>> 16, i[1] &= 65535, i[1] += e[2] * t[2], i[0] += i[1] >>> 16, i[1] &= 65535, i[1] += e[3] * t[1], i[0] += i[1] >>> 16, i[1] &= 65535, i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], i[0] &= 65535, [i[0] << 16 | i[1], i[2] << 16 | i[3]];
    },
    x64Rotl: function x64Rotl(e, t) {
      return t %= 64, 32 === t ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]);
    },
    x64LeftShift: function x64LeftShift(e, t) {
      return t %= 64, 0 === t ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0];
    },
    x64Xor: function x64Xor(e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]];
    },
    x64Fmix: function x64Fmix(e) {
      return e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [4283543511, 3981806797]), e = this.x64Xor(e, [0, e[0] >>> 1]), e = this.x64Multiply(e, [3301882366, 444984403]), e = this.x64Xor(e, [0, e[0] >>> 1]);
    },
    x64hash128: function x64hash128(e, t) {
      e = e || '', t = t || 0;

      for (var i = e.length % 16, a = e.length - i, r = [0, t], n = [0, t], o = [0, 0], s = [0, 0], l = [2277735313, 289559509], h = [1291169091, 658871167], u = 0; u < a; u += 16) {
        o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24], s = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24], o = this.x64Multiply(o, l), o = this.x64Rotl(o, 31), o = this.x64Multiply(o, h), r = this.x64Xor(r, o), r = this.x64Rotl(r, 27), r = this.x64Add(r, n), r = this.x64Add(this.x64Multiply(r, [0, 5]), [0, 1390208809]), s = this.x64Multiply(s, h), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, l), n = this.x64Xor(n, s), n = this.x64Rotl(n, 31), n = this.x64Add(n, r), n = this.x64Add(this.x64Multiply(n, [0, 5]), [0, 944331445]);
      }

      switch (o = [0, 0], s = [0, 0], i) {
        case 15:
          s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 14)], 48));

        case 14:
          s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 13)], 40));

        case 13:
          s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 12)], 32));

        case 12:
          s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 11)], 24));

        case 11:
          s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 10)], 16));

        case 10:
          s = this.x64Xor(s, this.x64LeftShift([0, e.charCodeAt(u + 9)], 8));

        case 9:
          s = this.x64Xor(s, [0, e.charCodeAt(u + 8)]), s = this.x64Multiply(s, h), s = this.x64Rotl(s, 33), s = this.x64Multiply(s, l), n = this.x64Xor(n, s);

        case 8:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 7)], 56));

        case 7:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 6)], 48));

        case 6:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 5)], 40));

        case 5:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 4)], 32));

        case 4:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 3)], 24));

        case 3:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 2)], 16));

        case 2:
          o = this.x64Xor(o, this.x64LeftShift([0, e.charCodeAt(u + 1)], 8));

        case 1:
          o = this.x64Xor(o, [0, e.charCodeAt(u)]), o = this.x64Multiply(o, l), o = this.x64Rotl(o, 31), o = this.x64Multiply(o, h), r = this.x64Xor(r, o);
      }

      return r = this.x64Xor(r, [0, e.length]), n = this.x64Xor(n, [0, e.length]), r = this.x64Add(r, n), n = this.x64Add(n, r), r = this.x64Fmix(r), n = this.x64Fmix(n), r = this.x64Add(r, n), n = this.x64Add(n, r), ('00000000' + (r[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (r[1] >>> 0).toString(16)).slice(-8) + ('00000000' + (n[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (n[1] >>> 0).toString(16)).slice(-8);
    }
  };
  e.VERSION = '1.5.1';

  /* global window */
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
  var imei = window.localStorage.getItem(MEDIA_STORAGE_NAME);
  var getImei = function getImei(callback) {
    if (!imei) {
      new e().get(function (result) {
        if (result) {
          imei = result;
          window.localStorage.setItem(MEDIA_STORAGE_NAME, result);
          callback && callback(imei);
        }
      });
    } else {
      callback && callback(imei);
    }
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
      OS: browser.isAndroid ? 1 : browser.isIos ? 2 : '0',
      APP: window.location.hostname,
      CLIENTTYPE: 3,
      //H5
      IP: '',
      TS: +new Date(),
      IMEI: imei
    };

    var encode = function encode(value) {
      if (isPlainObject(value) || Array.isArray(value)) {
        value = JSON.stringify(value);
      }

      return needEncode ? encodeURIComponent(value) : value;
    };

    return str.replace(/__(.*?)__/g, function (fragment) {
      var variable = fragment.match(/__(.*)__/);
      var value = builtData[variable[1]] || data[variable[1]];
      return value === undefined ? '' : encode(value);
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
  var throttle = function throttle(fn, time) {
    var timeStamp = 0;
    return function (params) {
      var currentTime = +new Date();

      if (currentTime - timeStamp >= time) {
        timeStamp = currentTime;
        fn(params);
      }
    };
  };

  var KEY = 'M$P_FC';

  var today = function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    return date.getFullYear() + '-' + month + '-' + date.getDate();
  }();

  var getFreqControl = function getFreqControl() {
    var data = {};

    try {
      data = JSON.parse(localStorage[KEY]);
    } catch (e) {}

    return data[today] || {};
  };
  var setFreqControl = function setFreqControl(key, value) {
    var data = getFreqControl();
    data[key] = value;

    try {
      // 只存取当前数据，默认重置非当天数据
      localStorage.setItem(KEY, JSON.stringify(_defineProperty({}, today, data)));
    } catch (e) {
      console.log(e);
    }
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
      var img = new Image();

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

  var doClick;
  var onClose;
  var _GDTINIT = null;
  /**
   * 由于广点通不支持重新加载广告配置，需要在第一次执行时将配置全部载入。
   * 后面可以通过window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
   * 再次加载广告。同时增加一个广告位容器和广告位对应的功能
   */

  var GdtManager = /*#__PURE__*/function () {
    function GdtManager() {
      var _this = this;

      _classCallCheck(this, GdtManager);

      _defineProperty(this, "proxyComplete", function (consumerSlotId) {
        var adKeys = [];
        var isRepeatAd = false;
        return function (res) {
          _this.status = 2;
          var slot = _this.slotMap[consumerSlotId]; // 获取广告位对应的广告素材

          var materialData = [];

          try {
            materialData = window.GDT.getPosData(consumerSlotId).data;
          } catch (e) {}

          if (slot && slot.fns) {
            if (Array.isArray(res)) {
              res.forEach(function (ad, index) {
                var adKey = ad.advertisement_id + ad.placement_id;

                if (adKeys.indexOf(adKey) === -1) {
                  var _currentSlot = slot.fns.shift();

                  var currentMaterial = materialData[index] && materialData[index];

                  if (_currentSlot) {
                    adKeys.push(adKey);
                    window.TencentGDT.NATIVE.renderAd(ad, _currentSlot.container);

                    _currentSlot.complete(true, currentMaterial); // fn = slot.next.shift();

                  } else {
                    return false;
                  }
                } else {
                  isRepeatAd = true;
                }
              });
              var currentSlot = slot.fns.shift();

              if (isRepeatAd) {
                currentSlot.complete(false, null, '10006');
              }
            } else {
              var _currentSlot2 = slot.fns.shift();

              _currentSlot2.complete(false);
            }
          }

          var fn = _this.next.shift();

          fn && fn();
        };
      });

      _defineProperty(this, "initSlot", function (slot) {
        if (!_this.loadMap[slot.consumerSlotId]) {
          _this.loadMap[slot.consumerSlotId] = true;
          var config = {
            placement_id: slot.consumerSlotId,
            // {String} - 广告位id - 必填
            app_id: slot.appid,
            // {String} - appid - 必填
            type: 'native',
            // 原生模板：native、激励视频：rewardVideo
            // banner：banner广告 interstitial：插屏广告 。 banner、插屏广告必须填写display_type，具体值见各个广告文档说明。
            // display_type: 'banner',
            // containerid: this.id,
            count: 3,
            // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
            onComplete: _this.proxyComplete(slot.consumerSlotId)
          };

          if (window.jsInited) {
            _GDTINIT(config);
          } else {
            // 广告初始化
            window.TencentGDT.push(config);
          }
        }
      });

      window.TencentGDT = window.TencentGDT || [];
      this.slotMap = {};
      this.status = 0;
      this.init();
      this.loadMap = {};
      this.next = []; //存在并发请求，用于频控处理，每次取3个，处理广告返回长度的next，然后再执行一次next方法 此逻辑循环
    }

    _createClass(GdtManager, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        if (window.M$P_M_C && window.M$P_M_C.slotBiddings) {
          each(window.M$P_M_C.slotBiddings, function (item) {
            each(item.slotBidding, function (consumer) {
              if (consumer.consumer.consumerType === 'gdt') {
                _this2.slotMap[consumer.consumer.consumerSlotId] = {
                  consumerSlotId: consumer.consumer.consumerSlotId,
                  appid: '',
                  status: 0,
                  fns: [] // 存放callback 存在顺序不一致情况，但不影响，符合执行要求，先插入先执行
                  // next: [] // 存在并发请求，用于频控处理，每次取3个，处理广告返回长度的next，然后再执行一次next方法 此逻辑循环

                };
              }
            });
          }); // each(this.slotMap, this.initSlot);
        }
      }
    }, {
      key: "bindGdtInit",
      value: function bindGdtInit() {
        if (!_GDTINIT) {
          _GDTINIT = GDT.init;
        }
      }
    }, {
      key: "bindSlot",
      value: function bindSlot(consumerSlotId, slotInstance, complete) {
        var _this3 = this;

        this.unionInstance = slotInstance;
        var slot = this.slotMap[consumerSlotId];
        console.log('====bind', slot);

        if (slot) {
          slot.fns.push({
            container: this.unionInstance.id,
            complete: complete
          });

          if (!window.jsInited) {
            this.initSlot(slot);
          } else {
            if (window.GDT && window.GDT.load) {
              this.initSlot(slot);
              this.loadAd(consumerSlotId);
            } else {
              this.next.push(function () {
                _this3.initSlot(slot);

                _this3.loadAd(consumerSlotId);
              });
            }
          } // // 第一次加入
          // if (this.status === 0) {
          //   this.status = 1;
          // } else {
          //   if (!window.jsInited) {
          //     this.initSlot(slot);
          //   } else {
          //     if (window.GDT && window.GDT.load) {
          //       this.initSlot(slot);
          //       this.loadAd(consumerSlotId);
          //     } else {
          //     }
          //   }
          //   // if (window.GDT && window.GDT.load && this.status === 2) {
          //   //   console.log('2222', this.status);
          //   //   this.initSlot(slot);
          //   //   this.loadAd(consumerSlotId);
          //   // } else if (window.jsInited) {
          //   //   console.log('jsInited', consumerSlotId);
          //   //   setTimeout(() => {
          //   //     this.initSlot(slot);
          //   //     this.loadAd(consumerSlotId);
          //   //   }, 500);
          //   //   // slot.next.push(() => {
          //   //   //   slot.status = 1;
          //   //   //   this.loadAd(consumerSlotId);
          //   //   // });
          //   // }
          // }

        } else {
          console.error("\u5E7F\u70B9\u901A\u6D88\u8017\u65B9id\u4E0D\u5B58\u5728".concat(consumerSlotId));
        }
      }
    }, {
      key: "bindEvent",
      value: function bindEvent(Union) {
        if (doClick) {
          return;
        }

        doClick = TencentGDT.TN.doClick;
        onClose = TencentGDT.TN.adClose;

        var getUnionInstance = function getUnionInstance(traceid) {
          var container = document.querySelector('div[id*="' + traceid + '"]');
          return Union.unionInstances[container.parentNode.id];
        };

        window.GDT.view && (window.GDT.view = function () {});

        TencentGDT.TN.doClick = function (event, traceid) {
          var union = getUnionInstance(traceid);

          if (union) {
            union.onClick();
            doClick.apply(this, arguments);
          }
        };

        TencentGDT.TN.adClose = function (event, traceid) {
          var union = getUnionInstance(event.traceid);

          if (union) {
            union.onClose();
            onClose.apply(this, arguments);
          }
        };
      }
    }, {
      key: "loadAd",
      value: function loadAd(consumerSlotId) {
        window.TencentGDT.NATIVE && window.TencentGDT.NATIVE.loadAd(consumerSlotId);
      }
    }]);

    return GdtManager;
  }();

  var gdtManager;
  var GdtManager$1 = (function () {
    if (!gdtManager) {
      gdtManager = new GdtManager();
    }

    return gdtManager;
  });

  var _list = [];

  var checkList = function checkList() {
    _list = _list.filter(function (_ref) {
      var container = _ref.container,
          callback = _ref.callback;
      return !inView(container, callback);
    });
  };

  var inView = function inView(container, callback) {
    var isVisibleFlag = true ;

    {
      callback && callback();
    }

    return isVisibleFlag;
  };

  addEventListener(window.document, 'touchmove', throttle(checkList, 150));
  addEventListener(window, 'scroll', throttle(checkList, 150));
  function add(container, callback) {
    if (!inView(container, callback)) ;
  }

  /* global window */
  /**
   * 渲染逻辑上有点怪异，必须先定义TencentGDT，再加载js。js而且不能重复加载。
   * 不渲染的也需要提前定义，再通过loadAd加载，然后通过之前定义onComplete重新渲染
   */

  var exposeCount = 0; // (window[MODEL_NAME] = window[MODEL_NAME] || []).push(({ union }) => {

  var registerQQ = (function (Union) {
    Union.register('gdt', {
      src: '//qzs.qq.com/qzone/biz/res/i.js',
      sandbox: false,
      onLoaded: function onLoaded() {
        GdtManager$1().bindGdtInit();
      },
      onInit: function onInit(data, _ref) {
        var onLoaded = _ref.onLoaded,
            onError = _ref.onError;
        var timeout = setTimeout(function () {
          onError('10002');
          clearInterval(timeout);
          timeout = null;
        }, UNION_TIMEOUT);
        GdtManager$1().bindSlot(data.consumerSlotId, this, function (status, adInfo) {
          var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '10000';
          clearInterval(timeout); // return onError(code);

          if (status) {
            onLoaded(adInfo);
          } else {
            logger.info('无广告');
            onError(code);
          }
        });
      },
      onBeforeMount: function onBeforeMount() {},
      onMounted: function onMounted() {
        GdtManager$1().bindEvent(Union);
      },
      onShow: function onShow() {
        var _this = this;

        add(this.$container, function () {
          if (_this.adInfo) {
            var imgList = _this.adInfo.img_list ? _this.adInfo.img_list : [_this.adInfo.img, _this.adInfo.img2];
            var materialReportData = {
              title: _this.adInfo.txt,
              desc: _this.adInfo.desc,
              imgList: imgList,
              slotId: _this.requestData.slotId,
              consumerSlotId: _this.requestData.consumerSlotId,
              landingPageUrl: _this.adInfo.rl,
              consumerType: _this.requestData.consumerType,
              mediaId: _this.requestData.mediaId
            };
            var fcData = getFreqControl();
            var fcSlots = [];
            var slotId = _this.requestData.slotId;

            if (fcData[slotId]) {
              fcSlots = fcData[slotId];

              if (!fcData[slotId].includes(_this.requestData.consumerSlotId)) {
                fcSlots.push(_this.requestData.consumerSlotId);
              }
            } else {
              fcSlots = [_this.requestData.consumerSlotId];
            }

            setFreqControl(slotId, fcSlots);
            new Image().src = addParam(_this.adInfo.apurl, {
              callback: '_cb_gdtjson' + exposeCount++,
              datatype: 'jsonp'
            });

            _this.log('imp', {
              EXT: materialReportData
            });
          }
        });
      },
      getWeight: function getWeight() {},
      reload: function reload(data) {
        GdtManager$1().loadAd(data.consumerSlotId);
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
            onError = _ref.onError;
        (window.slotbydup = window.slotbydup || []).push({
          id: data.consumerSlotId,
          container: this.id,
          async: true
        }); // 检测广告位

        var timeOut;
        timeOut = setTimeout(function () {
          onError('10002');
          clearInterval(timer);
          timer = null;
        }, UNION_TIMEOUT);
        var timer = setInterval(function () {
          if (_this.$container && _this.$container.querySelector('iframe')) {
            onLoaded();
            clearTimeout(timeOut);
            timeOut = null;
            clearInterval(timer);
            timer = null;
          }
        }, 350);
      },
      onMounted: function onMounted() {},
      onShow: function onShow() {
        this.log('imp');
      }
    });
  }); // });

  /* global window */
  var url = 'https://g.fancyapi.com/s2s'; // const testUrl = 'https://g132.test.amnetapi.com/s2s';

  var registerFancy = (function (Union) {
    Union.register('ptgapi', {
      src: '',
      sandbox: false,
      onInit: function onInit(data, _ref) {
        var onLoaded = _ref.onLoaded,
            onError = _ref.onError;
        var timeout = setTimeout(function () {
          onError('10002');
          clearTimeout(timeout);
          timeout = null;
        }, UNION_TIMEOUT);
        var params = {
          ip: 'client',
          mid: data.appId || 209,
          si: data.consumerSlotId,
          rr: window.location.href,
          secure: 1,
          // https
          reqid: this.requestId,
          device_type: 1,
          //移动端
          mimes: 'img,c',
          rsize: "".concat(this.slotSize.width, "*").concat(this.slotSize.height || 54),
          // 广告位容器的尺寸
          device: JSON.stringify({
            height: screen.height,
            width: screen.width,
            density: 2
          }),
          v: '__VERSION__'
        };
        var trackingClickUrls = [macroReplace(this.data.trackingV2Data.clickTracking[0], {
          DATA: this.requestData,
          REQUESTID: this.requestId
        })]; // each(this.data.trackingV2Data.clickTracking, trackingUrl => {
        //   const url = macroReplace(trackingUrl, {
        //     DATA: this.requestData,
        //     REQUESTID: this.requestId
        //   });
        //
        //   trackingClickUrls.push(url);
        // });

        jsonp(url, {
          data: params,
          callback: function callback(data) {
            clearTimeout(timeout);

            if (Array.isArray(data.ad) && data.ad.length && data.ad[0].src) {
              var htmlStr = macroReplace(data.ad[0].src, {
                M_PRECLICK: trackingClickUrls
              });
              onLoaded(htmlStr);
            } else {
              onError('10000');
            }
          }
        });
      },
      onBeforeMount: function onBeforeMount() {
        this.$container.innerHTML = this.adInfo;
      },
      onMounted: function onMounted() {},
      onShow: function onShow() {
        this.log('imp');
      }
    });
  });

  /* global window */
  var registerAdIMatch = (function (Union) {
    Union.register('custom', {
      src: '',
      sandbox: false,
      onInit: function onInit(data, _ref) {
        var onLoaded = _ref.onLoaded,
            onError = _ref.onError;
        setTimeout(onLoaded);
      },
      onBeforeMount: function onBeforeMount() {
        var slotId = this.requestData.slotId;
        var iframeStyle = {
          iframeBodyCssText: 'margin: 0; box-sizing: border-box; border-bottom: 1px solid #f5f5f5;',
          iframeCssText: 'height: 240px; padding: 0px 15px;border: none; width: 100%'
        };

        if (slotId === '150001') {
          iframeStyle.iframeCssText = 'width: 100%;padding: 0;height: 59px; border: none;';
        } else if (slotId === '150004') {
          iframeStyle.iframeCssText = 'padding: 0;height: 169px;border: none;width: 100%;';
        }

        withIframeRenderAd(this.data.consumer.consumerSlotId, "#".concat(this.id), iframeStyle);
      },
      onShow: function onShow() {
        var _this = this;

        var context = document.querySelector("#".concat(this.id));
        var timer = setInterval(function () {
          var iframe = context.querySelector("iframe");
          var iframeDocument = iframe.contentWindow.document;
          addEventListener(iframeDocument, 'click', function () {
            _this.onClick();
          });
          var imgList = iframeDocument.querySelectorAll('img');

          if (imgList.length) {
            clearInterval(timer);
            add(_this.$container, function () {
              var materials = [];
              var clickUrl = iframeDocument.querySelector('a').getAttribute('href');
              each(imgList, function (img) {
                if (img && img.getAttribute) {
                  materials.push(img.getAttribute('src'));
                }
              });
              var materialData = {
                title: '',
                desc: '',
                slotId: _this.requestData.slotId,
                consumerSlotId: _this.requestData.consumerSlotId,
                landingPageUrl: clickUrl,
                consumerType: _this.requestData.consumerType,
                mediaId: _this.requestData.mediaId,
                imgList: materials
              };

              _this.log('imp', {
                EXT: JSON.stringify(materialData)
              });
            });
          }
        }, 300);
      }
    });
  });

  var ERROR_TYPE = {
    10000: '广告数组为空',
    10001: 'js加载失败',
    10002: '获取广告超时',
    10003: '广告异常',
    10006: '相同消耗方相同素材重复渲染',
    20000: '广点通重复加载广告失败'
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
       *    options.onLoaded {Function}
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
        console.log('load complete:', (new Date() - _this.startTime) / 1000 + 's');

        _this.log('bidSuc', adInfo);

        _this.adInfo = adInfo;

        _this.trigger('loaded');

        _this.trigger('complete');
      });

      _defineProperty(_assertThisInitialized(_this), "onError", function () {
        var errorCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '10002';
        console.error('loaderror:', (new Date() - _this.startTime) / 1000 + 's', _this.name, _this.data.consumer.consumerSlotId, ERROR_TYPE[errorCode]);

        if (_this.status === '1') {
          _this.status = '10';

          _this.logError(errorCode);

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
      value: function getContainer(slotContainer) {
        // 默认使用沙盒
        // 如果使用沙盒则不无法重复使用sdk同一份引用，则无视加载状态
        if (this.sandbox === false) {
          this.$container = createWrapper(slotContainer, 'div', this.id);
        } else {
          this.$container = createWrapper(slotContainer, 'iframe', this.id);
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
        var slotContainer = arguments.length > 1 ? arguments[1] : undefined;
        this.getContainer(slotContainer);
        this.data = data;
        console.log('run');

        var onInit = function onInit() {
          _this2.log('bid');

          _this2.callHook('onInit', data.consumer || {}, {
            onError: _this2.onError,
            onLoaded: _this2.onLoaded
          });
        };

        this.startTime = +new Date();
        this.trigger('init');
        onInit(); // 同类联盟代码是否已经加载

        if (Union.vendorLoaded[this.name] === 'init') {
          if (!this.options.src) {
            this.status = '1';
            Union.vendorLoaded[this.name] = 'loaded';
            return this;
          }

          Union.vendorLoaded[this.name] = 'loading';
          loadScript(this.options.src, function () {
            _this2.status = '1';
            Union.vendorLoaded[_this2.name] = 'loaded';

            _this2.callHook('onLoaded');
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
          DATA: _objectSpread2(_objectSpread2(_objectSpread2({}, this.requestData), extralData.DATA), {}, {
            referer: window.location.href
          }),
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
          this.callHook('onBeforeMount'); //container.appendChild(this.$container);

          this.$container.style.display = 'block'; // 处理不同联盟渲染在填充前预处理，保证显示正常

          this.callHook('onMounted');
          this.callHook('onShow');
        } else {
          console.error("Slot \u3010".concat(selector, "\u3011 does not exist"));
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
  registerAdIMatch(Union);

  var callFunction = function callFunction() {
    return arguments[0] && arguments[0].apply(this, Array.prototype.slice.call(arguments, 1));
  }; // 广告位状态
  /**
   * 通过权重计算使用消耗方
   * @param {Array} consumers
   *
   * @returns [Array]
   */

  var getHighestPriorityComsuner = function getHighestPriorityComsuner(consumers) {
    var highest = 10;
    each(consumers, function (_ref) {
      var _ref$weight = _ref.weight,
          weight = _ref$weight === void 0 ? 10 : _ref$weight;

      if (weight && weight < highest) {
        highest = weight;
      }
    });
    return highest;
  };

  var getConsumerByWeight = function getConsumerByWeight(loadedConsumers) {
    var union = null;
    var max = 10;
    each(loadedConsumers, function (con, index) {
      if (con.data.weight && con.data.weight < max) {
        union = con;
        max = con.data.weight;
      }
    });
    return union;
  };

  var getConsumerByWeightForRandom = function getConsumerByWeightForRandom(loadedConsumers) {
    var weight = [];
    var weightAmount = 0;
    var union = null;
    each(loadedConsumers, function (con, index) {
      con.data.weight = con.data.weight && Math.max(con.data.weight, 1);
      weightAmount += con.data.weight;
      var last = weight[index - 1] && weight[index - 1].rang[1] || 0;
      weight.push({
        name: con.name,
        weight: con.data.weight,
        union: con,
        rang: [last, last + con.data.weight]
      });
    });
    var random = getRandom(0, weightAmount);
    each(weight, function (wei) {
      if (random >= wei.rang[0] && random < wei.rang[1]) {
        union = wei.union;
        return false;
      }
    });
    return union;
  };

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
      var _this = this;

      var slotConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 ? arguments[2] : undefined;
      var slotOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Slot);

      _defineProperty(this, "pickConsumer", function (union) {
        var priorityPolicy = _this.slotConfig.priorityPolicy;

        if (priorityPolicy === 0 || priorityPolicy === 3 && union.data.weight === _this.highestPriority) {
          _this.race(union);
        } else if (priorityPolicy === 1 && _this.loadedConsumers.length === _this.consumerLength) {
          _this.race(getConsumerByWeightForRandom(_this.loadedConsumers));
        }
      });

      this.container = container; // 是否并非请求

      this.isConcurrent = slotConfig.isConcurrent;
      this.priorityPolicy = slotConfig.priorityPolicy;
      this.slotConfig = slotConfig;
      this.config = config;
      this.slotOptions = slotOptions;
      this.slotId = slotConfig.slotId;
      this.status = '0';
      var $container = document.querySelector(container);
      this.slotContainerSize = {
        width: $container.clientWidth || $container.scrollWidth || $container.offsetWidth,
        height: $container.clientHeight || $container.scrollHeight || $container.offsetHeight
      }; //

      this.templateConfig = slotConfig.templateConfig || {};
      this.consumers = slotConfig.slotBidding;
      this.highestPriority = getHighestPriorityComsuner(this.consumers);
      this.loadedConsumers = [];
      this.consumerLength = this.consumers && this.consumers.length;
      this.completeNumber = 0; // 已经加载消耗方个数

      this.loadedConsumerNumber = 0;
      this.distribute();
    }

    _createClass(Slot, [{
      key: "distribute",
      value: function distribute() {
        var _this2 = this;

        if (this.consumerLength > 0) {
          // 单页情况会将原来的广告位给移出，不能缓存
          var $container = document.querySelector(this.container); // reload时清除上次加载成功的consumer

          this.loadedConsumers = [];
          var requestId = "".concat(this.slotId, "-").concat(new Date().getTime(), "-").concat(getRandom(0, 100));
          this.status = '1';
          each(this.consumers, function (con) {
            var union = Union.use(con.consumer.consumerType);

            if (union) {
              union.slotSize = _this2.slotContainerSize; // 存放一个广告位请求不同消耗方请求id，标记为同一次请求

              union.requestId = requestId; // 存放不同消耗方的不同配置信息

              union.requestData = {
                category: _this2.isConcurrent,
                sdkVersion: '__VERSION__',
                policyVersion: _this2.config.policyVersion,
                slotId: _this2.slotId,
                err: 0,
                mediaId: _this2.config.mediaId,
                consumerType: con.consumer.consumerType,
                consumerSlotId: con.consumer.consumerSlotId
              };
              union.on('init', function () {// console.log('init');
              }).on('loaded', function () {
                console.log('loaded');

                _this2.loadedConsumers.push(union);

                if (_this2.status !== '5') {
                  _this2.status = '4';

                  _this2.pickConsumer(union); // this.race(union);

                }
              }).on('complete', _this2.handleComplete.bind(_this2)).on('close', function () {
                callFunction(_this2.slotConfig.onClose);
              });
              union.run(con, $container);
            } else {
              console.error("Union \u3010".concat(con.consumer.consumerType, "\u3011is not register"));
            }
          });
          this.timeouter = setTimeout(function () {
            if (_this2.slotConfig.priorityPolicy === 1) {
              _this2.race(getConsumerByWeightForRandom(_this2.loadedConsumers));
            } else if (_this2.slotConfig.priorityPolicy === 3) {
              _this2.race(getConsumerByWeight(_this2.loadedConsumers));
            }
          }, 3000);
        } else {
          callFunction(this.slotOptions.complete, false);
        }
      }
    }, {
      key: "handleComplete",
      value: function handleComplete() {
        if (++this.completeNumber === this.consumerLength && this.status !== '5' && this.status !== '4') {
          callFunction(this.slotOptions.complete, false);
        }
      }
    }, {
      key: "race",

      /**
       * 真实填充 根据配置填充策略进行选择
       * 有竞速模式和随机模式
       * @param {Union} union
       */
      value: function race(union) {
        clearTimeout(this.timeouter);

        if (union instanceof Union) {
          if (this.status === '4') {
            callFunction(this.slotOptions.complete, true);
            this.status = '5';
            console.log('winer ' + union.name);
            this.winner = union;
            union.$container._slot_ = this;
            union.render(this.container);
          } else if (this.status !== '5') {
            union.destroy();
          }
        }
      }
    }]);

    return Slot;
  }();

  var reCalcConsumerWeight = function reCalcConsumerWeight(slotConfig) {
    var fcData = getFreqControl();
    var slotId = slotConfig.id;
    var gdtList = [];
    each(slotConfig.slotBidding, function (consumer) {
      if (consumer.consumer.consumerType === 'gdt') {
        gdtList.push(consumer);
      }
    });

    if (fcData[slotId] && fcData[slotId].length && fcData[slotId].length !== gdtList.length) {
      each(gdtList, function (consumer) {
        if (fcData[slotId].includes(consumer.consumer.consumerSlotId)) {
          consumer.weight = 1;
        } else {
          consumer.weight = 100 - fcData[slotId].length;
        }
      });
    } else {
      each(gdtList, function (consumer, index) {
        if (index === 0) {
          consumer.weight = 100 - gdtList.length;
        } else {
          consumer.weight = 1;
        }
      });
    }

    if (fcData[slotId] && fcData[slotId].length === gdtList.length) {
      setFreqControl(slotId, []);
    }

    return slotConfig;
  }; // 去除同一广告位下相同的消耗方id


  var uniqueConsumer = function uniqueConsumer(slotBidding) {
    var slotBidConsumers = {};
    each(slotBidding.slotBidding, function (consumer) {
      var consumerSlotId = consumer.consumer.consumerSlotId;

      if (!slotBidConsumers[consumerSlotId]) {
        slotBidConsumers[consumerSlotId] = consumer;
      }
    });
    slotBidding.slotBidding = Object.values(slotBidConsumers);
    return slotBidding;
  };

  var Mp = /*#__PURE__*/function () {
    function Mp(slots) {
      var _this = this;

      _classCallCheck(this, Mp);

      _defineProperty(this, "Ver", '__VERSION__');

      _defineProperty(this, "push", function (params) {
        if (!_this.ready) {
          (_this._originalList = _this._originalList || []).push(params);
        } else {
          _this.handler([params]);
        }
      });

      // 广告位实例对象
      this.slots = {};
      this.init(slots);
    }

    _createClass(Mp, [{
      key: "init",
      value: function init(slots) {
        var _this2 = this;

        // 广告位配置信息
        this._originalList = slots; // 覆盖原有对象

        window[MODEL_NAME] = this; // 转化媒体配置

        this.MEDIA_CONFIG = {};
        this.config = window[MEDIA_CONFIG_NAME].config || {};
        this.config.mediaId = window[MEDIA_CONFIG_NAME].mediaId;
        this.parseMediaConfig(window[MEDIA_CONFIG_NAME]);
        getImei(function () {
          _this2.handler(_this2._originalList);

          _this2.ready = true;
        });
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
       *
       */

    }, {
      key: "parseMediaConfig",
      value: function parseMediaConfig() {
        var _this3 = this;

        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // 转化媒体配置
        this.MEDIA_CONFIG = {};

        if (config.slotBiddings) {
          each(config.slotBiddings, function (slotBidding) {
            _this3.MEDIA_CONFIG[slotBidding.slotId] = uniqueConsumer(slotBidding);
            _this3.MEDIA_CONFIG[slotBidding.slotId] = reCalcConsumerWeight(_this3.MEDIA_CONFIG[slotBidding.slotId]);
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
      key: "handler",
      value: function handler(slots) {
        var _this4 = this;

        each(slots, function (slot) {
          if (isFunction(slot)) {
            slot.call(_this4, {
              union: {
                register: Union.register,
                use: Union.use
              },
              utils: {}
            });
          } else if (isPlainObject(slot)) {
            if (!isUndefined(slot.id)) {
              if (isUndefined(_this4.slots[slot.id]) || slot.force) {
                if (_this4.MEDIA_CONFIG[slot.id]) {
                  // 这里应该去请求广告位，然后调用填充方法
                  _this4.fillAd(slot.container, _objectSpread2(_objectSpread2({}, _this4.MEDIA_CONFIG[slot.id]), {}, {
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
                        try {
                          slot.fallback && slot.fallback();
                          return;

                          if (!document.querySelector('meta[name="referrer"]')) {
                            var meta = document.createElement('meta');
                            meta.setAttribute('name', 'referrer');
                            meta.setAttribute('content', 'always');
                            meta.dataset['dynamic'] = true;
                            document.head.appendChild(meta);
                          }

                          var iframe = document.createElement('iframe');
                          iframe.style.cssText = 'border:none;width:100%;height:' + Math.ceil(window.innerWidth / 360 * 56) + 'px';
                          iframe.src = 'http://me34.cn/#/a/23/edn_c0de476e988be05fa65ddd875356fee4';
                          document.querySelector(slot.container).appendChild(iframe);
                        } catch (e) {}
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
              if (isUndefined(_this4.mediaid)) {
                _this4.mediaid = slot.mediaid;
                _this4.secret = slot.secret;
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
        this.slots[slotConfig.id] = new Slot(container, slotConfig, this.config, options);
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
