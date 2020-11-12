!(function () {
  'use strict';
  function a(t, n) {
    if (!(t instanceof n))
      throw new TypeError('Cannot call a class as a function');
  }
  function o(t, n) {
    for (var e = 0; e < n.length; e++) {
      var o = n[e];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        'value' in o && (o.writable = !0),
        Object.defineProperty(t, o.key, o);
    }
  }
  function e(t, n, e) {
    return n && o(t.prototype, n), e && o(t, e), t;
  }
  function c(t, n, e) {
    return (
      n in t
        ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (t[n] = e),
      t
    );
  }
  function i(n, t) {
    var e,
      o = Object.keys(n);
    return (
      Object.getOwnPropertySymbols &&
        ((e = Object.getOwnPropertySymbols(n)),
        t &&
          (e = e.filter(function (t) {
            return Object.getOwnPropertyDescriptor(n, t).enumerable;
          })),
        o.push.apply(o, e)),
      o
    );
  }
  function s(n) {
    for (var t = 1; t < arguments.length; t++) {
      var e = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? i(Object(e), !0).forEach(function (t) {
            c(n, t, e[t]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : i(Object(e)).forEach(function (t) {
            Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(e, t));
          });
    }
    return n;
  }
  function u(t) {
    return (u = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function l(t, n) {
    return (l =
      Object.setPrototypeOf ||
      function (t, n) {
        return (t.__proto__ = n), t;
      })(t, n);
  }
  function d(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function t(r) {
    var s = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ('function' == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    })();
    return function () {
      var t,
        n,
        e,
        o,
        i = u(r);
      return (
        (n = s
          ? ((t = u(this).constructor), Reflect.construct(i, arguments, t))
          : i.apply(this, arguments)),
        (e = this),
        !(o = n) || ('object' != typeof o && 'function' != typeof o) ? d(e) : o
      );
    };
  }
  function f(t) {
    return void 0 === t;
  }
  function h(t) {
    return 'function' == typeof t;
  }
  var r = 'M$P_M_C',
    p = 'M$P_UID',
    m = Object.prototype.toString;
  function g(t) {
    if (
      '[object Object]' ===
      (null == (n = t)
        ? void 0 === n
          ? '[object Undefined]'
          : '[object Null]'
        : m.call(n))
    ) {
      var n;
      if (null === Object.getPrototypeOf(t)) return 1;
      for (var e = t; null !== Object.getPrototypeOf(e); )
        e = Object.getPrototypeOf(e);
      return Object.getPrototypeOf(t) === e;
    }
  }
  function v(t, n, e) {
    var o = document.getElementsByTagName('script')[0],
      i = document.createElement('script');
    (i.onload = function () {
      (i = i.onload = null), n && n();
    }),
      (i.onerror = function () {
        (i = i.onerror = null), e && e();
      }),
      (i.src = t),
      o.parentNode.insertBefore(i, o);
  }
  function n(t, n, e) {
    var o = 0 < arguments.length && void 0 !== t ? t : document.body,
      i = 1 < arguments.length && void 0 !== n ? n : 'div',
      r = 2 < arguments.length ? e : void 0,
      s = document.createElement(i);
    return (
      (s.id = r),
      (s.style.display = 'none'),
      (s.className = r),
      o.appendChild(s),
      s
    );
  }
  function y(t, n) {
    if (t)
      if (Array.isArray(t) || ((i = t) && void 0 !== i.length))
        for (var e = 0; e < t.length && (!n || !1 !== n(t[e], e)); e++);
      else if (g(t)) for (var o in t) if (n && !1 === n(t[o], o)) break;
    var i;
  }
  function w(t, n) {
    return Math.floor(t + Math.random() * n);
  }
  function b() {
    return Math.random().toString(36).toUpperCase();
  }
  function I(t, n, e) {
    var o = 0 < arguments.length && void 0 !== t ? t : '',
      i = 1 < arguments.length && void 0 !== n ? n : { REQUESTID: '' },
      r = !(2 < arguments.length && void 0 !== e) || e,
      s = {
        OS: O ? 1 : S ? 2 : '0',
        APP: window.location.hostname,
        CLIENTTYPE: 3,
        IP: '',
        TS: +new Date(),
        IMEI: (function () {
          var t = '';
          try {
            t = window.localStorage.getItem(p);
          } catch (t) {}
          return (
            t ||
              ((t = 'H'
                .concat(Math.floor(new Date() / 1e4), '-')
                .concat(b().slice(-6), '-')
                .concat(b().slice(-6), '-')
                .concat(b().slice(-4))),
              window.localStorage.setItem(p, t)),
            t
          );
        })()
      };
    return o.replace(/__(.*?)__/g, function (t) {
      var n,
        e = t.match(/__(.*)__/),
        o = s[e[1]] || i[e[1]];
      return void 0 === o
        ? ''
        : ((g((n = o)) || Array.isArray(n)) && (n = JSON.stringify(n)),
          r ? encodeURIComponent(n) : n);
    });
  }
  function T(t) {
    var n,
      e,
      o = [];
    for (var i in t)
      !f(t[i]) &&
        ((n = t), (e = i), Object.prototype.hasOwnProperty.call(n, e)) &&
        o.push(i + '=' + encodeURIComponent(t[i]));
    return o.join('&');
  }
  function k(t, n) {
    h(n) && (n = { callback: n });
    var e,
      o,
      i =
        n.callbackFnName ||
        ((e = ''),
        (o = (o = 'jsonp') || ''),
        (e = e || '') + '_' + Math.random().toString(36).slice(-6) + '_' + o);
    (n = n || {}),
      (window[i] = function (t) {
        n.callback && n.callback(t || {});
        try {
          delete window[i];
        } catch (t) {}
        window[i] = void 0;
      });
    var r = n.data || {};
    (r.v = Math.random().toString(36).slice(-6)), (r.jsonp = i), v(_(t, r));
  }
  var C = window.navigator.userAgent,
    O = (/(iPhone|iPod|Android|ios|mobile)/i.test(C), /Android|Linux/.test(C)),
    S = /\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(C),
    D =
      /(localhost|127\.0\.0\.1|([192,10]\.168\.\d{1,3}\.\d{1,3}))/.test(
        window.location.hostname
      ) || /_mp_debug_/.test(window.location.search),
    _ = function (t, n) {
      var e,
        o = /\?([^#]*)/,
        i = /#(.*)/,
        r = {},
        s = (t = t || '').match(o);
      return (
        s &&
          (r = (function (t, n) {
            var e,
              o,
              i = {};
            if (!(t || '').replace(/^\s+|\s+$/, '')) return {};
            if ((t = t.replace(/\S*\?/, '')))
              for (var r in (n && (t = t.toLocaleLowerCase()),
              (e = t.split('&'))))
                i[(o = e[r].split('='))[0]] = decodeURIComponent(o[1]);
            return i;
          })(s[0])),
        (r = function () {
          var t,
            n,
            e = arguments,
            o = 1,
            i = e.length,
            r = e[0];
          for (1 === i && ((o = 0), (r = this)); o < i; o++)
            if ((t = e[o])) for (n in t) r[n] = t[n];
          return r;
        }.call(r, r, n)),
        (e = '?' + T(r)),
        o.test(t)
          ? (t = t.replace(o, e))
          : i.test(t)
          ? (t = t.replace(i, e + '#' + t.match(i)[1]))
          : (t += e),
        t
      );
    },
    j = (function () {
      function t() {
        a(this, t), (this._events = {});
      }
      return (
        e(t, [
          {
            key: 'on',
            value: function (t, n) {
              return (this._events[t] = this._events[t] || []).push(n), this;
            }
          },
          { key: 'off', value: function () {} },
          {
            key: 'once',
            value: function (t) {
              this.on(t, function () {});
            }
          },
          {
            key: 'trigger',
            value: function (t, n) {
              var e = this;
              y(this._events[t], function (t) {
                h(t) && t.call(e, n);
              });
            }
          }
        ]),
        t
      );
    })();
  var E,
    M,
    A,
    P = function (t, i) {
      'string' == typeof t && (t = [t]),
        y(t, function (t) {
          return (
            (e = i),
            void (
              '' !== (n = t) &&
              (((o = new Image()).onload = function () {
                o = o.onload = null;
              }),
              (o.src = I(n, e)))
            )
          );
          var n, e, o;
        });
    },
    x = function () {
      if (D)
        for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
          n[e] = arguments[e];
    },
    N = (function () {
      function l() {
        var o = this;
        a(this, l),
          c(this, 'proxyComplete', function (e) {
            var c = [],
              u = !1;
            return function (t) {
              var r,
                n,
                s = o.slotMap[e],
                a = [];
              try {
                a = window.GDT.getPosData(e).data;
              } catch (t) {}
              s &&
                1 === s.status &&
                s.fns &&
                (Array.isArray(t)
                  ? (t.forEach(function (t, n) {
                      var e = t.advertisement_id + t.placement_id;
                      if (-1 === c.indexOf(e)) {
                        var o = s.fns.shift(),
                          i = a[n] && a[n];
                        if (!o) return !1;
                        c.push(e),
                          setTimeout(function () {
                            new Image().src = _(i.apurl, {
                              callback: '_cb_gdtjson' + l.exposeCount++,
                              datatype: 'jsonp'
                            });
                          }, 1e3),
                          window.TencentGDT.NATIVE.renderAd(t, o.container),
                          o.complete(!0, i),
                          (r = s.next.shift());
                      } else u = !0;
                    }),
                    (n = s.fns.shift()),
                    u && n.complete(!1, null, '10006'))
                  : s.fns.shift().complete(!1)),
                (r = r || s.next.shift()) && r();
            };
          }),
          c(this, 'initSlot', function (t) {
            window.TencentGDT.push({
              placement_id: t.consumerSlotId,
              app_id: t.appid,
              type: 'native',
              count: 3,
              onComplete: o.proxyComplete(t.consumerSlotId)
            });
          }),
          (window.TencentGDT = window.TencentGDT || []),
          (this.slotMap = {}),
          this.init();
      }
      return (
        e(l, [
          {
            key: 'init',
            value: function () {
              var n = this;
              window.M$P_M_C &&
                window.M$P_M_C.slotBiddings &&
                (y(window.M$P_M_C.slotBiddings, function (t) {
                  y(t.slotBidding, function (t) {
                    'gdt' === t.consumer.consumerType &&
                      (n.slotMap[t.consumer.consumerSlotId] = {
                        consumerSlotId: t.consumer.consumerSlotId,
                        appid: t.consumer.appId || 1110655203,
                        status: 0,
                        fns: [],
                        next: []
                      });
                  });
                }),
                y(this.slotMap, this.initSlot));
            }
          },
          {
            key: 'bindSlot',
            value: function (t, n, e) {
              var o = this;
              this.unionInstance = n;
              var i = this.slotMap[t];
              i &&
                ((i.status = 1),
                i.fns.push({ container: this.unionInstance.id, complete: e }),
                window.jsInited && window.GDT && window.GDT.load
                  ? this.loadAd(t)
                  : i.next.push(function () {
                      o.loadAd(t);
                    }));
            }
          },
          {
            key: 'bindEvent',
            value: function (e) {
              var o;
              E ||
                ((E = TencentGDT.TN.doClick),
                (M = TencentGDT.TN.adClose),
                (TencentGDT.TN.doExpose = function () {}),
                (o = function (t) {
                  var n = document.querySelector('div[id*="' + t + '"]');
                  return e.unionInstances[n.parentNode.id];
                }),
                (TencentGDT.TN.doClick = function (t, n) {
                  var e = o(n);
                  e && (e.onClick(), E.apply(this, arguments));
                }),
                (TencentGDT.TN.adClose = function (t, n) {
                  var e = o(t.traceid);
                  e && (e.onClose(), M.apply(this, arguments));
                }));
            }
          },
          {
            key: 'loadAd',
            value: function (t) {
              window.TencentGDT.NATIVE && window.TencentGDT.NATIVE.loadAd(t);
            }
          }
        ]),
        l
      );
    })();
  c(N, 'exposeCount', 0);
  function L() {
    return (A = A || new N());
  }
  var q,
    G = 5e3,
    R = {
      1e4: '广告数组为空',
      10001: 'js加载失败',
      10002: '获取广告超时',
      10003: '广告异常',
      10006: '相同消耗方相同素材重复渲染',
      2e4: '广点通重复加载广告失败'
    },
    $ = {
      bid: 'bidTracking',
      error: 'errorTracking',
      imp: 'impTracking',
      bidSuc: 'bidSucTracking',
      click: 'clickTracking',
      winner: 'bidSelectedTracking'
    },
    V = 0,
    B = (function () {
      !(function (t, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function'
          );
        (t.prototype = Object.create(n && n.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 }
        })),
          n && l(t, n);
      })(r, j);
      var o = t(r);
      function r(t, n) {
        var e;
        return (
          a(this, r),
          c(d((e = o.call(this))), 'onLoaded', function (t) {
            e.log('bidSuc', t),
              (e.adInfo = t),
              e.trigger('loaded'),
              e.trigger('complete');
          }),
          c(d(e), 'onTimeOut', function () {
            var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : '10002';
            '1' === e.status &&
              ((e.status = '10'),
              e.logError(t),
              e.trigger('complete'),
              e.destroy());
          }),
          c(d(e), 'destroy', function () {
            (e.status = '10'),
              e.$container.parentNode &&
                e.$container.parentNode.removeChild(e.$container);
          }),
          (e.name = t),
          (e.options = n),
          (e.sandbox = !1 !== e.options.sandbox),
          e
        );
      }
      return (
        e(r, null, [
          {
            key: 'use',
            value: function (t) {
              if (!f(r.VENDORS[t]) && r.VENDORS[t] instanceof r) {
                var n = r.VENDORS[t].fork();
                return (r.unionInstances[n.id] = n);
              }
            }
          }
        ]),
        e(r, [
          {
            key: 'getContainer',
            value: function (t) {
              !1 === this.sandbox
                ? (this.$container = n(t, 'div', this.id))
                : (this.$container = n(t, 'iframe', this.id));
            }
          },
          {
            key: 'fork',
            value: function () {
              var t = new r(this.name, this.options);
              return (
                (t.index = V++),
                (t.id = 'mp_wrapper_'.concat(this.name, '_').concat(t.index)),
                t
              );
            }
          },
          {
            key: 'run',
            value: function (t, n) {
              var e = this,
                o = 0 < arguments.length && void 0 !== t ? t : {},
                i = 1 < arguments.length ? n : void 0;
              this.getContainer(i), (this.data = o);
              if (
                (this.trigger('init'),
                e.log('bid'),
                e.callHook('onInit', o.consumer || {}, {
                  onTimeOut: e.onTimeOut,
                  onLoaded: e.onLoaded
                }),
                'init' === r.vendorLoaded[this.name])
              ) {
                if (!this.options.src)
                  return (
                    (this.status = '1'),
                    (r.vendorLoaded[this.name] = 'loaded'),
                    this
                  );
                (r.vendorLoaded[this.name] = 'loading'),
                  v(
                    this.options.src,
                    function () {
                      (e.status = '1'), (r.vendorLoaded[e.name] = 'loaded');
                    },
                    function () {
                      (r.vendorLoaded[e.name] = 'init'),
                        e.logError(10001),
                        e.trigger('loadError'),
                        e.trigger('complete');
                    }
                  );
              } else this.status = '1';
              return this;
            }
          },
          {
            key: 'logError',
            value: function (t) {
              var n = { DATA: { err: t, errorMessage: R[t] } };
              this.log('error', n);
            }
          },
          {
            key: 'log',
            value: function (t, n) {
              var e = 1 < arguments.length && void 0 !== n ? n : {},
                o = {
                  REQUESTID: this.requestId,
                  DATA: s(
                    s(s({}, this.requestData), e.DATA),
                    {},
                    { referer: window.location.href }
                  ),
                  EXT: e.EXT
                },
                i = (this.data.trackingV2Data || this.data.trackingData)[$[t]];
              P(i, o);
            }
          },
          {
            key: 'render',
            value: function (t) {
              this.log('winner'),
                document.querySelector(t) &&
                  (this.callHook('onBeforeMount'),
                  (this.$container.style.display = 'block'),
                  this.callHook('onMounted'),
                  this.callHook('onShow'));
            }
          },
          {
            key: 'callHook',
            value: function (t) {
              for (
                var n = this.options[t],
                  e = arguments.length,
                  o = new Array(1 < e ? e - 1 : 0),
                  i = 1;
                i < e;
                i++
              )
                o[i - 1] = arguments[i];
              return h(n) && n.apply(this, o);
            }
          },
          {
            key: 'onClick',
            value: function () {
              this.log('click');
            }
          },
          {
            key: 'onClose',
            value: function () {
              this.trigger('close');
            }
          }
        ]),
        r
      );
    })();
  c(B, 'VENDORS', {}),
    c(B, 'unionInstances', {}),
    c(B, 'vendorLoaded', {}),
    c(B, 'register', function (t, n) {
      var e = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
      (f(B.VENDORS[t]) || e) &&
        ((B.VENDORS[t] = new B(t, n)), (B.vendorLoaded[t] = 'init'));
    }),
    (q = B).register('gdt', {
      src: '//qzs.qq.com/qzone/biz/res/i.js',
      sandbox: !1,
      onInit: function (t, n) {
        var o = n.onLoaded,
          i = n.onTimeOut,
          r = setTimeout(function () {
            i('10002'), clearInterval(r), (r = null);
          }, G);
        L().bindSlot(t.consumerSlotId, this, function (t, n) {
          var e =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : '10000';
          clearInterval(r), t ? o(n) : (x('无广告'), i(e));
        });
      },
      onBeforeMount: function () {},
      onMounted: function () {
        L().bindEvent(q);
      },
      onShow: function () {
        var t, n;
        this.adInfo &&
          ((t = this.adInfo.img_list
            ? this.adInfo.img_list
            : [this.adInfo.img, this.adInfo.img2]),
          (n = {
            title: this.adInfo.txt,
            desc: this.adInfo.desc,
            imgList: t,
            slotId: this.requestData.slotId,
            consumerSlotId: this.requestData.consumerSlotId,
            landingPageUrl: window.location.href,
            consumerType: this.requestData.consumerType,
            mediaId: this.requestData.mediaId
          }),
          this.log('imp', { EXT: n }));
      },
      getWeight: function () {},
      reload: function (t) {
        L().loadAd(t.consumerSlotId);
      }
    }),
    B.register('bd', {
      src: '//cpro.baidustatic.com/cpro/ui/cm.js',
      sandbox: !1,
      onInit: function (t, n) {
        var e,
          o = this,
          i = n.onLoaded,
          r = n.onTimeOut;
        (window.slotbydup = window.slotbydup || []).push({
          id: t.consumerSlotId,
          container: this.id,
          async: !0
        }),
          (e = setTimeout(function () {
            r('10002'), clearInterval(s), (s = null);
          }, G));
        var s = setInterval(function () {
          o.$container &&
            o.$container.querySelector('iframe') &&
            (i(), clearTimeout(e), (e = null), clearInterval(s), (s = null));
        }, 350);
      },
      onMounted: function () {},
      onShow: function () {
        this.log('imp');
      }
    }),
    B.register('ptgapi', {
      src: '',
      sandbox: !1,
      onInit: function (t, n) {
        var e = this,
          o = n.onLoaded,
          i = n.onTimeOut,
          r = setTimeout(function () {
            i('10002'), clearTimeout(r), (r = null);
          }, G),
          s = {
            ip: 'client',
            mid: t.appId || 209,
            si: t.consumerSlotId,
            rr: window.location.href,
            secure: 1,
            reqid: this.requestId,
            device_type: 1,
            mimes: 'img,c',
            rsize: ''
              .concat(this.slotSize.width, '*')
              .concat(this.slotSize.height || 54),
            device: JSON.stringify({
              height: screen.height,
              width: screen.width,
              density: 2
            }),
            v: '1.8.6'
          },
          a = [
            I(this.data.trackingV2Data.clickTracking[0], {
              DATA: this.requestData,
              REQUESTID: this.requestId
            })
          ];
        k('https://g.fancyapi.com/s2s', {
          data: s,
          callback: function (t) {
            var n;
            clearTimeout(r),
              Array.isArray(t.ad) && t.ad.length && t.ad[0].src
                ? ((n = I(t.ad[0].src, { M_PRECLICK: a })),
                  (e.$container.innerHTML = n),
                  o())
                : i('10000');
          }
        });
      },
      onMounted: function () {},
      onShow: function () {
        this.log('imp');
      }
    });
  function U(t) {
    return t && t.apply(this, Array.prototype.slice.call(arguments, 1));
  }
  function z(t, n, e) {
    e = e || 'height: 240px; padding: 0px 15px';
    var o = document.createElement('iframe');
    (o.style.cssText = 'width: 100%;border: none;'.concat(e)),
      document.querySelector(n).appendChild(o);
    var i = o.contentDocument;
    i.body.style.cssText =
      'margin: 0; box-sizing: border-box; border-bottom: 1px solid #f5f5f5;';
    var r = i.createElement('script');
    (r.src = t), i.body.appendChild(r);
  }
  var H = function (t) {
      var o = 10;
      return (
        y(t, function (t) {
          var n = t.weight,
            e = void 0 === n ? 10 : n;
          e && e < o && (o = e);
        }),
        o
      );
    },
    F = function (t) {
      var o = [],
        i = 0,
        n = null;
      y(t, function (t, n) {
        (t.data.weight = t.data.weight && Math.max(t.data.weight, 1)),
          (i += t.data.weight);
        var e = (o[n - 1] && o[n - 1].rang[1]) || 0;
        o.push({
          name: t.name,
          weight: t.data.weight,
          union: t,
          rang: [e, e + t.data.weight]
        });
      });
      var e = w(0, i);
      return (
        y(o, function (t) {
          if (e >= t.rang[0] && e < t.rang[1]) return (n = t.union), !1;
        }),
        n
      );
    },
    W = (function () {
      function s(t) {
        var e = this,
          n =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          o = 2 < arguments.length ? arguments[2] : void 0,
          i =
            3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
        a(this, s),
          c(this, 'pickConsumer', function (t) {
            var n = e.slotConfig.priorityPolicy;
            0 === n || (3 === n && t.data.weight === e.consumerMaxWeight)
              ? e.race(t)
              : 1 === n &&
                e.loadedConsumers.length === e.consumerLength &&
                e.race(F(e.loadedConsumers));
          }),
          (this.container = t),
          (this.isConcurrent = n.isConcurrent),
          (this.priorityPolicy = n.priorityPolicy),
          (this.slotConfig = n),
          (this.config = o),
          (this.slotOptions = i),
          (this.slotId = n.slotId),
          (this.status = '0');
        var r = document.querySelector(t);
        (this.slotContainerSize = {
          width: r.clientWidth || r.scrollWidth || r.offsetWidth,
          height: r.clientHeight || r.scrollHeight || r.offsetHeight
        }),
          (this.templateConfig = n.templateConfig || {}),
          (this.consumers = n.slotBidding),
          (this.consumerMaxWeight = H(this.consumers)),
          (this.loadedConsumers = []),
          (this.consumerLength = this.consumers && this.consumers.length),
          (this.completeNumber = 0),
          (this.loadedConsumerNumber = 0),
          this.distribute();
      }
      return (
        e(s, [
          {
            key: 'distribute',
            value: function () {
              var e,
                o,
                i = this;
              0 < this.consumerLength
                ? ((e = document.querySelector(this.container)),
                  (this.loadedConsumers = []),
                  (o = ''
                    .concat(this.slotId, '-')
                    .concat(new Date().getTime(), '-')
                    .concat(w(0, 100))),
                  y(this.consumers, function (t) {
                    var n = B.use(t.consumer.consumerType);
                    n &&
                      ((n.slotSize = i.slotContainerSize),
                      (n.requestId = o),
                      (n.requestData = {
                        category: i.isConcurrent,
                        sdkVersion: '1.8.6',
                        policyVersion: i.config.policyVersion,
                        slotId: i.slotId,
                        err: 0,
                        mediaId: i.config.mediaId,
                        consumerType: t.consumer.consumerType,
                        consumerSlotId: t.consumer.consumerSlotId
                      }),
                      n
                        .on('init', function () {})
                        .on('loaded', function () {
                          i.loadedConsumers.push(n),
                            '5' !== i.status &&
                              ((i.status = '4'), i.pickConsumer(n));
                        })
                        .on('complete', i.handleComplete.bind(i))
                        .on('close', function () {
                          U(i.slotConfig.onClose);
                        }),
                      n.run(t, e));
                  }),
                  (this.timeouter = setTimeout(function () {
                    var t, e, o;
                    1 === i.slotConfig.priorityPolicy
                      ? i.race(F(i.loadedConsumers))
                      : 3 === i.slotConfig.priorityPolicy &&
                        i.race(
                          ((t = i.loadedConsumers),
                          (e = null),
                          (o = 10),
                          y(t, function (t, n) {
                            t.data.weight &&
                              t.data.weight < o &&
                              (o = (e = t).data.weight);
                          }),
                          e)
                        );
                  }, 3e3)))
                : U(this.slotOptions.complete, !1);
            }
          },
          {
            key: 'handleComplete',
            value: function () {
              ++this.completeNumber === this.consumerLength &&
                '5' !== this.status &&
                '4' !== this.status &&
                U(this.slotOptions.complete, !1);
            }
          },
          {
            key: 'race',
            value: function (t) {
              clearTimeout(this.timeouter),
                t instanceof B &&
                  ('5' !== this.status
                    ? (U(this.slotOptions.complete, !0),
                      (this.status = '5'),
                      (this.winner = t).render(this.container))
                    : t.destroy());
            }
          }
        ]),
        s
      );
    })(),
    X = (function () {
      function n(t) {
        a(this, n), c(this, 'Ver', '1.8.6'), (this.slots = {}), this.init(t);
      }
      return (
        e(n, [
          {
            key: 'init',
            value: function (t) {
              (this._originalList = t),
                ((window.M$P = this).MEDIA_CONFIG = {}),
                (this.config = window[r].config || {}),
                (this.config.mediaId = window[r].mediaId),
                this.parseMediaConfig(window[r]),
                this.handler(this._originalList);
            }
          },
          {
            key: 'parseMediaConfig',
            value: function (t) {
              var n = this,
                e = 0 < arguments.length && void 0 !== t ? t : {};
              (this.MEDIA_CONFIG = {}),
                e.slotBiddings &&
                  y(e.slotBiddings, function (t) {
                    n.MEDIA_CONFIG[t.slotId] = n.uniqueConsumer(t);
                  });
            }
          },
          {
            key: 'uniqueConsumer',
            value: function (t) {
              var e = {};
              return (
                y(t.slotBidding, function (t) {
                  var n = t.consumer.consumerType;
                  e[n] || (e[n] = t);
                }),
                (t.slotBidding = Object.values(e)),
                t
              );
            }
          },
          {
            key: 'push',
            value: function (t) {
              this.handler([t]);
            }
          },
          {
            key: 'handler',
            value: function (t) {
              var n = this;
              y(t, function (o) {
                h(o)
                  ? o.call(n, {
                      union: { register: B.register, use: B.use },
                      utils: {}
                    })
                  : g(o) &&
                    (f(o.id)
                      ? f(o.mediaid) ||
                        f(o.secret) ||
                        (f(n.mediaid) &&
                          ((n.mediaid = o.mediaid), (n.secret = o.secret)))
                      : (f(n.slots[o.id]) || o.force) &&
                        n.MEDIA_CONFIG[o.id] &&
                        n.fillAd(
                          o.container,
                          s(s({}, n.MEDIA_CONFIG[o.id]), {}, { id: o.id }),
                          o.force,
                          {
                            complete: function () {
                              for (
                                var t = arguments.length,
                                  n = new Array(t),
                                  e = 0;
                                e < t;
                                e++
                              )
                                n[e] = arguments[e];
                              o.complete && o.complete.apply(this, n),
                                '160003' === o.id &&
                                  v('//static.xiawan8.com/temp/autoJump.js'),
                                !1 === n[0] &&
                                  ('m.yuexinwen.cn' === window.location.host
                                    ? '150001' === o.id
                                      ? z(
                                          '//enin.xu7b.com/js/mob/yuexwen.js',
                                          o.container,
                                          'height: 59px; padding: 0'
                                        )
                                      : '150004' !== o.id &&
                                        z(
                                          '//enin.xu7b.com/js/mob/yuexinw.js',
                                          o.container
                                        )
                                    : '160003' === o.id
                                    ? z(
                                        '//sfk.t58b.com/fanwei1.js',
                                        o.container
                                      )
                                    : o.fallback && o.fallback());
                            }
                          }
                        ));
              });
            }
          },
          {
            key: 'fillAd',
            value: function (t, n, e, o) {
              this.slots[n.id] = new W(t, n, this.config, o);
            }
          }
        ]),
        n
      );
    })(),
    J = window.M$P;
  (Array.isArray(J) || f(J)) && new X(J);
})();
