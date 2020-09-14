import Event from '../internal/Event';
import { isUndefined, isFunction } from '../utils/type';
import logger from '../logger';
import registerQQ from './vendor/gdt/gdt';
import registerBaidu from './vendor/baidu';
import registerFancy from './vendor/fancy';
import { loadScript, createWrapper } from './helper';

export const UNION_TIMEOUT = 1000 * 1.5;

// 联盟实例的状态
const STATUS = {
  0: 'init',
  1: 'loaded',
  2: 'loadError',
  3: 'mounted',
  10: 'destroyed'
};

// 渲染广告过程中的错误状态
export const ERROR_TYPE = {
  10000: '广告数组为空',
  10001: 'js加载失败',
  10002: '获取广告超时',
  10003: '广告异常'
};

/**
 * @type {String}
 */
const LOGGER_TYPE = {
  bid: 'bidTracking',
  error: 'errorTracking',
  imp: 'impTracking',
  bidSuc: 'bidSucTracking',
  click: 'clickTracking',
  winner: 'bidSelectedTracking'
};

let UNION_INDEX = 0;

/**
 * Lifecycle Hooks
 *  init
 *  mounted
 *
 */
export default class Union extends Event {
  static VENDORS = {};
  /**
   *
   * @type Object
   * 用于存储广告位实例
   */
  static unionInstances = {};
  /**
   * @type Object
   * 为什么状态值，不放到实例而是作为静态变量？
   * 因为实例的执行依赖前置的脚本加载，多个实例之间也同时这个状态。固本身这个状态跟实例无关
   * 所以采用静态变量，实例间共享。
   *
   * 如果开启沙箱模式，则忽略此字段，每次重新注入
   */
  static vendorLoaded = {};
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
  static register = function (unionKey, options, force = false) {
    if (isUndefined(Union.VENDORS[unionKey]) || force) {
      Union.VENDORS[unionKey] = new Union(unionKey, options);
      Union.vendorLoaded[unionKey] = 'init';
    } else {
      console.log(`Vendor ${unionKey} already exists`);
    }
  };

  static use(unionKey) {
    if (
      !isUndefined(Union.VENDORS[unionKey]) &&
      Union.VENDORS[unionKey] instanceof Union
    ) {
      const union = Union.VENDORS[unionKey].fork();
      Union.unionInstances[union.id] = union;

      return union;
    }
  }

  constructor(name, options) {
    super();
    this.name = name;
    this.options = options;
    this.sandbox = this.options.sandbox !== false;
  }

  getContainer(slotContainer) {
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
  onLoaded = adInfo => {
    this.log('bidSuc', adInfo);
    this.adInfo = adInfo;

    this.trigger('loaded');

    this.trigger('complete');
  };

  onTimeOut = () => {
    console.log('timeout');
    if (this.status === '1') {
      this.logError(10002);
      this.trigger('complete');
      this.destroy();
    }
  };

  /**
   * 基于注册的联盟配置重新实例化
   * 保障每一个广告位实例生命周期完整
   * @param {Object}} data
   */

  fork() {
    const union = new Union(this.name, this.options);
    union.index = UNION_INDEX++;
    union.id = `mp_wrapper_${this.name}_${union.index}`;

    return union;
  }
  /**
   *
   * @param {Object} data
   */
  run(data = {}, slotContainer) {
    this.getContainer(slotContainer);

    this.data = data;
    console.log('run');
    const onInit = () => {
      this.log('bid');

      this.callHook('onInit', data.consumer || {}, {
        onTimeOut: this.onTimeOut,
        onLoaded: this.onLoaded
      });
    };

    this.trigger('init');
    onInit();

    // 同类联盟代码是否已经加载
    if (Union.vendorLoaded[this.name] === 'init') {
      Union.vendorLoaded[this.name] = 'loading';
      loadScript(
        this.options.src,
        () => {
          this.status = '1';
          Union.vendorLoaded[this.name] = 'loaded';
        },
        () => {
          Union.vendorLoaded[this.name] = 'init';
          this.logError(10001);
          this.trigger('loadError');
          this.trigger('complete');
        }
      );
    } else {
      this.status = '1';
    }

    return this;
  }

  logError(code) {
    const data = {
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
  log(type, extralData = {}) {
    let data = {
      REQUESTID: this.requestId, // 一次广告加载周期内（从bid到bidsuc到imp）的上报请求该字段需保持一致，可以按如下规则生成：slotId-consumerSlotId-ts-(100以内随机数)
      DATA: { ...this.requestData, ...extralData.DATA },
      EXT: extralData.EXT
    };

    let timestamp = +new Date();

    const trackingData = this.data.trackingV2Data || this.data.trackingData;
    const trackingUrl = trackingData[LOGGER_TYPE[type]];

    logger.send(trackingUrl, data);
  }

  render(selector) {
    this.log('winner');
    const container = document.querySelector(selector);
    if (container) {
      // 处理不同联盟渲染在填充前预处理，保证显示正常
      this.callHook('onBeforeMount');

      //container.appendChild(this.$container);

      this.$container.style.display = 'block';

      // 处理不同联盟渲染在填充前预处理，保证显示正常

      this.callHook('onMounted');
      this.callHook('onShow');
    } else {
      console.error(`Slot 【${selector}】 does not exist`);
    }
  }
  hasReload() {
    if (this.reload) {
      this.reload(this.data.consumer);
      return true;
    } else {
      return false;
    }
  }
  callHook(fnName, ...args) {
    const fn = this.options[fnName];
    return isFunction(fn) && fn.apply(this, args);
  }
  onClick() {
    console.log('click');
    this.log('click');
  }

  onClose() {
    this.trigger('close');
  }

  destroy = () => {
    this.status = '10';
    this.$container.parentNode &&
      this.$container.parentNode.removeChild(this.$container);
  };
}

registerQQ(Union);
registerBaidu(Union);
registerFancy(Union);
