import Event from '../internal/Event';
import { isUndefined, isFunction } from '../utils/type';
import logger from '../logger';
import registerQQ from './vendor/qq';
import registerBaidu from './vendor/baidu';

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

const STATUS = {
  '0': 'init',
  '1': 'loaded',
  '2': 'loadError',
  '3': 'mounted'
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
export default class Union extends Event {
  static VENDORS = {};
  /**
   * @type String
   * 为什么状态值，不放到实例而是作为静态变量？
   * 因为实例的执行依赖前置的脚本加载，多个实例之间也同时这个状态。固本身这个状态跟实例无关
   * 所以采用静态变量，实例间共享。
   *
   */
  static status = '0';
  /**
   *
   * @param {String} unionKey
   * @param {Object} options
   *    options.src {String}
   *    options.sandbox {Boolean} default: true
   *    options.onInit {Function}
   * @param {Boolean} force
   */
  static register = function (unionKey, options, force = false) {
    console.log('register');
    if (isUndefined(Union.VENDORS[unionKey]) || force) {
      Union.VENDORS[unionKey] = new Union(options);
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

  constructor(options) {
    super();
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

  onMounted = () => {
    if (this.status !== '3') {
      this.status = '3';
      console.log('mounted');
      this.trigger('mounted');
    }
  };
  onTimeOut = () => {
    console.log('timeout');
  };
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
      isFunction(this.options.onInit) &&
        this.options.onInit.call(this, data.consumer, {
          onMounted: this.onMounted,
          onTimeOut: this.onTimeOut
        });
    };

    if (Union.status === '0') {
      this.trigger('init');
      onInit();
      loadScript(
        this.options.src,
        () => {
          Union.status = '1';
          this.trigger('loaded');
        },
        () => {
          Union.status = '2';
          this.trigger('loadError');
        }
      );
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

registerQQ(Union);
registerBaidu(Union);
