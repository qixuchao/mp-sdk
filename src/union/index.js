import Event from '../internal/Event';
import { isUndefined, isFunction } from '../utils/type';
import logger from '../logger';
import registerQQ from './vendor/qq';
import registerBaidu from './vendor/baidu';
import { loadScript, createWrapper, addEventListener } from './helper';

// 联盟实例的状态
const STATUS = {
  '0': 'init',
  '1': 'loaded',
  '2': 'loadError',
  '3': 'mounted',
  '10': 'destroyed'
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

// 代理调用
function proxyCall(fn, ...args) {
  return isFunction(fn) && fn.apply(this, args);
}

/**
 * Lifecycle Hooks
 *  init
 *  mounted
 *
 */
export default class Union extends Event {
  static VENDORS = {};
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
      return Union.VENDORS[unionKey].fork();
    }
  }

  constructor(name, options) {
    super();
    this.name = name;
    this.options = options;
    this.sandbox = this.options.sandbox !== false;
  }

  getContainer() {
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
  onLoaded = adInfo => {
    console.log('onLoaded');
    this.log('bidSuc', adInfo);
    this.adInfo = adInfo;

    this.trigger('loaded');
  };

  onTimeOut = () => {
    console.log('timeout');
    this.log('error');
    this.destroy();
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
      this.log('bid');

      proxyCall.call(this, this.options.onInit, data.consumer || {}, {
        onTimeOut: this.onTimeOut,
        onLoaded: this.onLoaded
      });
    };

    this.trigger('init');
    onInit();

    // 同类联盟代码是否已经加载
    console.log(Union.vendorLoaded[this.name]);
    if (Union.vendorLoaded[this.name] === 'init') {
      Union.vendorLoaded[this.name] = 'loading';
      loadScript(
        this.options.src,
        () => {
          Union.vendorLoaded[this.name] = 'loaded';
        },
        () => {
          Union.vendorLoaded[this.name] = 'init';
          this.trigger('loadError');
        }
      );
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
    this.log('winner');
    const container = document.querySelector(selector);
    if (container) {
      this.log('imp');

      // 处理不同联盟渲染在填充前预处理，保证显示正常
      proxyCall.call(this, this.options.onBeforeMount);

      container.appendChild(this.$container);
      this.$container.style.display = 'block';

      // 处理不同联盟渲染在填充前预处理，保证显示正常
      proxyCall.call(this, this.options.onMounted);

      // 绑定点击事件
      if (this.sandbox) {
      } else {
        addEventListener(this.$container, () => {
          this.log('click');
        });
      }
    } else {
      console.error(`Slot 【${selector}】 does not exist`);
    }
  }
  hasReload() {
    if (this.options.reload) {
      this.options.reload(this.data.consumer);
      return true;
    } else {
      return false;
    }
  }
  destroy = () => {
    this.status = '10';
    this.$container.parentNode &&
      this.$container.parentNode.removeChild(this.$container);
  };
}

registerQQ(Union);
registerBaidu(Union);
