!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var i = (t[o] = {
      i: o,
      l: !1,
      exports: {}
    });
    return e[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: o
        });
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = '//qzs.qq.com/union/'),
    n((n.s = 24));
})([
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o,
      i =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      a = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      r = n(1),
      d =
        (o = r) && o.__esModule
          ? o
          : {
              default: o
            };
    var s = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.props = {
            debug: d.default.getParam('debug')
          });
      }
      return (
        a(e, [
          {
            key: 'log',
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : '',
                t = arguments[1],
                n = this.props.debug;
              (-1 == n.indexOf('console') && -1 == n.indexOf('all')) ||
                (t
                  ? window.console.log('[GDT INFO] ' + e + ' ', t)
                  : window.console.log('[GDT INFO] ' + JSON.stringify(e)));
            }
          },
          {
            key: 'error',
            value: function (e) {
              -1 != this.props.debug.indexOf('console') &&
                window.console.error('[GDT ERROR] ' + JSON.stringify(e));
            }
          },
          {
            key: 'info',
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : '',
                t = arguments[1];
              -1 != this.props.debug.indexOf('all') &&
                (t
                  ? window.console.info('[GDT INFO] ' + e + ' ', t)
                  : window.console.info('[GDT INFO] ' + e));
            }
          },
          {
            key: 'unsdkLog',
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : '',
                t = arguments[1],
                n = this.props.debug;
              (-1 == n.indexOf('unsdk') && -1 == n.indexOf('all')) ||
                (t
                  ? window.console.info &&
                    window.console.info('[GDT INFO] ' + e + ' ', t)
                  : window.console.info &&
                    window.console.info('[GDT INFO] ' + e));
            }
          },
          {
            key: 'gxt',
            value: function (e, t) {
              if (e && 'object' === (void 0 === e ? 'undefined' : i(e)) && t) {
                var n = encodeURIComponent(JSON.stringify(e));
                new Image().src =
                  'https://tangram.qq.com/gxt?_tk=' +
                  t +
                  '&_nf=1&tqEncodeJson=' +
                  n;
              }
            }
          }
        ]),
        e
      );
    })();
    t.default = new s();
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      i = {
        reg: {
          unitId: /^\w+\w$/
        },
        cache: {},
        selector: function (e) {
          return document.querySelector(e);
        },
        selectorValue: function (e) {
          return document.querySelector(e).value;
        },
        getCache: function (e) {
          return !!this.reg.unitId.test(e) && !!this.cache[e] && this.cache[e];
        },
        setCache: function (e, t) {
          return (this.cache[e] = t), this.getCache(e);
        },
        hasProperty: function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        },
        getParam: function (e, t) {
          try {
            var n = new RegExp(
              '(?:^|\\?|#|&)' + e + '=([^&#]*)(?:$|&|#)',
              'i'
            ).exec(t || window.location.href);
            return n ? n[1] : '';
          } catch (e) {
            console.log(e);
          }
        },
        getUrlOrigin: function (e) {
          var t = '';
          if ('function' == typeof URL) {
            t = new URL(e).origin;
          } else {
            var n = document.createElement('a');
            (n.href = e), (t = n.protocol + '//' + n.host);
          }
          return t;
        },
        singleton: function (e) {
          return (
            (window.GDTSdkSingleton = window.GDTSdkSingleton || {}),
            !i.hasProperty(window.GDTSdkSingleton, e) &&
              ((window.GDTSdkSingleton[e] = !0), !0)
          );
        },
        setItem: function (e, t) {
          window.localStorage.setItem(e, t);
        },
        getItem: function (e) {
          return window.localStorage.getItem(e);
        },
        setCookie: function (e, t, n, o, i) {
          var a = new Date(),
            r = '',
            d = '';
          a.setDate(a.getDate() + n),
            i && (r = ';domain=' + i),
            o && (d = ';path=' + o),
            (document.cookie =
              e +
              '=' +
              escape(t) +
              (null === n ? '' : ';expires=' + a.toGMTString()) +
              d +
              r);
        },
        objToStr: function (e) {
          var t = '';
          for (var n in e)
            t += '' === t ? n + '=' + e[n] : '&' + n + '=' + e[n];
          return t;
        },
        toString: function (e) {
          return 'object' === (void 0 === e ? 'undefined' : o(e))
            ? JSON.stringify(e)
            : void 0 === e
            ? 'undefined'
            : e;
        },
        getCookie: function (e) {
          var t = '',
            n = null;
          return window.document.cookie.length > 0 &&
            -1 !== (t = window.document.cookie.indexOf(e + '='))
            ? ((t = t + e.length + 1),
              -1 === (n = window.document.cookie.indexOf(';', t)) &&
                (n = window.document.cookie.length),
              unescape(window.document.cookie.substring(t, n)))
            : '';
        },
        clone: function (e) {
          var t = {};
          if (
            'string' == typeof e ||
            'number' == typeof e ||
            void 0 === e ||
            null === e ||
            'boolean' == typeof e ||
            'symbol' === (void 0 === e ? 'undefined' : o(e))
          )
            return e;
          var n = '',
            i = e.constructor === Array ? [] : {};
          if ('object' === (void 0 === e ? 'undefined' : o(e))) {
            if (window.JSON) (n = JSON.stringify(e)), (i = JSON.parse(n));
            else for (var a in e) i[a] = 'object' === o(e[a]) ? t(e[a]) : e[a];
            return i;
          }
        },
        timestampToTime: function (e) {
          var t = new Date(10 === String(e).length ? 1e3 * e : e);
          return (
            t.getFullYear() +
            '-' +
            ((t.getMonth() + 1 < 10
              ? '0' + (t.getMonth() + 1)
              : t.getMonth() + 1) +
              '-') +
            ((t.getDate() < 10 ? '0' + t.getDate() : t.getDate()) + ' ') +
            ((t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) + ':') +
            (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes())
          );
        },
        loadJs: function (e, t) {
          var n = document.getElementsByTagName('head')[0],
            o = document.createElement('script');
          (o.onload = o.onreadystatechange = o.onerror = function () {
            if (
              o &&
              o.readyState &&
              /^(?!(?:loaded|complete)$)/.test(o.readyState)
            )
              return !1;
            (o.onload = o.onreadystatechange = o.onerror = null),
              (o.src = ''),
              (o = null),
              t && t();
          }),
            (o.charset = 'utf-8'),
            (o.src = e);
          try {
            n.appendChild(o);
          } catch (e) {
            console.log('[GDT INFO]' + JSON.stringify(e));
          }
        },
        addEvent: function (e, t, n) {
          window.attachEvent
            ? e.attachEvent('on' + t, n)
            : e.addEventListener(t, n, !1);
        },
        getStyle: function (e, t) {
          var n = '',
            o = '';
          return (
            e.currentStyle
              ? ((n = e.currentStyle[t] || '0px'),
                (n = parseInt(n.slice(0, -2))),
                (o = Number.isNaN && Number.isNaN(n) ? 0 : n))
              : ((n = document.defaultView.getComputedStyle(e, null)
                  ? document.defaultView.getComputedStyle(e, null)[t]
                  : '0px'),
                (n = parseInt(n.slice(0, -2))),
                (o = Number.isNaN && Number.isNaN(n) ? 0 : n)),
            o
          );
        },
        setRootRem: function () {
          var e = document.documentElement;
          function t() {
            var t = window.innerWidth;
            (e.style.fontSize = (t / 375) * 100 + 'px'),
              (e.style.width = t + 'px');
          }
          window.addEventListener('load', t),
            window.addEventListener(
              'orientationchange' in window ? 'orientationchange' : 'resize',
              t
            );
        },
        checkEnv: function (e) {
          var t = window.navigator.userAgent || '',
            n = [];
          return (
            e && e.constructor === Array ? (n = e) : n.push(e),
            n.filter(function (e) {
              return e && t.indexOf(e) > -1;
            }).length > 0
          );
        },
        isValidMuidtype: function (e) {
          return !!parseInt(e) && !new RegExp('[^1-3]').test(e);
        },
        isValidMuid: function (e) {
          return !new RegExp('[^a-f0-9]').test(e);
        },
        getByteLen: function (e) {
          for (var t = 0, n = 0; n < e.length; n++)
            null !== e[n].match(/[^x00-xff]/gi) ? (t += 2) : (t += 1);
          return t;
        },
        getEventPoint: function (e) {
          return (
            'object' === (void 0 === e ? 'undefined' : o(e)) && {
              down_x: e.clientX - e.currentTarget.offsetLeft,
              down_y: e.clientY - e.currentTarget.offsetTop,
              up_x: e.clientX - e.currentTarget.offsetLeft,
              up_y: e.clientY - e.currentTarget.offsetTop
            }
          );
        },
        getOS: function () {
          var e = navigator.userAgent || '';
          return (
            (e = e.toLowerCase()),
            /android|adr/.test(e)
              ? 'android'
              : /ios|iphone|ipad|ipod|itouch|imac|macintosh/.test(e)
              ? 'ios'
              : 'unknown'
          );
        },
        getEnv: function (e) {
          return !!~window.navigator.userAgent
            .toLowerCase()
            .match(/(micromessenger|gdtmobsdk)/gi)
            .indexOf(e);
        },
        getGray: function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          return Math.random() <= e;
        },
        setValue2String: function (e) {
          for (var t in e)
            e[t] = 'number' == typeof e[t] ? e[t].toString() : e[t];
          return e;
        }
      };
    t.default = i;
  },
  ,
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      i = d(n(1)),
      a = d(n(6)),
      r = d(n(7));
    function d(e) {
      return e && e.__esModule
        ? e
        : {
            default: e
          };
    }
    var s = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.state = {
            cache: [],
            timeflag: 1
          }),
          (this.props = {
            debug: i.default.getParam('debug') || !1
          }),
          this.initSDK();
      }
      return (
        o(e, [
          {
            key: 'event',
            value: function (e, t, n) {
              var o = e,
                i = t,
                r = n;
              'string' == typeof e &&
                ((o = this.getEventId(e)), (i = e), (r = t)),
                (r = a.default.mergeCommData(r));
              try {
                window.BeaconAction
                  ? window.BeaconAction.onEvent(o, i, r)
                  : this.state.cache.push({
                      id: o,
                      name: i,
                      paramObj: r
                    });
              } catch (e) {
                this.props.debug && console.log(e);
              }
            }
          },
          {
            key: 'getEventId',
            value: function (e) {
              var t = e;
              return r.default[t];
            }
          },
          {
            key: 'feedback',
            value: function () {
              var e = this,
                t = this.state.cache;
              if (t.length > 0) {
                var n = function (n) {
                  if (window.BeaconAction) {
                    var o = 200 * e.state.timeflag;
                    e.state.timeflag++,
                      setTimeout(function () {
                        window.BeaconAction.onEvent(
                          t[n].id,
                          t[n].name,
                          t[n].paramObj
                        ),
                          n == t.length - 1 && (e.state.timeflag = 1);
                      }, o);
                  } else console.info(window.BeaconAction);
                };
                for (var o in t) n(o);
              }
            }
          },
          {
            key: 'initSDK',
            value: function () {
              var e = this,
                t = this.props.debug,
                n = document.createElement('script');
              (n.type = 'text/javascript'),
                t && -1 != t.indexOf('beacon')
                  ? (n.src =
                      '//3gimg.qq.com/mig_op/beacon/js/v113/beacon_release_jrlt.js?appkey=JS05KY1G393HQI&vc=1.0.1')
                  : (n.src =
                      'https:' === window.location.protocol
                        ? '//3gimg.qq.com/mig_op/beacon/js/v113/beacon_release_s.js?appkey=JS05KY1G393HQI&vc=1.0.1'
                        : '//3gimg.qq.com/mig_op/beacon/js/v113/beacon_release.js?appkey=JS05KY1G393HQI&vc=1.0.1'),
                document.addEventListener('DOMContentLoaded', function (t) {
                  window.document.body.appendChild(n),
                    (n.onload = function () {
                      e.feedback();
                    });
                });
            }
          }
        ]),
        e
      );
    })();
    t.default = new s();
  },
  ,
  ,
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o,
      i =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      a = n(1),
      r =
        (o = a) && o.__esModule
          ? o
          : {
              default: o
            };
    var d = {
      data: function () {
        try {
          return {
            top_url: window.top.location.href,
            ua: window.navigator.userAgent,
            os: d.getOS(),
            env: d.getEnv()
          };
        } catch (e) {}
      },
      mergeCommData: function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = d.data();
        if (e && 'object' !== (void 0 === e ? 'undefined' : i(e))) return e;
        for (var n in t) e[n] = t[n];
        return e;
      },
      getOS: function () {
        var e = window.navigator.userAgent.toLowerCase();
        return /android|adr/.test(e)
          ? 'android'
          : /ios|iphone|ipad|ipod|itouch|imac|macintosh/.test(e)
          ? 'ios'
          : 'unknown';
      },
      getEnv: function () {
        return r.default.getEnv('gdtmobsdk')
          ? 'gdtmobsdk'
          : r.default.getEnv('micromessenger')
          ? 'micromessenger'
          : null;
      }
    };
    t.default = d;
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    t.default = {
      unsdk_init: 407927,
      unsdk_onsucc: 407929,
      unsdk_onerror: 407928,
      unsdk_env_err: 407926,
      unsdk_version: 563626,
      unsdk_top_pv: 563625,
      unsdk_win_error: 699537,
      unsdk_play_guide_btn: 563624,
      unjs_template_clickAdEvent: 643613,
      unjs_template_clickCloseEvent: 643614,
      unjs_template_clickLogoEvent: 643615,
      unjs_template_getAdInfo: 643616,
      unjs_template_renderDidFinish: 643619
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t, n) {
    e.exports = n(25);
  },
  function (e, t, n) {
    'use strict';
    var o =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      i = p(n(26)),
      a = p(n(27)),
      r = p(n(3)),
      d = p(n(1)),
      s = p(n(29)),
      c = p(n(0));
    function p(e) {
      return e && e.__esModule
        ? e
        : {
            default: e
          };
    }
    !(function () {
      var e = {
          conflist: [],
          originConflist: [],
          exposureOids: [],
          rlMap: [],
          apUrlMap: [],
          isAndroidApp: [],
          isIOSApp: [],
          loadedAd: [],
          site: {},
          adConf: {},
          antiSpamConf: {},
          load_count: 0,
          restrict: {}, // 广告位限制
          display_type: 'inner',
          CONST: {
            MIN_LOADCOUNT: 1,
            MAX_LOADCOUNT: 10,
            ACTTYPE_DOWNLOAD: 35,
            AD_ACTITON_TYPE: {
              URL: 0,
              APP: 1,
              PHONE: 18
            },
            PRODUCT_TYPE: {
              OPEN_APP: 12,
              MYAPP: 5,
              IOSAPP: 19
            },
            ACCESS_COUNT: 300,
            SITESET_MOBILE_INNER: 25,
            DISPLAY_TYPE_INNER: 'inner',
            DISPLAY_TYPE_BANNER: 'banner',
            DISPLAY_TYPE_INTERSTITIAL: 'interstitial',
            WRAP_TYPE_INTERSTITIAL: 'gdt_template_interstitial_wrap'
          },
          tbsDomain: 'recmd.html5.qq.com',
          tbsFlag: 'tbs',
          init: function (t) {
            var n = e.getReqCond(t),
              o = t.posid || t.placement_id,
              i = t.count || e.CONST.MIN_LOADCOUNT,
              r = t.appid || t.app_id,
              d = t.from,
              s = t.tbs_config,
              p = t.onComplete;
            (e.restrict[o] = new a.default({
              posid: o,
              appid: r
            })),
              e.bindSite(o, t.site_set),
              e.bindAdConf(o, t),
              (e.display_type = t.display_type
                ? t.display_type
                : e.display_type),
              e.checkLoadCondition(o, i, p) &&
                (s
                  ? y.isTBSPageView() &&
                    h.loadJS('//res.imtt.qq.com/tbs/tbs.js', function () {
                      if (
                        ((m.tbsLoaded = !0),
                        window.tbs && window.tbs.ad && window.tbs.ad.setAdInfo)
                      )
                        try {
                          var e = tbs.ad.setAdInfo({
                            ifShowAd: !!s.ifShowAd && s.ifShowAd,
                            adType: s.adType ? s.adType : 'splice',
                            adShape: s.adShape ? s.adShape : '',
                            adPos: s.adPos ? s.adPos : 'bottom',
                            appId: r,
                            adId: o
                          });
                          c.default.log(e);
                        } catch (e) {
                          c.default.log(e);
                        }
                      else c.default.log('tbsjs not ready');
                    })
                  : (e.conflist.push({
                      posId: o,
                      count: i,
                      platform: 'mobile',
                      from: d || '',
                      tbsAdConfig: s || null,
                      onComplete: function (n) {
                        e.callback(o, n, t);
                      },
                      context: {
                        appid: r,
                        req: {
                          support_https: h.isHttpsProtocol() ? 1 : 0
                        },
                        common: n
                      },
                      tempContext: {
                        appid: r,
                        req: {
                          support_https: h.isHttpsProtocol() ? 1 : 0
                        },
                        common: JSON.parse(JSON.stringify(n))
                      }
                    }),
                    e.originConflist.push({
                      posId: o,
                      count: i,
                      platform: 'mobile',
                      from: d || '',
                      tbsAdConfig: s || null,
                      onComplete: function (n) {
                        e.callback(o, n, t);
                      },
                      context: {
                        appid: r,
                        req: {
                          support_https: h.isHttpsProtocol() ? 1 : 0
                        },
                        common: n
                      },
                      tempContext: {
                        appid: r,
                        req: {
                          support_https: h.isHttpsProtocol() ? 1 : 0
                        },
                        common: JSON.parse(JSON.stringify(n))
                      }
                    })));
          },
          bindSite: function (t, n) {
            if (e.site[t]) return !0;
            e.site[t] = n;
          },
          getSite: function (t) {
            return e.site[t] || !1;
          },
          bindAdConf: function (t, n) {
            if (e.adConf[t]) return !0;
            e.adConf[t] = n;
          },
          getAdConf: function (t) {
            return e.adConf[t] || !1;
          },
          bindAntiSpam: function (t, n) {
            if (e.antiSpamConf[t]) return !0;
            var o = n.dom,
              a = n.isIframe;
            e.antiSpamConf[t] = new i.default({
              dom: o,
              isIframe: a
            });
          },
          getAntiSpam: function (t) {
            if (e.antiSpamConf[t]) return e.antiSpamConf[t].getAntiSpamInfo();
          },
          checkLoadCondition: function (t, n, o) {
            return (
              !(!t || !t.match(/^\d+$/)) &&
              !(
                !n ||
                !h.isInteger(n) ||
                n < e.CONST.MIN_LOADCOUNT ||
                n > e.CONST.MAX_LOADCOUNT
              ) &&
              !(!o || 'function' != typeof o)
            );
          },
          getUserConnStatus: function (e) {
            return 'wifi' == e
              ? 1
              : '2g' == e
              ? 2
              : '3g' == e
              ? 3
              : '4g' == e
              ? 4
              : 0;
          },
          getReqCond: function (t) {
            var n = navigator.userAgent.toLowerCase() || '',
              o = t.muidtype || t.muid_type,
              i = t.muid,
              a = t.site_set,
              r = t.information_info || t.informationInfo,
              d = h.getCookie('debug_h5sdk_adId'),
              s = h.getCookie('debug_h5sdk_nomatch'),
              c =
                (h.getCookie('debug_h5sdk_module'),
                {
                  c_os: '',
                  c_hl: navigator.language || navigator.browserLanguage,
                  url: document.location.href,
                  sdk_src: 'mobile_union_js',
                  tmpallpt: !0,
                  click_ext: t.click_ext || h.getParameter('click_ext'),
                  aid: parseInt(d),
                  nomatch: s
                });
            if (
              (t &&
                t.display_type &&
                t.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL &&
                (c.inline_full_screen = 1),
              window.location != window.parent.location)
            ) {
              var p = document.referrer,
                l = h.getByteLen(p);
              l > 0 && l < 512 && (c.referrerurl = p);
            }
            if (
              ((n = n.toLowerCase()),
              y.isTBSPageView() &&
                ((c.flow_source = 2),
                window.browser &&
                  window.browser.connection &&
                  window.browser.connection.getType(function (e) {
                    e && (c.conn = this.getUserConnStatus(e));
                  }),
                window.tbs && window.tbs.network))
            ) {
              var u = window.tbs.network.type();
              u && (c.conn = this.getUserConnStatus(u));
            }
            return (
              r && 'undefined' != r && '' != r && (c.information_info = r),
              /android|adr/.test(n)
                ? (c.c_os = 'android')
                : /ios|iphone|ipad|itouch/.test(n) && (c.c_os = 'ios'),
              o &&
                h.isValidMuidtype(o) &&
                i &&
                h.isValidMuid(i) &&
                ((c.muidtype = parseInt(o)), (c.muid = i)),
              h.webpEnabled && (c.webp = '1'),
              a && (c.site_set = a),
              c
            );
          },
          loadAd: function (t, n) {
            for (
              var o = e, i = !1, a = [], d = 0;
              d < o.originConflist.length;
              d++
            )
              if (
                ((o.originConflist[d].context = JSON.parse(
                  JSON.stringify(o.originConflist[d].tempContext)
                )),
                t == o.originConflist[d].posId)
              ) {
                o.originConflist[d].from &&
                  o.originConflist[d].from == o.tbsFlag &&
                  o.tbsDomain == document.domain &&
                  o.originConflist[d].context &&
                  o.originConflist[d].context.common &&
                  n &&
                  (o.originConflist[d].context.common.url = n),
                  a.push(o.refreshConnParam(o.originConflist[d]));
                break;
              }
            ++e.load_count,
              e.restrict[t] &&
                e.restrict[t].hitRestrictMap &&
                (i = e.restrict[t].hitRestrictMap(
                  e.load_count,
                  e.CONST.ACCESS_COUNT
                )),
              !0 !== i && GDT.load(a),
              r.default.event(120312, 'ad_load', {
                placement_id: t,
                fromTbs: n
              });
          },
          checkAndLoadNativeAd: function () {
            var t = e;
            t.conflist &&
              t.conflist.length > 0 &&
              !t.qbsLoaded &&
              h.loadJS(
                '//qzonestyle.gtimg.cn/qzone/biz/comm/js/qbs.js',
                function () {
                  t.qbsLoaded = !0;
                  for (var e = [], n = 0; n < t.conflist.length; n++)
                    (t.conflist[n].from &&
                      t.conflist[n].from == t.tbsFlag &&
                      t.tbsDomain == document.domain) ||
                      e.push(t.refreshConnParam(t.conflist[n]));
                  GDT.load(e);
                }
              );
          },
          refreshConnParam: function (e) {
            if (
              y.isTBSPageView() &&
              e &&
              e.tempContext &&
              e.tempContext.common
            ) {
              if (!e.tempContext.common.conn) {
                var t = navigator.userAgent || '';
                if (
                  (-1 == t.indexOf('TBS/') &&
                    -1 !== t.indexOf('MQQBrowser/') &&
                    (window.browser
                      ? window.browser.connection
                        ? window.browser.connection.getType(function (t) {
                            var n = t;
                            n
                              ? (e.tempContext.common.conn =
                                  'wifi' == n
                                    ? 1
                                    : '2g' == n
                                    ? 2
                                    : '3g' == n
                                    ? 3
                                    : '4g' == n
                                    ? 4
                                    : 0)
                              : h.pingHot('nobrowserconnectionstate');
                          })
                        : h.pingHot('nobrowserconnection')
                      : h.pingHot('nobrowser')),
                  -1 !== t.indexOf('TBS/') && -1 !== t.indexOf('MQQBrowser/'))
                )
                  if (window.tbs)
                    if (window.tbs.network) {
                      var n = window.tbs.network.type();
                      n
                        ? (e.tempContext.common.conn =
                            'wifi' == n
                              ? 1
                              : '2g' == n
                              ? 2
                              : '3g' == n
                              ? 3
                              : '4g' == n
                              ? 4
                              : 0)
                        : h.pingHot('notbsnetworktype');
                    } else h.pingHot('notbsnetwork');
                  else h.pingHot('notbs');
                e.tempContext.common.conn ||
                  (-1 !== (t = t.toLowerCase()).indexOf('nettype/wifi')
                    ? ((e.tempContext.common.conn = 1), h.pingHot('netfromua'))
                    : -1 !== t.indexOf('nettype/2g')
                    ? ((e.tempContext.common.conn = 2), h.pingHot('netfromua'))
                    : -1 !== t.indexOf('nettype/3g')
                    ? ((e.tempContext.common.conn = 3), h.pingHot('netfromua'))
                    : (-1 === t.indexOf('nettype/4g') &&
                        -1 === t.indexOf('nettype/ctlte')) ||
                      ((e.tempContext.common.conn = 4),
                      h.pingHot('netfromua')));
              }
              e.context = JSON.parse(JSON.stringify(e.tempContext));
            }
            return e;
          },
          isAppAd: function (t) {
            return !(
              !t ||
              (t.acttype != e.CONST.AD_ACTITON_TYPE.APP &&
                t.producttype != e.CONST.PRODUCT_TYPE.IOSAPP &&
                t.producttype != e.CONST.PRODUCT_TYPE.OPEN_APP &&
                t.producttype != e.CONST.PRODUCT_TYPE.MYAPP)
            );
          },
          exposeTemplateNativeAd: function (t, n) {
            var o = e,
              i = o.loadedAd[t];
            if (i) {
              var a = {
                placement_id: i.posid,
                advertisement_id: i.adData.cl
              };
              o.doExpose(a);
            }
          },
          clickTemplateNativeAd: function (t, n, o) {
            var i = e,
              a = i.loadedAd[n],
              r = e.getAntiSpam(a.posid);
            if (a) {
              var d = a.adData && a.adData.template_id,
                s = r.da,
                c = r.db,
                p = r.g,
                l = r.sc,
                u = r.ec,
                f = {
                  down_x: t.pageX,
                  down_y: t.pageY,
                  up_x: t.pageX,
                  up_y: t.pageY,
                  tid: d,
                  da: s,
                  db: c,
                  g: p,
                  sc: l,
                  ec: u
                },
                m = {
                  placement_id: a.posid,
                  advertisement_id: a.adData.cl,
                  s: encodeURIComponent(JSON.stringify(f))
                };
              i.doExpose(m), i.doClick(m);
            }
          },
          loadIframeUrlJS: function (e, t, n) {
            var o = e.createElement('script');
            (o.onload = o.onreadystatechange = o.onerror = function () {
              (o &&
                o.readyState &&
                /^(?!(?:loaded|complete)$)/.test(o.readyState)) ||
                ((o.onload = o.onreadystatechange = o.onerror = null),
                (o.src = ''),
                o.parentNode.removeChild(o),
                (o = null),
                n && n());
            }),
              (o.charset = 'utf-8'),
              (o.src = t);
            try {
              e.head.appendChild(o);
            } catch (e) {
              c.default.log(e);
            }
          },
          creatInterstitialNativeContainer: function () {
            var t = e.CONST.WRAP_TYPE_INTERSTITIAL,
              n = document.getElementById(t);
            return n
              ? [t, n]
              : (((n = document.createElement('div')).id = t),
                document.body.appendChild(n),
                [t, n]);
          },
          renderTemplateNativeAd: function (t, n) {
            var o = h.$('#' + n),
              i = e.loadedAd[t && t.tid],
              a = i && i.template,
              r = i && i.adData && i.adData.reltarget,
              d = i && i.adData && i.adData.producttype,
              s = i && i.adData && i.adData.ext && i.adData.ext.pkg_name,
              p =
                (i && i.adData && i.adData.ext && i.adData.ext.appid, i.posid),
              l = {
                packagename: s
              };
            if (
              (e.getAdConf(p).display_type ===
                e.CONST.DISPLAY_TYPE_INTERSTITIAL &&
                ((o = e.creatInterstitialNativeContainer()[1]),
                (n = e.creatInterstitialNativeContainer()[0])),
              n &&
                o &&
                t &&
                t.tid &&
                t.advertisement_id &&
                t.placement_id &&
                i &&
                a &&
                t &&
                t.tid &&
                t.advertisement_id &&
                t.placement_id &&
                i &&
                a)
            )
              try {
                if (
                  e.checkEnvironment('inQB') &&
                  window.browser &&
                  window.browser.app &&
                  d == e.CONST.PRODUCT_TYPE.OPEN_APP &&
                  1 == r
                )
                  window.browser.app.isInstallApk(function (i) {
                    1 != i && e.creatAdframe(t, n, o, a, p);
                  }, l);
                else if (
                  e.checkEnvironment('inQW') &&
                  window.tbs &&
                  window.tbs.package &&
                  d == e.CONST.PRODUCT_TYPE.OPEN_APP &&
                  1 == r
                ) {
                  1 !=
                    window.tbs.package.isApkInstalled(l, function (e) {
                      c.default.log(JSON.stringify(e));
                    }) && e.creatAdframe(t, n, o, a, p);
                } else e.creatAdframe(t, n, o, a, p);
              } catch (i) {
                e.creatAdframe(t, n, o, a, p), c.default.log(i);
              }
          },
          setStyle: function (e, t) {
            if ('object' === (void 0 === t ? 'undefined' : o(t)))
              for (var n in t) e.style[n] = t[n];
          },
          setBannerContainerHeight: function (e) {
            var t = e.offsetWidth,
              n = parseInt(t / 6.4) + 1;
            if ('0px' === e.style.height) return !1;
            e.style.height = n + 'px';
          },
          creatAdframe: function (t, n, o, i, a) {
            var r =
                'gdt_template_native_wrap_' + t.tid + '_' + t.advertisement_id,
              d = document.createElement('div'),
              s = e.getAdConf(a);
            (d.id = r),
              s.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL &&
                e.setStyle(d, {
                  position: 'fixed',
                  zIndex: 999,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.4)'
                }),
              s.display_type === e.CONST.DISPLAY_TYPE_BANNER
                ? ((o.innerHTML = ''), o.appendChild(d))
                : (s.display_type,
                  e.CONST.DISPLAY_TYPE_INTERSTITIAL,
                  (o.innerHTML = ''),
                  o.appendChild(d));
            var p = document.createElement('iframe');
            (p.id = r + '_iframe'),
              (p.name = r + '_iframe'),
              (p.height = 0),
              (p.style.border = 0),
              d.appendChild(p);
            try {
              e.bindAntiSpam(a, {
                dom: p,
                isIframe: !0
              }),
                e.setIframeElSize(p, o, t),
                e.renderTemplateAd(p, i, null),
                e.getOnorientationChange(p, i, p.id, o, t);
            } catch (e) {
              c.default.log(e);
            }
          },
          getTargetIframe: function (e, t) {
            var n = document.getElementsByTagName('iframe'),
              o =
                e.contentDocument ||
                (e.contentWindow && e.contentWindow.document),
              i = null;
            if (o) return o;
            if (null !== t) {
              for (var a in n)
                Object.prototype.hasOwnProperty.call(n, a) &&
                  n[a].id === t &&
                  (o =
                    (i = n[a]).contentDocument ||
                    (i.contentWindow && i.contentWindow.document));
              return o;
            }
            return !1;
          },
          renderTemplateAd: function (t, n, o) {
            var i = e.getTargetIframe(t, o),
              a = 0;
            if (!1 !== i) {
              var r = setInterval(function () {
                  if (++a > 20) return clearInterval(r), !1;
                  if (
                    !v.checkIsHidden(t) &&
                    ((i && 'complete' == i.readyState) ||
                      (i && 'interactive' == i.readyState))
                  )
                    if (i.body.scrollHeight > 150)
                      t.style.height = i.body.scrollHeight + 'px';
                    else {
                      if (!(i.body.getElementsByTagName('div').length >= 1))
                        return !1;
                      t.style.height =
                        i.body.getElementsByTagName('div')[0].scrollHeight +
                        'px';
                    }
                }, 500),
                d = i.createElement('meta');
              d.setAttribute('content', 'edge'),
                d.setAttribute('http-equiv', 'X-UA-Compatible'),
                d.setAttribute('charset', 'utf-8'),
                i.head.appendChild(d),
                e.loadIframeUrlJS(
                  i,
                  '//qzs.qq.com/qzone/biz/res/tmpl/js/templatenative.js',
                  function () {
                    i.body.innerHTML = n;
                  }
                );
            }
          },
          setIframeElSize: function (t, n, o) {
            var i = document.documentElement.clientWidth,
              a = document.documentElement.clientHeight,
              r = e.getAdConf(o.placement_id),
              d = e.loadedAd[o && o.tid],
              s = 0,
              c = 0;
            if (r.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL) {
              if (d && d.adData) {
                var p = d.adData.template_width,
                  l = d.adData.template_height;
                s = i < a ? 0.7 * i + 'px' : ((p * a) / l) * 0.7 + 'px';
              } else
                (c = Math.min(i, a)), (s = Math.min(0.7 * c, 0.56 * a) + 'px');
              e.setStyle(t, {
                position: 'absolute',
                margin: 'auto',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: s,
                height: 0,
                scrolling: 'no',
                transition: 'all 0.05s ease-in-out 0s'
              });
            } else
              r.display_type === e.CONST.DISPLAY_TYPE_BANNER
                ? (e.setStyle(t, {
                    width: '100%',
                    height: 0,
                    scrolling: 'no',
                    transition: 'all 0.05s ease-in-out 0s'
                  }),
                  e.setBannerContainerHeight(n))
                : e.setStyle(t, {
                    width: '100%',
                    scrolling: 'no'
                  });
          },
          getOnorientationChange: function (t, n, o, i, a) {
            window.addEventListener(
              'onorientationchange' in window ? 'orientationchange' : 'resize',
              function (r) {
                setTimeout(function () {
                  try {
                    e.setIframeElSize(t, i, a), e.renderTemplateAd(t, n, o);
                  } catch (e) {}
                }, 300);
              },
              !1
            );
          },
          processTemplateNativeAd: function (t, n, o, i) {
            for (
              var a = [], r = n.data, d = e.getAdConf(t), s = '', c = 0;
              c < r.length;
              c++
            ) {
              var p = {
                tid: r[c].traceid,
                advertisement_id: r[c].cl,
                placement_id: t,
                item: c
              };
              a.push(p);
            }
            d.display_type === e.CONST.DISPLAY_TYPE_BANNER
              ? (((s = e.checkAdConf(d)).data = a),
                0 === s.ret && a.length > 0
                  ? (o.onComplete && o.onComplete(s),
                    e.renderTemplateNativeAd(a[0], d.containerid),
                    e.carouselBanner(t))
                  : o.onComplete && o.onComplete(i))
              : d.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL
              ? (((s = e.checkAdConf(d)).data = a),
                0 === s.ret && a.length > 0
                  ? o.onComplete && o.onComplete(s)
                  : o.onComplete && o.onComplete(i))
              : o.onComplete && o.onComplete(a);
          },
          closeTemplateNativeAd: function (t) {
            if (
              'object' === (void 0 === t ? 'undefined' : o(t)) &&
              t.hasOwnProperty('traceid')
            ) {
              var n = e.loadedAd[t.traceid].posid,
                i = e.getAdConf(n);
              if (i.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL) {
                var a = e.CONST.WRAP_TYPE_INTERSTITIAL,
                  r = document.getElementById(a);
                r.parentNode.removeChild(r);
              }
              if (i.display_type === e.CONST.DISPLAY_TYPE_BANNER) {
                var d = i.containerid;
                clearTimeout(i.timeout),
                  (document.getElementById(d).style.height = '0px'),
                  (i.carousel = 0);
              }
            }
          },
          carouselBanner: function (t) {
            var n = e.getAdConf(t),
              o = 0;
            (o =
              n.carousel >= 6e3 && n.carousel <= 6e4
                ? n.carousel
                : n.carousel > 6e4
                ? 6e4
                : 0) >= 6e3 &&
              o <= 6e4 &&
              (n.timeout = setTimeout(function () {
                e.loadAd(t);
              }, o));
          },
          checkAdConf: function (n) {
            var o = {
              ret: t.SUCCESS[0],
              message: t.SUCCESS[1]
            };
            return (
              n.display_type !== e.CONST.DISPLAY_TYPE_BANNER ||
                n.containerid ||
                ((o.ret = t.CONTAINERID_EMPTY[0]),
                (o.message = t.CONTAINERID_EMPTY[1])),
              o
            );
          },
          processCustomNativeAd: function (n, o, i, a) {
            e.getAdConf(n).display_type === e.CONST.DISPLAY_TYPE_BANNER &&
              a.data &&
              0 === a.data.length &&
              ((a.ret = t.TEMPLATE_EMPTY[0]),
              (a.message = t.TEMPLATE_EMPTY[1])),
              i.onComplete && i.onComplete(a);
          },
          processinQWCustomNativeAd: function (t, n, o, i) {
            for (var a = n.data, r = [], d = 0; d < a.length; d++) {
              var s = a[d].producttype,
                c = a[d].reltarget,
                p = {
                  packagename: a[d].ext.pkg_name
                };
              if (s == e.CONST.PRODUCT_TYPE.OPEN_APP && 1 == c)
                1 != window.tbs.package.isApkInstalled(p, function (e) {}) &&
                  r.push(i.data[d]);
              else r.push(i.data[d]);
            }
            (i.data = r), o.onComplete && o.onComplete(i);
          },
          processinQBCustomNativeAd: function (t, n, o, i) {
            var a = n.data,
              r = [],
              d = a.length;
            function s(e) {
              0 == e && ((i.data = r), o.onComplete && o.onComplete(i));
            }
            for (var c = 0; c < a.length; c++) {
              var p = a[c].producttype,
                l = a[c].reltarget,
                u = {
                  packagename: a[c].ext.pkg_name
                };
              if ((--d, p == e.CONST.PRODUCT_TYPE.OPEN_APP && 1 == l))
                try {
                  window.browser.app.isInstallApk(function (e) {
                    'true' != JSON.stringify(e) && r.push(i.data[c]), s(d);
                  }, u);
                } catch (e) {
                  console.error(e);
                }
              else r.push(i.data[c]), s(d);
            }
          },
          checkEnvironment: function (e) {
            var t = navigator.userAgent;
            switch (e) {
              case 'inQW':
                return (
                  -1 !== t.indexOf('TBS/') && -1 !== t.indexOf('MQQBrowser/')
                );
              case 'inTBS':
                return (
                  -1 !== t.indexOf('TBS/') || -1 !== t.indexOf('MQQBrowser/')
                );
              case 'inQB':
                return (
                  -1 == t.indexOf('TBS/') && -1 !== t.indexOf('MQQBrowser/')
                );
              default:
                return !1;
            }
          },
          callback: function (t, n, o) {
            var i = {};
            (i =
              o.site_set &&
              e.CONST.SITESET_MOBILE_INNER.toString() === o.site_set.toString()
                ? {
                    data: this.getInsideAdData(t, n),
                    ret: n.ret,
                    cfg: {
                      noping: n.cfg && n.cfg.noping
                    }
                  }
                : {
                    data: this.getUnionAdData(t, n),
                    ret: n.ret
                  }),
              n.template && n.template.length > 0
                ? e.processTemplateNativeAd(t, n, o, i)
                : e.checkEnvironment('inQB')
                ? e.processinQBCustomNativeAd(t, n, o, i)
                : e.checkEnvironment('inQW') &&
                  window.tbs &&
                  window.tbs.package &&
                  window.tbs.package.isApkInstalled
                ? e.processinQWCustomNativeAd(t, n, o, i)
                : e.processCustomNativeAd(t, n, o, i);
          },
          setNativeLoadAd: function (t, n, o, i) {
            if (void 0 === t) return !1;
            e.loadedAd[t] = {
              posid: n,
              adData: o,
              template: i
            };
          },
          setNativeUriMap: function (t, n, i) {
            if (
              'object' !== (void 0 === t ? 'undefined' : o(t)) ||
              void 0 === n
            )
              return !1;
            (e.rlMap[t.cl + n] = t.rl),
              (e.apUrlMap[t.cl + n] = t.apurl),
              (e.rlMap[t.cl + n + i] = t.rl),
              (e.apUrlMap[t.cl + n + i] = t.apurl);
          },
          setNativeAppStatus: function (t) {
            'object' === (void 0 === t ? 'undefined' : o(t)) &&
              (e.isAppAd(t) &&
                t.producttype == e.CONST.PRODUCT_TYPE.OPEN_APP &&
                (e.isAndroidApp[t.cl] = !0),
              e.isAppAd(t) &&
                t.producttype == e.CONST.PRODUCT_TYPE.IOSAPP &&
                (e.isIOSApp[t.cl] = !0));
          },
          getClickUrl: function (t, n) {
            for (var o = n && n.rl, i = 0; i < e.originConflist.length; i++)
              if (t == e.originConflist[i].posId) {
                if (
                  e.originConflist[i].from &&
                  e.originConflist[i].from == e.tbsFlag &&
                  e.tbsDomain == document.domain
                )
                  return (
                    e.isAndroidApp[n.cl]
                      ? (o =
                          ~~o.indexOf('&s_lp') > 0
                            ? o
                            : o + '&acttype=' + e.CONST.ACTTYPE_DOWNLOAD)
                      : e.isIOSApp[n.cl] &&
                        navigator &&
                        navigator.userAgent &&
                        -1 !== navigator.userAgent.indexOf('MicroMessenger') &&
                        (o += '&platform=wx&target=appstore'),
                    o
                  );
                break;
              }
          },
          getInsideAdData: function (t, n) {
            for (
              var o = n.data, i = [], a = '', r = {}, d = '', s = '', c = 0;
              c < o.length;
              c++
            )
              (a = o[c].traceid),
                (d = n.template),
                (s = o[c]),
                this.setNativeLoadAd(a, t, o[c], e.getTemplateByTraceid(a, d)),
                this.setNativeUriMap(s, t, a),
                this.setNativeAppStatus(s),
                (r = {
                  advertisement_id: s.cl,
                  description: s.desc || '',
                  title: s.txt || '',
                  is_app: e.isAppAd(s),
                  icon_url: s.img2 || '',
                  img_url: s.img || '',
                  traceid: a,
                  productid: s.productid,
                  corporation_name: s.corporation_name || '',
                  corporate_image_name: s.corporate_image_name || '',
                  corporate_logo: s.corporate_logo || ''
                }),
                '' !== s.video
                  ? ((r.has_video = !0), (r.video = s.video))
                  : (r.has_video = !1),
                r.is_app &&
                  ((r.app_score = s && s.ext && s.ext.appscore),
                  (r.pkg_url = s && s.ext && s.ext.pkgurl),
                  (r.pkg_name = s && s.ext && s.ext.pkg_name),
                  (r.icon_url = s && s.ext && s.ext.applogo),
                  (r.app_price =
                    s && s.price && '-' != s.price ? parseInt(s.price) : -1),
                  (r.desttype = s && s.ext && s.ext.desttype),
                  (r.download_count =
                    (s &&
                      s.ext &&
                      s.ext.alist &&
                      s.ext.alist[2025] &&
                      s.ext.alist[2025].aid &&
                      s.ext.alist[2025].aid.total) ||
                    -1)),
                i.push(r);
            return i;
          },
          getUnionAdData: function (t, n) {
            var o = n.data,
              i = [],
              a = '',
              r = {},
              d = '',
              s = '';
            if (!o) return i;
            for (var c = 0; c < o.length; c++)
              (a = o[c].traceid),
                (d = n.template),
                (s = o[c]),
                this.setNativeLoadAd(a, t, o[c], e.getTemplateByTraceid(a, d)),
                this.setNativeUriMap(s, t, a),
                this.setNativeAppStatus(s),
                (r = {
                  advertisement_id: s.cl,
                  is_app: e.isAppAd(s),
                  icon_url: s.img2 || '',
                  img_url: s.img || '',
                  description: s.desc || '',
                  title: s.txt || '',
                  traceid: a
                }),
                null !== window.location.host.match(/.qq.com$/) &&
                  (r.rl = s.rl),
                void 0 !== this.getClickUrl(t, s) &&
                  (r.click_url = this.getClickUrl(t, s)),
                r.is_app &&
                  ((r.app_score = (s.ext && s.ext.appscore) || -1),
                  (r.app_price =
                    s.price && '-' != s.price ? parseInt(s.price) : -1),
                  (r.download_count =
                    (s.ext &&
                      s.ext.alist &&
                      s.ext.alist[2025] &&
                      s.ext.alist[2025].aid &&
                      s.ext.alist[2025].aid.total) ||
                    -1)),
                i.push(r);
            return i;
          },
          getTemplateByTraceid: function (e, t) {
            if (!t || t.length <= 0) return null;
            for (var n = 0; n < t.length; n++) {
              var o = t[n].view;
              if (o.indexOf(e) >= 0) return o;
            }
            return null;
          },
          doExpose: function (t) {
            var n = '';
            if (t && t.placement_id && t.advertisement_id && t.traceid)
              n = e.apUrlMap[t.advertisement_id + t.placement_id + t.traceid];
            else {
              if (!(t && t.placement_id && t.advertisement_id)) return;
              n = e.apUrlMap[t.advertisement_id + t.placement_id];
            }
            if (!e.exposureOids[n]) {
              if (t.redirect) new Image().src = n;
              else GDT.view(t.placement_id, t.advertisement_id);
              (e.exposureOids[n] = !0), r.default.event(120311, 'ad_expose', t);
            }
          },
          doClick: function (t) {
            var n = '',
              i = '';
            if (t && t.s) {
              var a =
                  'object' === o(t.s)
                    ? JSON.stringify(t.s)
                    : window.decodeURIComponent(t.s),
                s = JSON.parse(a);
              (a = d.default.setValue2String(s)),
                (t.s = window.encodeURIComponent(JSON.stringify(a)));
            }
            for (var c = 0; c < e.originConflist.length; c++)
              if (t.placement_id == e.originConflist[c].posId) {
                if (
                  e.originConflist[c].from &&
                  e.originConflist[c].from == e.tbsFlag &&
                  e.tbsDomain == document.domain
                )
                  return;
                break;
              }
            if (t && t.s && t.advertisement_id && t.placement_id) {
              if (
                ((i = t.traceid
                  ? e.apUrlMap[t.advertisement_id + t.placement_id + t.traceid]
                  : e.apUrlMap[t.advertisement_id + t.placement_id]),
                r.default.event(120521, 'do_click', t),
                !e.exposureOids[i])
              )
                return (
                  r.default.event(120528, 'ERR_do_click', {
                    params: JSON.stringify(t)
                  }),
                  {
                    ret: 1,
                    msg: 'error，不能进行点击跳转'
                  }
                );
              try {
                var p = h.getCookie('gdt_fp');
                if (p) {
                  var l =
                    'object' === o(t.s)
                      ? decodeURIComponent(JSON.stringify(t.s))
                      : decodeURIComponent(t.s);
                  ((l = JSON.parse(l)).fpid = p),
                    (t.s = encodeURIComponent(JSON.stringify(l)));
                }
              } catch (e) {}
              n = e.rlMap[t.advertisement_id + t.placement_id] + '&s=' + t.s;

              if (e.isAndroidApp[t.advertisement_id]) {
                if (t.qqse_extStr)
                  n =
                    n +
                    '&qqse_extStr=' +
                    encodeURIComponent(JSON.stringify(t.qqse_extStr));
                if (
                  (t._autodownload &&
                    (n = n + '&_autodownload=' + t._autodownload),
                  e.getSite(t.placement_id) == e.CONST.SITESET_MOBILE_INNER)
                )
                  if (0 == t.redirect) new Image().src = n;
                  else location.href = n;
                else
                  (n =
                    ~~n.indexOf('&s_lp') > 0
                      ? n
                      : n + '&acttype=' + e.CONST.ACTTYPE_DOWNLOAD),
                    (location.href = n);
              } else
                e.isIOSApp[t.advertisement_id] &&
                  navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf('MicroMessenger') &&
                  (n += '&platform=wx&target=appstore'),
                  (location.href = n);
            }
          },
          getTopUrl: function () {
            if (window.top === window) return window.location.href;
            if (window.top !== window) {
              var e =
                window.document.referrer &&
                window.document.referrer.match(/^.+:\/\/[^/]+/)[0];
              return (
                new URL(e).hostname.match(/qq.com$/gi), window.location.href
              );
            }
            return null;
          }
        },
        t = {
          SUCCESS: [0, '广告加载成功'],
          CONTAINERID_EMPTY: [100001, 'containerid 不能为空，请输入广告容器'],
          TEMPLATE_EMPTY: [
            100002,
            '返回的广告模板为空，请检查请求返回数据排查问题'
          ]
        },
        n = {
          status: {
            code: 0,
            msg: ''
          },
          posid: '',
          appid: '',
          type: '',
          onComplete: '',
          ext: {
            url: e.getTopUrl()
          },
          initHybridAd: function (e) {
            var t = this;
            if (
              ((this.status = this.checkHybridAdParam(e)),
              0 !== this.status.code)
            )
              return this.onCompleteCb(e, this.status), !1;
            (this.posid = e.placement_id),
              (this.appid = e.app_id),
              (this.type = e.type),
              h.loadJS(
                '//qzs.qq.com/union/res/union_sdk/page/unjs/un.js',
                function () {
                  window.unjs && window.unjs.isInUnSdk()
                    ? (t.status = t.getRespStatus('INIT_SUCC'))
                    : (t.status = t.getRespStatus('ENV_FAIL')),
                    t.onCompleteCb(e, t.status);
                }
              );
          },
          getRespStatus: function (e) {
            var t = {
              code: 0
            };
            switch (e) {
              case 'NO_POSID':
                t = {
                  code: -1,
                  msg: 'placement_id is empty.'
                };
                break;
              case 'NO_APPID':
                t = {
                  code: -2,
                  msg: 'app_id is empty.'
                };
                break;
              case 'NO_ONCOMPLETE':
                t = {
                  code: -3,
                  msg: 'onComplete callback is empty.'
                };
                break;
              case 'ENV_FAIL':
                t = {
                  code: -4,
                  msg: 'env fail'
                };
                break;
              case 'CB_NOT_FUN':
                t = {
                  code: -5,
                  msg: 'callback is not a function'
                };
                break;
              case 'ENV_NOT_SUPPORT':
                t = {
                  code: -6,
                  msg: 'env is not support'
                };
                break;
              case 'INIT_SUCC':
              default:
                t = {
                  code: 0,
                  msg: 'reward ad init success'
                };
            }
            return t;
          },
          checkHybridAdParam: function (e) {
            var t = this.getRespStatus('INIT_SUCC');
            return (
              e.placement_id || (t = this.getRespStatus('NO_POSID')),
              e.app_id || (t = this.getRespStatus('NO_APPID')),
              'function' != typeof e.onComplete &&
                (t = this.getRespStatus('NO_ONCOMPLETE')),
              t
            );
          },
          onCompleteCb: function (e, t) {
            'function' == typeof e.onComplete && e.onComplete(t);
          }
        };
      window.GDT_HYB = n;
      var p = function (e) {
        if (
          ((this.hybrid = window.GDT_HYB),
          (this.instance_id = this.getInstanceId()),
          (this.app_id = this.hybrid.appid),
          (this.placement_id = this.hybrid.posid),
          (this.ext_url = this.hybrid.ext.url),
          (this.xflow_pos_id = d.default.getParam('xflow_pos_id')),
          0 == this.hybrid.status.code)
        ) {
          var t = {
            ext_url: this.ext_url,
            instance_id: this.instance_id,
            placement_id: this.placement_id,
            xflow_pos_id: this.xflow_pos_id
          };
          window.unjs.project &&
          window.unjs.project.rewardVideo &&
          window.unjs.project.rewardVideo.registerRewardVideoAD
            ? window.unjs.project.rewardVideo.registerRewardVideoAD(
                t,
                function (t) {
                  'function' == typeof e && e(t);
                }
              )
            : 'function' == typeof e &&
              e(this.hybrid.getRespStatus('ENV_NOT_SUPPORT'));
        } else
          e(
            'function' == typeof e
              ? this.hybrid.status
              : this.hybrid.getRespStatus('CB_NOT_FUN')
          );
      };
      p.prototype = {
        loadAd: function () {
          var e = {
            instance_id: this.instance_id
          };
          0 == this.hybrid.status.code &&
            window.unjs.project &&
            window.unjs.project.rewardVideo.loadRewardVideoAD(e);
        },
        showAd: function () {
          var e = {
            instance_id: this.instance_id
          };
          0 == this.hybrid.status.code &&
            window.unjs.project &&
            window.unjs.project.rewardVideo.showRewardVideoAD(e);
        },
        getInstanceId: function () {
          return 'SPA_H5_HYBRID_' + new Date().getTime();
        }
      };
      var l,
        u,
        f,
        m = {
          posid: '',
          apurl: '',
          tplType: '',
          posw: 300,
          posh: 250,
          needMask: !1,
          adType: '',
          bannerbox: {},
          tbsWebviewValidateValue: 0,
          webviewType: 0,
          missExpose: !1,
          tbsLoaded: !1,
          posborder: 4,
          adDomain: 'qzonestyle.gtimg.cn',
          onClose: function () {},
          onFail: function () {},
          posDomain: '',
          postNum: '',
          init: function (t) {
            (t.adType = t.type),
              (m.cfgs = t),
              (m.filltype = t.filltype || t.fill_type),
              (m.adType = t.type),
              (m.site_set = t.site_set),
              (m.posDomain = encodeURIComponent(
                document.location.protocol + '//' + document.location.host
              )),
              (m.postNum = Math.random()),
              (m.posid = t.posid || t.placement_id),
              m.initPlatform(),
              'banner' == t.adType
                ? m.initBanner(t)
                : 'interstitial' == t.adType
                ? m.initInter(t)
                : 'native' == t.adType
                ? e.init(t)
                : 'rewardVideo' == t.adType && n.initHybridAd(t),
              h.debugTest(),
              r.default.event(120533, 'ad_init', t);
          },
          initPlatform: function () {
            var e = document.createElement('script');
            (m.platform = 'web'),
              -1 !== navigator.userAgent.search('QQ/')
                ? ((m.platform = 'mqq'),
                  (e.src = '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152'),
                  document.body.appendChild(e))
                : -1 !== navigator.userAgent.search('Qzone')
                ? ((window.QZAppExternal && window.QZAppExternal.getPlatform) ||
                    ((e.src =
                      '//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js'),
                    document.body.appendChild(e)),
                  (m.platform = 'mqzone'),
                  (m.isHybrid = !0))
                : (m.isHybrid = !1);
          },
          BannerCb: {
            onBannerLoaded: function () {}
          },
          initBanner: function (e) {
            var t = m,
              n = [640, 480, 320, 240],
              o = [100, 75, 50, 38],
              i = 480,
              a = 75,
              r = m.getOs();
            if (window.screen)
              (i = window.screen.width),
                (a = window.screen.height),
                'ios' == r &&
                  ((i *= window.devicePixelRatio),
                  (a *= window.devicePixelRatio));
            else if (document.body) {
              var d = window.devicePixelRatio || 1;
              (i = document.body.clientWidth * d),
                (a = document.body.clientHeight * d);
            }
            if (i < a) {
              var s = a;
              (a = i), (i = s);
            }
            i > n[0]
              ? ((t.bannerbox.posw = n[0]), (t.bannerbox.posh = o[0]))
              : i > n[1]
              ? ((t.bannerbox.posw = n[1]), (t.bannerbox.posh = o[1]))
              : i > n[2]
              ? ((t.bannerbox.posw = n[2]), (t.bannerbox.posh = o[2]))
              : ((t.bannerbox.posw = n[3]), (t.bannerbox.posh = o[3])),
              (t.posw = t.bannerbox.posw),
              (t.posh = t.bannerbox.posh),
              (t.BannerCb.onBannerLoaded = e.onBannerLoaded),
              t.renderBannerWindow(e);
          },
          getOs: function () {
            var e = navigator.userAgent || '';
            return (
              (e = e.toLowerCase()),
              /android|adr/.test(e)
                ? 'android'
                : /ios|iphone|ipad|itouch/.test(e)
                ? 'ios'
                : 'uncondi'
            );
          },
          loadGDT: function () {
            m.renderWindow({}, m.posw, m.posh, m.zIndex);
          },
          getWidthHeight: function () {
            var e = document.body.clientWidth || 640,
              t = document.body.clientHeight || 100;
            if (e > t) {
              var n = e;
              (e = t), (t = n);
            }
            var o = m;
            (o.inter_posw = 300),
              (o.inter_posh = 250),
              2 * o.inter_posw < e &&
                ((o.inter_posw *= 2), (o.inter_posh *= 2));
          },
          renderBannerWindow: function (e) {
            (m.posborder = 0),
              m.renderWindow(
                e,
                0,
                0,
                1,
                '//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/banner.html'
              );
          },
          checkParam: function (e) {
            return !new RegExp(
              "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]"
            ).test(e);
          },
          getUid: function () {
            var e = h.getParameter('sid'),
              t = h.getParameter('openid'),
              n = h.getParameter('openkey'),
              o = '';
            return (
              e && h.checkParam(e) && (o += '&sid=' + encodeURIComponent(e)),
              t && h.checkParam(t) && (o += '&openid=' + encodeURIComponent(t)),
              n &&
                h.checkParam(n) &&
                (o += '&openkey=' + encodeURIComponent(n)),
              o
            );
          },
          renderWindow: function (e, t, n, o, i) {
            var a =
                '<div class="gdth_popup_floater"></div><div class="gdth_popup_wrap" style="margin:0 auto;position:relative;{OTHER}">                            {CLOSEDIV}                                <iframe id="{IFRID}" style="position:static !important;display:block !important;margin:0 !important;padding:0 !important;visibility:visible !important;float:none !important;border-width:0 !important;width:{W};height:{H};"                                scrolling=no frameBorder=0 marginHeight=0 marginWidth=0 allowTransparency=true                                 src="{HTMLURL}#{PARAM}"></iframe>{LOGO}                        </div>',
              r = m;
            i ||
              (i =
                '//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/interstitial.html'),
              (r.zIndex = o);
            var d = e.appid || e.app_id,
              s = e.muidtype || e.muid_type,
              c = e.muid,
              p = e.posid || e.placement_id,
              l = !!r.BannerCb.onBannerLoaded,
              u = e.information_info || e.informationInfo,
              f = e.taglist || e.tag_list,
              w = e.posclass || e.pos_class,
              _ = r.inter_posw,
              y = r.inter_posh;
            'banner' == e.adType && ((_ = r.posw), (y = r.posh));
            var b =
              '_spoint=' +
              m._spoint +
              '&posid=' +
              encodeURIComponent(p) +
              '&posh=' +
              y +
              '&posw=' +
              _ +
              '&posdomain=' +
              r.posDomain +
              '&postnum=' +
              r.postNum +
              '&adtype=' +
              encodeURIComponent(e.adType) +
              '&ishybrid=' +
              m.isHybrid +
              '&platform=' +
              m.platform +
              '&posclass=' +
              encodeURIComponent(w) +
              '&hasBannerCB=' +
              encodeURIComponent(l);
            d && 'undefined' != d && (b += '&appid=' + encodeURIComponent(d)),
              f &&
                'undefined' != f &&
                (b += '&taglist=' + encodeURIComponent(f)),
              s &&
                'undefined' != s &&
                c &&
                'undefined' != c &&
                (b +=
                  '&muidtype=' +
                  encodeURIComponent(s) +
                  '&muid=' +
                  encodeURIComponent(c)),
              u &&
                'undefined' != u &&
                '' != u &&
                (b += '&information_info=' + encodeURIComponent(u));
            var T = document.body.clientWidth || document.body.offsetWidth;
            (b += '&win_w=' + T),
              (b +=
                '&win_h=' +
                (document.body.clientHeight || document.body.offsetHeight));
            var C = e.containerid || e.container_id,
              A = 0,
              S = 0;
            C &&
              ((r.container = h.$('#' + C)),
              v.checkIsHidden(r.container) ||
                ((A = '' + r.container.clientWidth),
                (S = '' + r.container.clientHeight),
                (g.BANNER_IFRAME_WIDTH = r.container.clientWidth),
                (A = A.replace(/px/, '')),
                (S = S.replace(/px/, '')),
                -1 != A.indexOf('%') && (A = 0),
                -1 != S.indexOf('%') && (S = 0),
                A && (b += '&conw=' + A) && (T = A),
                S && (b += '&conh=' + S)));
            var I = T / 320 || 1;
            (r.scale = I), (b += '&scale=' + I), (b += '&conw=' + A);
            var x = document.location.href;
            if (
              ((b += '&visiturl=' + encodeURIComponent(x)),
              (b +=
                '&referrerurl=' +
                encodeURIComponent(
                  window.location != window.parent.location
                    ? document.referrer
                    : ''
                )),
              (b += '&iframeheight=' + g.BANNER_IFRAME_HEIGHT),
              (b += '&iframewidth=' + g.BANNER_IFRAME_WIDTH),
              C && h.$('#' + C))
            ) {
              var E = h.$('#' + C).getBoundingClientRect();
              E && (b += '&iframetop=' + E.top);
            } else {
              if ((R = h.$('#gdt-' + r.posid))) {
                var O = R.getBoundingClientRect();
                O && (b += '&iframetop=' + O.top);
              }
            }
            b +=
              '&documentElementClientHeight=' +
              document.documentElement.clientHeight;
            var N = h.getCookie('gdt_fp');
            N && '' != N && (b += '&fpid=' + encodeURIComponent(N)),
              (a = a
                .replace(/{HTMLURL}/, i)
                .replace(/{PARAM}/, b + r.getUid()));
            var k = document.createElement('div');
            if (
              (k.setAttribute('style', 'display:none'),
              (k.id = 'gdt_banner_popup_wrap'),
              'banner' == e.adType)
            ) {
              var P = 30,
                D = 10;
              k.innerHTML = a
                .replace(/{OTHER}/, 'max-width:1280px;')
                .replace(/{W}/, '100%')
                .replace(/{IFRID}/, 'gdt_banner_ifr')
                .replace(
                  /{LOGO}/,
                  '<div id="gdt_logo" style="background-image:url(//qzonestyle.gtimg.cn/open_proj/proj-gdt-toufang/img/ad-sign/logo-ad-s.png);background-size: cover;width:' +
                    P +
                    'px;height:' +
                    D +
                    'px;position: absolute;right: 0;bottom: 0;"><i ></i></div>'
                )
                .replace(/{H}/, '')
                .replace(/{CLOSEDIV}/, '');
              var R,
                L = 'fixed' == e.position ? 'position:fixed' : '';
              if (C && h.$('#' + C)) (L = ''), h.$('#' + C).appendChild(k);
              else (R = h.$('#gdt-' + r.posid)).parentNode.insertBefore(k, R);
              k.setAttribute(
                'style',
                L + ';left:0px;bottom:0;width:100%;display:none'
              );
            } else {
              var M = 'width:30px;height: 30px;',
                B = document.createElement('div');
              (B.id = 'gdt_inter_popup_wrap'),
                (600 != r.inter_posw && 500 != r.inter_posw) ||
                  (M = 'width:60px;height: 60px;'),
                (r.btn_pos = 9),
                600 == r.inter_posw && (r.btn_pos = 18);
              (P = 36), (D = 12);
              (a = a
                .replace(
                  /{OTHER}/,
                  'display: inline-block;"  id="gdth_popup_wrap'
                )
                .replace(/{W}/, r.inter_posw + 'px')
                .replace(/{H}/, r.inter_posh + 'px')
                .replace(
                  /{LOGO}/,
                  '<div id="gdt_logo" style="background-image:url(//qzonestyle.gtimg.cn/open_proj/proj-gdt-toufang/img/ad-sign/logo-ad-s.png);background-size: cover;width:' +
                    P +
                    'px;height:' +
                    D +
                    'px;position: absolute;right: 0;bottom: 0;"><i ></i></div>'
                )
                .replace(/{IFRID}/, 'gdt_ifr')
                .replace(
                  /{CLOSEDIV}/,
                  '<a href="javascript:" style="' +
                    M +
                    'position: absolute;right:4px;top:5px;text-indent: -9999px;overflow: hidden;z-index: 100;" onclick="GDT.closeWindow(this)" class="icon_close">关闭</a>'
                )),
                (B.innerHTML = a),
                (B.style.display = 'none'),
                document.body.appendChild(B);
            }
            window.postMessage
              ? m.initPostMsg()
              : 'banner' == e.adType && m.showBannerWin();
          },
          setOnorientationChangeScale: function (e) {
            var t = document.body.clientWidth / 320 || 1;
            (m.scale = t),
              m.showBannerWin(),
              v.postMessage(
                e,
                {
                  scale: t,
                  flag: 'onorientationchange'
                },
                m.adDomain
              );
          },
          onorientationChange: function (e) {
            var t = this;
            window.addEventListener(
              'onorientationchange' in window ? 'orientationchange' : 'resize',
              function () {
                setTimeout(function () {
                  t.setOnorientationChangeScale(e);
                }, 100),
                  setTimeout(function () {
                    t.setOnorientationChangeScale(e);
                  }, 400);
              },
              !1
            );
          },
          initPostMsg: function () {
            m.bindPostMsg ||
              ((m.bindPostMsg = !0),
              m.onorientationChange('banner'),
              h.addEvent(window, 'message', function (e) {
                var t = e.origin;
                if (
                  (t = h.skipHttpOrHttpsProtocol(t)) &&
                  t == m.adDomain &&
                  e &&
                  e.data
                ) {
                  var n =
                    'string' == typeof e.data ? JSON.parse(e.data) : e.data;
                  if (o || n) {
                    var o = n.result;
                    if ('fail' == o)
                      m.closeWindow(), m.IntersCb.onFail && m.IntersCb.onFail();
                    else if ('success' == o) m.showBannerWin();
                    else if (n.op)
                      if ('checkToLoadTBS' == n.op)
                        y.isTBSsupported() && y.tbsLoad();
                      else if ('mqzoneclick' == n.op)
                        h.pingHot('mqzoneclicked'),
                          QZAppExternal.callSchema(function (e) {}, {
                            url:
                              'mqzone://arouse/webview?source=push&url=' +
                              n.url +
                              '&safari=0&version=1'
                          });
                      else if ('mclick' === n.op) {
                        var i = n.isApp;
                        window.mqq &&
                          window.mqq.ui &&
                          window.mqq.ui.openUrl({
                            url: decodeURIComponent(n.url),
                            target: i ? 2 : 1,
                            style: 3
                          });
                      } else if ('androidAppOtherClick' === n.op)
                        location.href = decodeURIComponent(n.url);
                      else if ('loaededad' === n.op)
                        (m.adready = !0),
                          m.IntersCb.onInterstitialLoaded(),
                          (h.$('.gdth_popup_floater').style.marginBottom =
                            -this.inter_posh / 2 + 'px');
                      else if ('googleInterstitialLoaded' === n.op)
                        (m.adready = !0),
                          m.IntersCb.onInterstitialLoaded(),
                          (h.$('#gdt_logo').style.display = 'none'),
                          (h.$('.gdth_popup_floater').style.marginBottom =
                            -this.inter_posh / 2 + 'px');
                      else if ('showbigsize' == n.op)
                        (m.adready = !0),
                          m.IntersCb.onInterstitialLoaded(),
                          (h.$('#gdt_ifr').style.width = '580px'),
                          (h.$('#gdt_ifr').style.height = '900px'),
                          (h.$('#gdt_logo').style.right = '0'),
                          (h.$('.gdth_popup_floater').style.marginBottom =
                            '-450px'),
                          m.fixFullAdPos(290, 450),
                          window.addEventListener(
                            'orientationchange',
                            function (e) {
                              m.fixFullAdPos(290, 450);
                            }
                          );
                      else if ('checkHidden' == n.op) {
                        var a = n.type,
                          r = n.posid,
                          d = n.flag,
                          s = v.getBaseNode(a);
                        _.checkHidden(s, r, a, d);
                      } else if ('exposeCheck' == n.op) {
                        (a = n.type), (r = n.posid);
                        var c = n.apurl,
                          p = n.tplType;
                        _.prepare(a, r, c, p, l);
                      } else if ('getImgStatus' == n.op) {
                        (a = n.type), (r = n.posid);
                        var l = n.isImgComplete;
                        _.imgExposeCheck(a, r, c, p, l);
                      } else if ('showBanner' == n.op) m.showBannerWin();
                      else if ('noAd' == n.op)
                        m.showBannerWin(),
                          m.BannerCb.onBannerLoaded &&
                            m.BannerCb.onBannerLoaded({
                              ret: 1,
                              msg: 'no ad'
                            });
                      else if ('showGoogleBanner' == n.op) {
                        var u = m.scale * g.BANNER_IFRAME_HEIGHT;
                        (h.$('#gdt_banner_popup_wrap').style.display = ''),
                          (h.$('#gdt_banner_ifr').style.height = u + 'px'),
                          (h.$('#gdt_banner_popup_wrap').style.height =
                            u + 'px'),
                          (h.$('#gdt_logo').style.display = 'none');
                      }
                  }
                }
              }));
          },
          posWinW: 0,
          posWinH: 0,
          fixNormalAdPos: function () {
            var e = h.$('#gdt_inter_popup_wrap');
            if (e) {
              (e.style.textAlign = 'center'),
                (e.querySelector('.gdth_popup_floater').style.height = '50%'),
                (e.querySelector('.gdth_popup_floater').style.position =
                  'relative');
              var t = this.inter_posh || 250;
              e.querySelector('.gdth_popup_floater').style.marginBottom =
                -t / 2 + 'px';
            }
          },
          fixFullAdPos: function (e, t) {
            var n = window.orientation || screen.orientation;
            h.$('#gdth_popup_wrap').style.webkitTransform =
              !n || (90 != n && -90 != n && 270 != n) ? '' : 'rotate(-90deg)';
            document.body.clientWidth, document.body.clientHeight;
          },
          getParameter: function (e, t) {
            var n = new RegExp('(\\?|#|&)' + e + '=([^&#]*)(&|#|$)'),
              o = location.href.match(n);
            return (
              (o && '' != o) || t || (o = window.location.href.match(n)),
              o ? o[2] : ''
            );
          },
          windowShowing: !1,
          showWindow: function () {
            if (!m.windowShowing && m.adready) {
              (m.windowShowing = !0),
                m.needMask && m.showMask(m.zIndex - 1),
                h
                  .$('#gdt_inter_popup_wrap')
                  .setAttribute(
                    'style',
                    'position: absolute;overflow: hidden;width: 100%;height: 100%;left: 0;top: 0;z-index:' +
                      m.zIndex
                  );
              var e = h.$('#gdt_ifr'),
                t = m.adDomain;
              (t = h.isHttpsProtocol() ? 'https://' + t : 'http://' + t),
                e.contentWindow.postMessage(
                  JSON.stringify({
                    op: 'exp'
                  }),
                  t
                ),
                m.fixNormalAdPos();
            }
          },
          showBannerWin: function () {
            var e = m.scale * g.BANNER_IFRAME_HEIGHT;
            (h.$('#gdt_banner_popup_wrap').style.display = ''),
              (h.$('#gdt_banner_ifr').style.height = e + 'px'),
              (h.$('#gdt_banner_popup_wrap').style.height = e + 'px'),
              (m.showedBannerWindow = !0);
          },
          closeWindow: function (e) {
            h.$('#gdt_inter_popup_wrap').setAttribute('style', 'display:none;'),
              h.pingHot('close_inters'),
              m.hideMask(),
              m.IntersCb.onClose && m.IntersCb.onClose(),
              (m.windowShowing = !1);
          },
          MASKID: 'gdt_mask',
          showMask: function (e) {
            var t = m.MASKID;
            if (!h.$('#' + t)) {
              var n = document.createElement('div');
              (n.id = t),
                n.setAttribute(
                  'style',
                  'display:block;position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:black;opacity:.70;-moz-opacity:0.7;filter:alpha(opacity=70);z-index:' +
                    e
                ),
                document.body.appendChild(n);
            }
          },
          hideMask: function () {
            var e = h.$('#' + m.MASKID);
            e && e.parentNode.removeChild(e);
          },
          IntersCb: {
            onClose: function () {},
            onInterstitialLoaded: function () {}
          },
          initInter: function (e) {
            window.postMessage;
            var t = e;
            (m.zIndex = t.zIndex || t.z_index || 9999),
              m.getWidthHeight(),
              (m.needMask = !(!t.showmask && !t.show_mask));
            t.load;
            (m.IntersCb.onClose = t.onClose),
              (m.IntersCb.onInterstitialLoaded = t.onInterstitialLoaded),
              m.renderWindow(t, m.inter_posw, m.inter_posh, m.zIndex);
          },
          collectDPI: function () {
            window.setTimeout(function () {
              var e = window.screen.width || 1e4,
                t = 4;
              e < 100 ? (t = 1) : e < 300 ? (t = 2) : e < 600 && (t = 3);
              var n = '' + window.devicePixelRatio;
              n && (n = n.replace(/\./g, '_')),
                h.pingHot('screen' + t + '.dpi' + n);
              var o = 'ns';
              window.URL && URL.createObjectURL && (o = 'ss'),
                h.pingHot(o + '.' + m.getOs());
            }, 500);
          }
        },
        g = {
          VALID_VISUAL_DISTANCE: 40,
          BANNER_IFRAME_HEIGHT: 50,
          BANNER_IFRAME_WIDTH:
            document.body.clientWidth || document.body.offsetWidth
        },
        h = (l = {
          webpEnabled: !1,
          loadJS: function (e, t) {
            var n = document.getElementsByTagName('head')[0],
              o = document.createElement('script');
            (o.onload = o.onreadystatechange = o.onerror = function () {
              (o &&
                o.readyState &&
                /^(?!(?:loaded|complete)$)/.test(o.readyState)) ||
                ((o.onload = o.onreadystatechange = o.onerror = null),
                (o.src = ''),
                o.parentNode.removeChild(o),
                (o = null),
                'function' == typeof t && t());
            }),
              (o.charset = 'utf-8'),
              (o.src = e);
            try {
              n.appendChild(o);
            } catch (e) {
              console.log(e);
            }
          },
          getByteLen: function (e) {
            for (var t = 0, n = 0; n < e.length; n++)
              null !== e[n].match(/[^x00-xff]/gi) ? (t += 2) : (t += 1);
            return t;
          },
          getParameter: function (e, t) {
            var n = new RegExp('(\\?|#|&)' + e + '=([^&#]*)(&|#|$)'),
              o = location.href.match(n);
            return (
              (o && '' != o) || t || (o = window.location.href.match(n)),
              o ? o[2] : ''
            );
          },
          checkParam: function (e) {
            return !new RegExp(
              "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]"
            ).test(e);
          },
          skipHttpOrHttpsProtocol: function (e) {
            return e
              ? (-1 !== e.indexOf('http://')
                  ? (e = e.substring(7))
                  : -1 !== e.indexOf('https://') && (e = e.substring(8)),
                e)
              : e;
          },
          isHttpsProtocol: function () {
            return (
              -1 === location.protocol.indexOf('http:') &&
              -1 !== location.protocol.indexOf('https:')
            );
          },
          pingHot: function (e, t) {
            var n = t || {},
              o = [
                '//pingfore.qq.com/pingd',
                '?dm=gdt.qq.com.hot',
                '&url=',
                escape(location.pathname),
                '&tt=-',
                '&hottag=h5_inter.' + e,
                '&hotx=' + (n.x || 9999),
                '&hoty=' + (n.y || 9999),
                '&rand=',
                Math.random()
              ].join('');
            new Image().src = o;
          },
          extendIframe: function (e, t) {
            var n = h.$('#gdt_ifr');
            (n.width = t + 'px'),
              (n.height = e + 'px'),
              (n.style.width = t + 'px'),
              (n.style.height = e + 'px');
          },
          addEvent: function (e, t, n) {
            window.attachEvent
              ? e.attachEvent('on' + t, n)
              : e.addEventListener(t, n, !1);
          },
          $: function (e) {
            return document.querySelector(e);
          },
          isInteger: function (e) {
            return 'number' == typeof e && e % 1 == 0;
          },
          isValidMuid: function (e) {
            return !new RegExp('[^a-f0-9]').test(e);
          },
          isValidMuidtype: function (e) {
            return !!parseInt(e) && !new RegExp('[^1-3]').test(e);
          },
          checkWebp: function (e) {
            var t = new Image();
            (t.onerror = function () {
              (l.webpEnabled = !1), e && e();
            }),
              (t.onload = function () {
                (l.webpEnabled = !0), e && e();
              }),
              (t.src =
                'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==');
          },
          debugTest: function () {
            var e = document.createElement('div');
            (e.style.position = 'fixed'), (e.style.backgroundColor = 'gray');
            var t = document.body.firstChild;
            document.body.insertBefore(e, t),
              (m.divObj = e),
              (m.divObj.innerHTML = '');
          },
          log: function (e) {
            m.divObj.innerHTML += e + '</br>';
          },
          getCookie: function (e) {
            var t = null,
              n = new RegExp('(^| )' + e + '=([^;]*)(;|$)');
            return document.cookie.match(n)
              ? ((t = document.cookie.match(n)), unescape(t[2]))
              : null;
          },
          setCookie: function (e, t, n) {
            try {
              document.cookie =
                e + '=' + escape(t) + ';expires=' + n.toGMTString();
            } catch (e) {
              console.error(e);
            }
          }
        }),
        w =
          ((f = {}),
          ((u = {}).init = function (e, t, n) {
            (f.apurl = e), (f.windowClientHeight = t), (f.posid = n);
          }),
          (u.check = function (e, t) {
            if (t == f.posid) {
              var n =
                parseInt(window.pageYOffset) +
                parseInt(f.windowClientHeight) -
                parseInt(e);
              if ('complete' == document.readyState)
                return n > g.VALID_VISUAL_DISTANCE;
              setTimeout(function () {
                u.check(e, t);
              }, 50);
            }
          }),
          u),
        _ = (function () {
          var e = {},
            t = m;
          return (
            (e.bindScroll = {}),
            (e.posTop = 0),
            (e.tbsAdInfo = {}),
            (e.prepare = function (n, o, i, a, r) {
              (e.posid = o),
                (e.apurl = i),
                y.isTBSsupported()
                  ? ((y.tbsAdInfo.adtype = n),
                    (y.tbsAdInfo.posid = o),
                    (y.tbsAdInfo.apurl = i),
                    t.tbsLoaded && 1 == t.webviewType
                      ? y.tbsExposeCheck()
                      : t.tbsLoaded && 2 == t.webviewType && t.missExpose
                      ? (_.doExpose(n, o, i), (t.missExpose = !1))
                      : t.tbsLoaded
                      ? 1 != t.webviewType &&
                        2 != t.webviewType &&
                        (e.initExpose(n, o, i, a, r),
                        h.addEvent(document, 'scroll', function () {
                          e.scrollFunc(n, o, i, a, r);
                        }),
                        (e.bindScroll[o] = !0))
                      : y.tbsLoad())
                  : (e.initExpose(n, o, i, a, r),
                    h.addEvent(document, 'scroll', function () {
                      e.scrollFunc(n, o, i, a, r);
                    }),
                    (e.bindScroll[o] = !0));
            }),
            (e.checkHidden = function (e, t, n, o) {
              var i = '';
              (i = v.checkIsHidden(e) ? 'true' : 'false') &&
                v.postHiddenStatus(n, i, t, o);
            }),
            (e.initExpose = function (t, n, o, i, a) {
              if ('complete' == document.readyState) {
                var r = document.documentElement.clientHeight;
                w.init(o, r, n), e.commonExposeCheck(t, n, o, i, a);
              } else
                setTimeout(function () {
                  e.initExpose(t, n, o, i, a);
                }, 50);
            }),
            (e.calculateElmTop = function (e) {
              return v.getBaseNode(e).offsetTop;
            }),
            (e.commonExposeCheck = function (n, o, i, a, r) {
              a && 'tplImg' == a && !r
                ? (v.postMessage(
                    n,
                    {
                      op: 'checkImg',
                      id: o
                    },
                    t.adDomain
                  ),
                  e.imgExposeCheck(n, o, i, a, r))
                : e.doExposeCheck(n, o, i, a);
            }),
            (e.imgExposeCheck = function (t, n, o, i, a) {
              a && e.posid == n
                ? (o || (o = e.apurl), e.doExposeCheck(t, n, o, i))
                : setTimeout(function () {
                    e.imgExposeCheck(t, n, o, i, a);
                  }, 50);
            }),
            (e.doExposeCheck = function (t, n, o, i) {
              var a = e.calculateElmTop(t);
              w.check(a, n) && e.doExpose(t, n, o, a);
            }),
            (e.doExpose = function (n, o, i, a) {
              e.bindScroll[o] &&
                (document.removeEventListener('scroll', e.scrollFunc, !1),
                (e.bindScroll[o] = !1)),
                v.postMessage(
                  n,
                  {
                    op: 'doExpose',
                    apurl: i,
                    id: o,
                    posTop: a
                  },
                  t.adDomain
                );
            }),
            (e.scrollFunc = function (n, o, i, a, r) {
              t.handler && (t.handler = null),
                e.bundleSetTimeout(n, o, i, a, r);
            }),
            (e.bundleSetTimeout = function (n, o, i, a, r) {
              t.handler = window.setTimeout(function () {
                e.commonExposeCheck(n, o, i, a, r);
              }, 50);
            }),
            e
          );
        })(),
        y = (function () {
          var e = {},
            t = m;
          return (
            (e.tbsAdInfo = {}),
            (e.isTBSPageView = function () {
              var e = navigator.userAgent;
              return (
                -1 !== e.indexOf('TBS/') || -1 !== e.indexOf('MQQBrowser/')
              );
            }),
            (e.isTBSsupported = function () {
              return !(
                -1 === navigator.userAgent.indexOf('TBS') ||
                void 0 === o(window.tbsJs) ||
                !tbsJs.isTbsJsapiEnabled()
              );
            }),
            (e.tbsExposeCheck = function () {
              if (
                e.tbsAdInfo.adtype &&
                e.tbsAdInfo.posid &&
                e.tbsAdInfo.apurl
              ) {
                var n = _.calculateElmTop(e.tbsAdInfo.adtype);
                t.tbsWebviewValidateValue > g.VALID_VISUAL_DISTANCE &&
                  t.tbsWebviewValidateValue - n > g.VALID_VISUAL_DISTANCE &&
                  _.doExpose(
                    e.tbsAdInfo.adtype,
                    e.tbsAdInfo.posid,
                    e.tbsAdInfo.apurl
                  );
              }
            }),
            (e.tbsReady = function () {
              try {
                tbs.event.onwebviewvalidate(function (n) {
                  var o = void 0 !== n.webview_type ? n.webview_type : '-1';
                  '-1' === o || '1' === o
                    ? ((t.tbsWebviewValidateValue = n.value),
                      (t.webviewType = 1),
                      e.tbsExposeCheck())
                    : '2' === o &&
                      ((t.webviewType = 2),
                      e.tbsAdInfo.adtype &&
                      e.tbsAdInfo.posid &&
                      e.tbsAdInfo.apurl
                        ? _.doExpose(
                            e.tbsAdInfo.adtype,
                            e.tbsAdInfo.posid,
                            e.tbsAdInfo.apurl
                          )
                        : (t.missExpose = !0));
                });
              } catch (e) {}
            }),
            (e.tbsLoad = function () {
              h.loadJS('//res.imtt.qq.com/tbs/tbs.js', function () {
                (t.tbsLoaded = !0), y.tbsReady();
              });
            }),
            e
          );
        })(),
        v = (function () {
          var e = {};
          return (
            (e.getBaseNode = function (e) {
              return 'banner' == e
                ? h.$('#gdt_banner_popup_wrap')
                : h.$('#gdt_inter_popup_wrap');
            }),
            (e.getIfr = function (e) {
              return 'banner' == e ? h.$('#gdt_banner_ifr') : h.$('#gdt_ifr');
            }),
            (e.checkIsHidden = function (e) {
              for (
                var t = !1, n = e && e.style, o = 0;
                e != document && o <= 20;

              )
                if (
                  (o++,
                  e != document &&
                    n &&
                    'none' != n.display &&
                    'hidden' != n.visibility &&
                    'collapse' != n.visibility)
                )
                  e = e && e.parentNode;
                else if (
                  (n && 'none' == n.display) ||
                  (n && 'hidden' == n.visibility) ||
                  (n && 'collapse' == n.visibility)
                ) {
                  t = !0;
                  break;
                }
              return t;
            }),
            (e.postHiddenStatus = function (t, n, o, i) {
              var a = '',
                r = '';
              m.container &&
                !e.checkIsHidden(m.container) &&
                (a = ('' + m.container.clientWidth) / 320 || 1);
              m.showedBannerWindow && (r = m.showedBannerWindow),
                e.postMessage(
                  t,
                  {
                    isAdHidden: n,
                    scale: a,
                    showedBanner: r,
                    id: o,
                    flag: i
                  },
                  m.adDomain
                );
            }),
            (e.postMessage = function (e, t, n) {
              var o = v.getIfr(e);
              (n = h.isHttpsProtocol() ? 'https://' + n : 'http://' + n),
                o.contentWindow &&
                  o.contentWindow.postMessage(JSON.stringify(t), n);
            }),
            e
          );
        })();
      (window.GDT = {
        loadGDT: m.loadGDT,
        closeWindow: m.closeWindow,
        showWindow: m.showWindow,
        log: function () {
          console.log(window.TencentGDT),
            console.log(document.location.href),
            console.log(document.head.querySelector('[name=viewport]'));
        },
        // 这里是被覆盖的，也不是入口方法
        init: function (t) {
          var n = window.TencentGDT;
          if (t) m.init(t);
          else for (var o = 0, i = n.length; o < i; o++) m.init(n[o]);
          e.checkAndLoadNativeAd();
        }
      }),
        (m._spoint = +new Date()),
        (window.TencentGDT.NATIVE = {
          loadAd: e.loadAd,
          loadCallback: e.callback,
          doExpose: e.doExpose,
          doClick: e.doClick,
          renderAd: e.renderTemplateNativeAd,
          rewardVideoAd: p
        }),
        (window.TencentGDT.TN = {
          doExpose: e.exposeTemplateNativeAd,
          doClick: e.clickTemplateNativeAd,
          adClose: e.closeTemplateNativeAd
        }),
        (window.TencentGDT.FlowUtil = s.default);
      // 这是入口方法
      var b = window.TencentGDT,
        T = function () {
          if (b && b.length) {
            if (
              (h.getCookie('gdt_fp') ||
                setTimeout(function () {
                  try {
                    new Fingerprint2().get(function (e, t) {
                      if (e) {
                        var n = new Date();
                        n.setTime(n.getTime() + 31536e6),
                          h.setCookie('gdt_fp', e, n);
                      }
                    });
                  } catch (e) {}
                }, 2e3),
              (b = b.sort(function (e, t) {
                return e.type && 'banner' == e.type ? -1 : 1;
              }))[0].type && 'banner' != b[0].type)
            ) {
              for (var t = 0, n = b.length; t < n; t++) m.init(b[t]);
              return void e.checkAndLoadNativeAd();
            }
            var o =
              '//qzonestyle.gtimg.cn/qzone/qzact/act/game/ad/index.js?v=20141119';
            if (1 === b[0].appflag) {
              var i = document.createElement('script');
              (i.src = o),
                (i.onload = function () {
                  wanbaAd && wanbaAd.init && wanbaAd.init(b);
                }),
                document.body.appendChild(i);
            } else {
              window.addEventListener('message', function (t) {
                var n = t.origin;
                if ((n = h.skipHttpOrHttpsProtocol(n)) && 'qzs.qq.com' == n) {
                  if (!t.data) return;
                  if (
                    1 !==
                      (r =
                        'string' == typeof t.data ? JSON.parse(t.data) : t.data)
                        .appflag &&
                    0 !== r.appflag
                  )
                    return;
                  if (r && 0 === r.appflag) {
                    for (var i = 0, a = b.length; i < a; i++) m.init(b[i]);
                    e.checkAndLoadNativeAd();
                  } else {
                    var r;
                    ((r = document.createElement('script')).src = o),
                      (r.onload = function () {
                        wanbaAd && wanbaAd.init && wanbaAd.init(b);
                      }),
                      document.body.appendChild(r);
                  }
                }
              });
              var a = document.createElement('iframe');
              (a.style = 'width:0;height:0;display:none;'),
                (a.width = 0),
                (a.height = 0),
                (a.frameBorder = 0),
                (a.src =
                  '//qzs.qq.com/qzone/qzact/act/game/ad/proxy/index.html'),
                document.body.appendChild(a);
            }
          }
        };
      !(function () {
        if (!window.jsInited) {
          if (((window.jsInited = !0), y.isTBSPageView())) {
            var e = document.createElement('script');
            (e.src = '//jsapi.qq.com/get?api=connection.* '),
              document.body.appendChild(e);
            var t = document.createElement('script');
            (t.src = '//jsapi.qq.com/get?api=app.*'),
              document.body.appendChild(t);
            var n = document.createElement('script');
            (n.src = '//res.imtt.qq.com/tbs/tbs.js'),
              document.body.appendChild(n);
          }
          if (!h.getCookie('gdt_fp')) {
            var o = document.createElement('script');
            (o.src = '//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/js/finger.js'),
              document.body.appendChild(o);
          }
          r.default.event(120313, 'sdk_init', {
            host: window.location.host,
            ua: window.navigator.userAgent
          }),
            h.checkWebp(T);
        }
      })();
    })();
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o,
      i = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      a = n(0),
      r =
        (o = a) && o.__esModule
          ? o
          : {
              default: o
            };
    var d = (function () {
      function e(t) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this.props = t),
          (this.state = {
            isIframe: !!t.isIframe,
            ad: {
              dom: t.dom,
              width: '',
              height: ''
            },
            touchStart: {
              stamp: 0,
              x: -999,
              y: -999
            },
            touchEnd: {
              stamp: 0,
              x: -999,
              y: -999
            },
            click: {
              stamp: 0,
              x: -999,
              y: -999
            },
            drag: t.drag || 0,
            closeBtn: t.closeBtn || 0,
            changeWindow: t.changeWindow || 0,
            playtime: t.playtime || 0
          });
        try {
          this.init();
        } catch (e) {
          console.log(e);
        }
      }
      return (
        i(e, [
          {
            key: 'init',
            value: function () {
              var e = this.state.isIframe;
              (this.state.ad.dom =
                !0 === e
                  ? this.props.dom.contentDocument &&
                    this.props.dom.contentDocument.body
                  : this.props.dom),
                this.touchStart(this.state.ad.dom),
                this.touchEnd(this.state.ad.dom),
                this.click(this.state.ad.dom);
            }
          },
          {
            key: 'touchStart',
            value: function (e) {
              var t = this,
                n = '',
                o = '';
              e.addEventListener(
                'touchstart',
                function (e) {
                  (n = e.touches[0]),
                    (o = e.currentTarget || e.target),
                    (t.state.touchStart = {
                      stamp: new Date().getTime(),
                      x: parseInt(n.pageX - o.offsetLeft),
                      y: parseInt(n.pageY - o.offsetTop)
                    }),
                    r.default.log('touchstart', t.state.touchStart);
                },
                !0
              );
            }
          },
          {
            key: 'touchEnd',
            value: function (e) {
              var t = this,
                n = '',
                o = '';
              e.addEventListener(
                'touchend',
                function (e) {
                  (n = e.changedTouches[0]),
                    (o = e.currentTarget || e.target),
                    (t.state.touchEnd = {
                      stamp: new Date().getTime(),
                      x: parseInt(n.pageX - o.offsetLeft),
                      y: parseInt(n.pageY - o.offsetTop)
                    }),
                    r.default.log('touchend', t.state.touchEnd);
                },
                !0
              );
            }
          },
          {
            key: 'click',
            value: function (e) {
              var t = this,
                n = '';
              e.addEventListener(
                'click',
                function (e) {
                  (n = e.currentTarget || e.target),
                    (t.state.click = {
                      stamp: new Date().getTime(),
                      x: e.pageX - n.offsetLeft,
                      y: e.pageY - n.offsetTop
                    }),
                    r.default.log('click', t.state.click);
                },
                !0
              );
            }
          },
          {
            key: 'getAntiSpamInfo',
            value: function () {
              var e = this.state,
                t = (e.ad, e.touchStart),
                n = e.touchEnd,
                o = e.click,
                i = e.drag,
                a = e.closeBtn,
                r = e.playtime,
                d = e.changeWindow,
                s = o.stamp || n.stamp,
                c = this.state.ad.dom.offsetHeight,
                p = this.state.ad.dom.offsetWidth;
              return {
                g: (n.stamp - t.stamp).toString(),
                sc: Math.abs(s - n.stamp).toString(),
                ec: Math.abs(s - t.stamp).toString(),
                aa: t.x.toString(),
                ab: t.y.toString(),
                ba: n.x.toString(),
                bb: n.y.toString(),
                da: p.toString(),
                db: c.toString(),
                d: i.toString(),
                p: r.toString(),
                f: d.toString(),
                x: a.toString(),
                dpi: window.devicePixelRatio.toString()
              };
            }
          }
        ]),
        e
      );
    })();
    t.default = d;
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      i = r(n(28)),
      a = r(n(1));
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e
          };
    }
    var d = 3e5,
      s = (function () {
        function e(t) {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.appid = t.appid),
            (this.posid = t.posid),
            (this.host = window.location.host),
            this.getRestrictMap(),
            setInterval(this.getRestrictMap.bind(this), d),
            this.hitRestrictMap();
        }
        // 这里可能是反作弊，用来限制广告渲染的
        return (
          o(e, [
            {
              key: 'getRestrictMap',
              value: function () {
                var e = this;
                this.getConfigRate(function () {
                  (0,
                  i.default)('//m.gdt.qq.com/manager/api/operation?op_id=h5sdk_control', {}, function (t, n) {
                    null === t && e.setRestrictData(n);
                  });
                });
              }
            },
            {
              key: 'setRestrictData',
              value: function (e) {
                var t = {};
                0 === e.ret &&
                  e.data.map(function (e) {
                    (t = e.operation), a.default.setItem('__GDT_H5_RST_MAP', t);
                  });
              }
            },
            {
              key: 'getConfigRate',
              value: function (e) {
                try {
                  var t = a.default.getItem('__GDT_H5_RST_MAP'),
                    n = a.default.getItem('__GDT_H5_RST_EXPIRATION'),
                    o = new Date().getTime(),
                    i = JSON.parse(t).restrict_map;
                  if (n && i && i.rate)
                    o - n >= (i.rate || 1e4) &&
                      (e(), a.default.setItem('__GDT_H5_RST_EXPIRATION', o));
                  else e(), a.default.setItem('__GDT_H5_RST_EXPIRATION', o);
                } catch (t) {
                  var r = new Date().getTime();
                  return (
                    e(), a.default.setItem('__GDT_H5_RST_EXPIRATION', r), !1
                  );
                }
              }
            },
            {
              key: 'hitRestrictMap',
              value: function (e, t) {
                try {
                  var n = a.default.getItem('__GDT_H5_RST_MAP'),
                    o = JSON.parse(n).restrict_map,
                    i = t,
                    r = !1;
                  if (o instanceof Object) {
                    if (o.appid && 0 != ~o.appid.indexOf(this.appid))
                      return (r = !0);
                    if (o.posid && 0 != ~o.posid.indexOf(this.posid))
                      return (r = !0);
                    if (o.host && 0 != ~o.host.indexOf(this.host))
                      return (r = !0);
                    if (o.access_count > 0)
                      return (r = e >= (i = o.access_count));
                  }
                  return e >= i ? (r = !0) : r;
                } catch (e) {
                  return !1;
                }
              }
            }
          ]),
          e
        );
      })();
    t.default = s;
  },
  function (e, t, n) {
    'use strict';
    function o() {}
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    t.default = function (e, t, n) {
      var i = '',
        a = null,
        r = '__gdt_jp_' + new Date().getTime() + parseInt(1e5 * Math.random()),
        d = null !== t.timeout ? t.timeout : 6e3,
        s = encodeURIComponent,
        c = document.getElementsByTagName('script')[0] || document.head;
      function p() {
        i.parentNode && i.parentNode.removeChild(i),
          (window[r] = o),
          a && clearTimeout(a);
      }
      return (
        'function' == typeof t && ((n = t), (t = {})),
        t || (t = {}),
        d &&
          (a = setTimeout(function () {
            p(),
              n &&
                n({
                  ret: -1e3
                });
          }, d)),
        (window[r] = function (e) {
          p(), n && n(null, e);
        }),
        (e = (e += (~e.indexOf('?') ? '&' : '?') + 'callback=' + s(r)).replace(
          '?&',
          '?'
        )),
        ((i = document.createElement('script')).src = e),
        c.parentNode.insertBefore(i, c),
        function () {
          window[r] && p();
        }
      );
    };
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    });
    var o,
      i = n(1),
      a =
        (o = i) && o.__esModule
          ? o
          : {
              default: o
            };
    var r = {
      getFlowLpData: function () {
        return decodeURIComponent(a.default.getParam('xflow_lp_data'));
      },
      getFlowOpenId: function () {
        var e = r.getFlowLpData();
        return a.default.getParam('open_id', e);
      },
      getFlowNicename: function () {
        var e = r.getFlowLpData();
        return a.default.getParam('nicename', e);
      }
    };
    t.default = r;
  }
]);
