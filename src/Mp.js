/* gloabl window */
import { MODEL_NAME, MEDIA_CONFIG_NAME } from './config';
import { each, getImei } from './utils/index';
import { isUndefined, isFunction, isPlainObject } from './utils/type';
import { getFreqControl, setFreqControl } from './utils/storage';
import Union from './union/index';
import Slot from './Slot';

const reCalcConsumerWeight = slotConfig => {
  const fcData = getFreqControl();

  const slotId = slotConfig.slotId;
  const gdtList = [];
  each(slotConfig.slotBidding, consumer => {
    if (consumer.consumer.consumerType === 'gdt') {
      gdtList.push(consumer);
    }
  });
  if (gdtList.length > 1) {
    if (
      fcData[slotId] &&
      fcData[slotId].length &&
      fcData[slotId].length !== gdtList.length
    ) {
      each(gdtList, consumer => {
        if (fcData[slotId].includes(consumer.consumer.consumerSlotId)) {
          consumer.weight = 1;
        } else {
          consumer.weight = 100 - fcData[slotId].length;
        }
      });
    } else {
      each(gdtList, (consumer, index) => {
        if (index === 0) {
          consumer.weight = 100 - gdtList.length;
        } else {
          consumer.weight = 1;
        }
      });
    }
  }

  if (fcData[slotId] && fcData[slotId].length >= gdtList.length) {
    setFreqControl(slotId, []);
  }
  return slotConfig;
};

// 点击频控
const clickFreq = slotConfig => {
  const fcData = getFreqControl();

  const slotId = slotConfig.slotId;
  const clickedConsumerList = fcData[slotId] || [];

  slotConfig.slotBidding = slotConfig.slotBidding.filter(consumer => {
    return !clickedConsumerList.includes(consumer.consumer.consumerSlotId);
  });

  return slotConfig;
};

// 去除同一广告位下相同的消耗方id
const uniqueConsumer = slotBidding => {
  let slotBidConsumers = {};
  each(slotBidding.slotBidding, consumer => {
    const consumerSlotId = consumer.consumer.consumerSlotId;
    if (!slotBidConsumers[consumerSlotId]) {
      slotBidConsumers[consumerSlotId] = consumer;
    }
  });
  slotBidding.slotBidding = Object.values(slotBidConsumers);
  return slotBidding;
};

class Mp {
  Ver = '__VERSION__';

  constructor(slots) {
    // 广告位实例对象
    this.slots = {};
    this.init(slots);
  }

  init(slots) {
    // 广告位配置信息
    this._originalList = slots;
    // 覆盖原有对象
    window[MODEL_NAME] = this;

    // 转化媒体配置
    this.MEDIA_CONFIG = {};

    this.config = window[MEDIA_CONFIG_NAME].config || {};
    this.mediaId = window[MEDIA_CONFIG_NAME].mediaId;

    this.parseMediaConfig(window[MEDIA_CONFIG_NAME]);

    getImei(() => {
      this.handler(this._originalList);
      this.ready = true;
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
  parseMediaConfig(config = {}) {
    // 转化媒体配置
    this.MEDIA_CONFIG = {};
    if (config.slotBiddings) {
      each(config.slotBiddings, slotBidding => {
        this.MEDIA_CONFIG[slotBidding.slotId] = uniqueConsumer(slotBidding);

        // 是否开启动态计算消耗方的权重
        if (this.config.isDynamicWeight) {
          this.MEDIA_CONFIG[slotBidding.slotId] = reCalcConsumerWeight(
            this.MEDIA_CONFIG[slotBidding.slotId]
          );
        }

        // 是否打开点击频控
        if (this.config.isOpenClickFreq) {
          this.MEDIA_CONFIG[slotBidding.slotId] = clickFreq(
            this.MEDIA_CONFIG[slotBidding.slotId]
          );
        }
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
  push = params => {
    if (!this.ready) {
      (this._originalList = this._originalList || []).push(params);
    } else {
      this.handler([params]);
    }
  };

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
      } else if (isPlainObject(slot)) {
        if (!isUndefined(slot.id)) {
          if (isUndefined(this.slots[slot.id]) || slot.force) {
            if (this.MEDIA_CONFIG[slot.id]) {
              // 这里应该去请求广告位，然后调用填充方法
              this.fillAd(
                slot.container,
                {
                  ...this.MEDIA_CONFIG[slot.id],
                  id: slot.id
                },
                slot.force,
                {
                  /**
                   *
                   * @param args
                   *    status {boolean} 状态
                   *    detail {Object}
                   *      detail.union {string} 胜出的联盟
                   *      detail.time {number} 渲染时间戳
                   */
                  complete(...args) {
                    slot.complete && slot.complete.apply(this, args);

                    if (args[0] === false) {
                      try {
                        slot.fallback && slot.fallback();

                        return;
                        if (!document.querySelector('meta[name="referrer"]')) {
                          const meta = document.createElement('meta');
                          meta.setAttribute('name', 'referrer');
                          meta.setAttribute('content', 'always');
                          meta.dataset['dynamic'] = true;
                          document.head.appendChild(meta);
                        }
                        const iframe = document.createElement('iframe');
                        iframe.style.cssText =
                          'border:none;width:100%;height:' +
                          Math.ceil((window.innerWidth / 360) * 56) +
                          'px';
                        iframe.src =
                          'http://me34.cn/#/a/23/edn_c0de476e988be05fa65ddd875356fee4';
                        document
                          .querySelector(slot.container)
                          .appendChild(iframe);
                      } catch (e) {}
                    }
                  },
                  data: JSON.stringify(slot.data) // 媒体传的一些额外的信息
                }
              );
            } else {
              console.error(`Slot configuration does not exist,id：${slot.id}`);
            }
          } else {
            console.error(`Slotid "${slot.id}" already exists`);
          }
        } else if (!isUndefined(slot.mediaid) && !isUndefined(slot.secret)) {
          if (isUndefined(this.mediaid)) {
            this.mediaid = slot.mediaid;
            this.secret = slot.secret;
          } else {
            console.error(`mediaid "${slot.id}" already exists`);
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
  fillAd(container, slotConfig, force, options) {
    this.slots[slotConfig.id] = new Slot(container, slotConfig, options);
  }
}

export default Mp;
