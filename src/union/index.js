import Event from '../internal/Event';
import { isUndefined, isFunction } from '../utils/type';
import './vendor/qq';
import './vendor/baidu';

const loadScript = (src, success, fail) => {
  console.log(src);
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

const STATUS = {
  '0': 'init',
  '1': 'loaded',
  '2': 'loadError'
};

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
    if (isUndefined(Union.VENDORS[unionKey]) || force) {
      Union.VENDORS[unionKey] = new Union(options);
    } else {
      console.log(`Vendor ${unionKey} already exists`);
    }
  };

  static use(unionKey, data) {
    if (
      !isUndefined(Union.VENDORS[unionKey]) &&
      Union.VENDORS[unionKey] instanceof Union
    ) {
      return Union.VENDORS[unionKey].fork(data);
    }
  }

  constructor(options) {
    super();
    this.options = options;
  }

  onMounted() {
    console.log('mounted');
    this.trigger('mounted');
  }
  /**
   * 基于注册的联盟配置重新实例化
   * 保障每一个广告位实例生命周期完整
   * @param {Object}} data
   */
  fork(data) {
    return new Union(this.options).run(data);
  }
  /**
   *
   * @param {Object} data
   */
  run(data) {
    console.log('run');
    const onInit = () => {
      isFunction(this.options.onInit) &&
        this.options.onInit.call(this, data, {
          onMounted: this.onMounted
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
}
