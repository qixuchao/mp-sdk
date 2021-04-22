import { each, getRandom } from './utils/index';
import Union from './union/index';
import { MODEL_NAME } from './config';
import { getFreqControl, setFreqControl } from './utils/storage';
import Swiper from './plugins/Swiper';
import Event from './internal/Event';

const callFunction = function () {
  return (
    arguments[0] &&
    arguments[0].apply(this, Array.prototype.slice.call(arguments, 1))
  );
};

// 广告位状态
const SLOT_STATUS = {
  0: '初始化',
  1: '广告请求中',
  2: '已渲染',
  3: '渲染失败',
  4: '渲染等待',
  5: '已渲染',
  6: '渲染失败',
  7: '重新请求'
};

// 消耗方优先级类型
const PRIORITY_POLICY_TYPE = {
  0: '时间优先',
  1: '权重优先',
  2: '随机', //暂时不考虑
  3: '优先级顺序' // 1-10,值越小优先级越高
};

// 频次控制的类型
const FREQUENCY_TYPE = {
  0: '无频次控制',
  1: '单价优先',
  2: '曝光频次优先',
  3: '点击频次优先'
};

/**
 * 通过权重计算使用消耗方
 * @param {Array} consumers
 *
 * @returns [Array]
 */

const getHighestPriorityConsumer = consumers => {
  let highest = 100;
  each(consumers, ({ weight = 100 }) => {
    if (weight && weight < highest) {
      highest = weight;
    }
  });
  return highest;
};

const getConsumerByWeight = loadedConsumers => {
  let union = null;
  let max = 100;

  each(loadedConsumers, (con, index) => {
    if (con.data.weight && con.data.weight < max) {
      union = con;
      max = con.data.weight;
    }
  });

  return union;
};

const getConsumerByWeightForRandom = loadedConsumers => {
  let weight = [];
  let weightAmount = 0;
  let union = null;

  // 存贮满足频次要求的消耗方
  let frequencyConsumer = [];
  each(loadedConsumers, con => {
    if (con.data.originWeight) {
      frequencyConsumer.push(con);
    }
  });

  let weightName = 'weight';
  if (frequencyConsumer.length === loadedConsumers.length) {
    weightName = 'originWeight';
  }

  each(loadedConsumers, (con, index) => {
    let currentWeight = con.data[weightName];
    weightAmount += currentWeight;
    let last = (weight[index - 1] && weight[index - 1].rang[1]) || 0;
    weight.push({
      name: con.name,
      weight: currentWeight,
      union: con,
      rang: [last, last + currentWeight]
    });
  });

  const random = getRandom(0, weightAmount);

  each(weight, wei => {
    if (random >= wei.rang[0] && random < wei.rang[1]) {
      union = wei.union;
      return false;
    }
  });

  return union;
};

export default class Slot extends Event {
  /**
   *
   * @param {String} container
   * @param {Object} slotConfig 服务端广告位配置
   * @param {Object} config 全局配置
   * @param {Object} slotOptions 媒体端配置
   *                    slotOptions.fallback // 当广告位无渲染或渲染失败回调
   *                    slotOptions.onClose // 当广告位被关闭回调
   */
  constructor(container, _slotConfig = {}, slotOptions = {}) {
    super();
    this.container = container;

    let slotConfig = {};

    try {
      JSON.parse(JSON.stringify(_slotConfig));
    } catch (e) {}

    window[MODEL_NAME].trigger('recalculateWeightByFrequency', slotConfig);

    // 是否并非请求
    this.isConcurrent = slotConfig.isConcurrent;
    this.priorityPolicy = slotConfig.priorityPolicy;

    this.slotConfig = slotConfig;
    this.slotOptions = slotOptions;

    this.slotId = slotConfig.slotId;
    this.status = '0';

    let $container = document.querySelector(container);

    // 广告位的宽高比
    const adSlotRadio =
      Array.isArray(slotConfig.templateInfo) &&
      slotConfig.templateInfo[0].widgets.root.wh_ratio;

    this.slotContainerSize = {
      width:
        $container.clientWidth ||
        $container.scrollWidth ||
        $container.offsetWidth,
      height:
        $container.clientHeight ||
        $container.scrollHeight ||
        $container.offsetHeight ||
        (adSlotRadio && $container.clientWidth / adSlotRadio)
    };

    //
    this.templateConfig = slotConfig.templateConfig || {};

    this.consumers = slotConfig.slotBidding;

    this.highestPriority = getHighestPriorityConsumer(this.consumers);

    this.loadedConsumers = [];
    this.loadedConsumerWeight = [];

    this.consumerLength = this.consumers && this.consumers.length;
    this.completeNumber = 0;

    // 已经加载消耗方个数

    this.loadedConsumerNumber = 0;

    if (
      this.slotConfig.decorators &&
      this.slotConfig.decorators.type === 'banner'
    ) {
      const swiperOptions = {
        container,
        slotId: slotConfig.slotId,
        ...this.slotConfig.decorators.options
      };

      this.swiperPlugin = new Swiper(swiperOptions);

      this.on('race', (union, { stopPropagation }) => {
        stopPropagation();
        clearTimeout(this.timeouter);
        if (union instanceof Union) {
          if (this.status === '4') {
            callFunction(this.slotOptions.complete, true);
            console.log('winer ' + union.name);
            this.winner = union;
            union.$container._slot_ = this;
            union.render(this.container);
          } else if (this.status !== '5') {
            union.destroy();
          }
        }
      })
        .on('complete', ({ union, status }, { stopPropagation }) => {
          stopPropagation();

          if (status) {
            if (this.status !== '5') {
              this.status = '4';
              this.race(union);
            }
          }
        })
        .on('getContainer', ({}, { stopPropagation }) => {
          stopPropagation();
          this.$container = this.swiperPlugin.createItemContainer();
        });
    }

    this.on('race', union => {
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
    })
      .on('complete', ({ union, status }) => {
        // 当竞选模式是优先级，并且未找到最高优先级的union时,走getConsumerByWeight获取优先级最高的union
        this.handleComplete();
        if (this.completeNumber === this.consumerLength) {
          if (this.status !== '5') {
            this.status = '4';
            if (this.slotConfig.priorityPolicy === 1) {
              this.race(getConsumerByWeightForRandom(this.loadedConsumers));
            } else if (this.slotConfig.priorityPolicy === 3) {
              this.race(getConsumerByWeight(this.loadedConsumers));
            }
            return null;
          }
        }

        if (status) {
          if (this.status !== '5') {
            this.status = '4';
            this.pickConsumer(union);
          }
        }
      })
      .on('getContainer', () => {
        this.$container = document.querySelector(this.container);
      });

    this.distribute();
  }

  distribute() {
    if (this.consumerLength > 0) {
      // reload时清除上次加载成功的consumer
      this.loadedConsumers = [];
      const requestId = `${this.slotId}-${new Date().getTime()}-${getRandom(
        0,
        100
      )}`;
      this.status = '1';

      each(this.consumers, con => {
        const union = Union.use(con.consumer.consumerType);
        if (union) {
          union.slotSize = this.slotContainerSize;

          // 广告位配置调整，将trackingV2Data从consumer层级提到slot级别
          union.trackingV2Data = this.slotConfig.trackingV2Data;

          // 存放一个广告位请求不同消耗方请求id，标记为同一次请求
          union.requestId = requestId;

          // 存放不同消耗方的不同配置信息
          union.requestData = {
            category: this.isConcurrent,
            sdkVersion: '__VERSION__',
            policyVersion: window[MODEL_NAME].config.policyVersion,
            slotId: this.slotId,
            err: 0,
            slotType:
              this.slotConfig.decorators && this.slotConfig.decorators.type,
            data: this.slotOptions.data,
            mediaId: window[MODEL_NAME].mediaId,
            consumerType: con.consumer.consumerType,
            consumerSlotId: con.consumer.consumerSlotId
          };

          union
            .on('init', () => {
              // console.log('init');
            })
            .on('loaded', () => {
              console.log('loaded');
              this.loadedConsumers.push(union);
            })
            .on('complete', status => {
              this.trigger('complete', { status, union });
            })
            .on('close', () => {
              this.swiperPlugin && this.swiperPlugin.reRender();
              callFunction(this.slotConfig.onClose);
            })
            .on('click,imp', ({ slotId, consumerSlotId, type }) => {
              let fcData = getFreqControl(type);
              let fcSlots = {
                [consumerSlotId]: 1
              };

              let freqType = null;

              const {
                priorityPolicyPacingTargetV2,
                priorityPolicyPacingTarget
              } = this.slotConfig;

              const _priorityPolicyPacingTarget =
                priorityPolicyPacingTargetV2 || priorityPolicyPacingTarget;

              if (_priorityPolicyPacingTarget === 3) {
                freqType = 'click';
              } else if (_priorityPolicyPacingTarget === 2) {
                freqType = 'imp';
              }

              if (fcData[slotId] && !Array.isArray(fcData[slotId])) {
                fcSlots = fcData[slotId];
                if (fcSlots[consumerSlotId]) {
                  fcSlots[consumerSlotId] += 1;
                } else {
                  fcSlots[consumerSlotId] = 1;
                }
              }

              freqType === type && setFreqControl(slotId, fcSlots, freqType);
            })
            .on('render', () => {
              this.swiperPlugin && this.swiperPlugin.push();
              this.swiperPlugin && this.swiperPlugin.finish();
            });

          // 单页情况会将原来的广告位给移出，不能缓存
          this.trigger('getContainer', {});

          union.run(con, this.$container);
        } else {
          console.error(
            `Union 【${con.consumer.consumerType}】is not register`
          );
        }
      });

      this.timeouter = setTimeout(() => {
        if (this.slotConfig.priorityPolicy === 1) {
          this.race(getConsumerByWeightForRandom(this.loadedConsumers));
        } else if (this.slotConfig.priorityPolicy === 3) {
          this.race(getConsumerByWeight(this.loadedConsumers));
        }
      }, 3000);
    } else {
      callFunction(this.slotOptions.complete, false);
    }
  }

  handleComplete() {
    if (
      ++this.completeNumber === this.consumerLength &&
      this.status !== '5' &&
      this.status !== '4'
    ) {
      callFunction(this.slotOptions.complete, false);
    }
  }

  pickConsumer = union => {
    const priorityPolicy = this.slotConfig.priorityPolicy;
    if (
      priorityPolicy === 0 ||
      (priorityPolicy === 3 && union.data.weight === this.highestPriority)
    ) {
      this.race(union);
    } else if (
      priorityPolicy === 1 &&
      this.completeNumber === this.consumerLength
    ) {
      this.race(getConsumerByWeightForRandom(this.loadedConsumers));
    }
  };

  /**
   * 真实填充 根据配置填充策略进行选择
   * 有竞速模式和随机模式
   * @param {Union} union
   */
  race(union) {
    console.log('race union', union);
    this.trigger('race', union);
  }
}
