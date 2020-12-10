import { each, getRandom } from './utils/index';
import Union from './union/index';
import { MODEL_NAME } from './config';

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

/**
 * 通过权重计算使用消耗方
 * @param {Array} consumers
 *
 * @returns [Array]
 */

const getHighestPriorityComsuner = consumers => {
  let highest = 10;
  each(consumers, ({ weight = 10 }) => {
    if (weight && weight < highest) {
      highest = weight;
    }
  });
  return highest;
};

const getConsumerByWeight = loadedConsumers => {
  let union = null;
  let max = 10;

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

  each(loadedConsumers, (con, index) => {
    con.data.weight = con.data.weight && Math.max(con.data.weight, 1);
    weightAmount += con.data.weight;
    let last = (weight[index - 1] && weight[index - 1].rang[1]) || 0;
    weight.push({
      name: con.name,
      weight: con.data.weight,
      union: con,
      rang: [last, last + con.data.weight]
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

export default class Slot {
  /**
   *
   * @param {String} container
   * @param {Object} slotConfig 服务端广告位配置
   * @param {Object} config 全局配置
   * @param {Object} slotOptions 媒体端配置
   *                    slotOptions.fallback // 当广告位无渲染或渲染失败回调
   *                    slotOptions.onClose // 当广告位被关闭回调
   */
  constructor(container, slotConfig = {}, slotOptions = {}) {
    this.container = container;

    // 是否并非请求
    this.isConcurrent = slotConfig.isConcurrent;
    this.priorityPolicy = slotConfig.priorityPolicy;

    this.slotConfig = slotConfig;
    this.slotOptions = slotOptions;

    this.slotId = slotConfig.slotId;
    this.status = '0';

    const $container = document.querySelector(container);

    this.slotContainerSize = {
      width:
        $container.clientWidth ||
        $container.scrollWidth ||
        $container.offsetWidth,
      height:
        $container.clientHeight ||
        $container.scrollHeight ||
        $container.offsetHeight
    };

    //
    this.templateConfig = slotConfig.templateConfig || {};

    this.consumers = slotConfig.slotBidding;

    this.highestPriority = getHighestPriorityComsuner(this.consumers);

    this.loadedConsumers = [];

    this.consumerLength = this.consumers && this.consumers.length;
    this.completeNumber = 0;

    // 已经加载消耗方个数
    this.loadedConsumerNumber = 0;

    this.distribute();
  }

  distribute() {
    if (this.consumerLength > 0) {
      // 单页情况会将原来的广告位给移出，不能缓存
      const $container = document.querySelector(this.container);

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
          // 存放一个广告位请求不同消耗方请求id，标记为同一次请求
          union.requestId = requestId;

          // 存放不同消耗方的不同配置信息
          union.requestData = {
            category: this.isConcurrent,
            sdkVersion: '__VERSION__',
            policyVersion: window[MODEL_NAME].config.policyVersion,
            slotId: this.slotId,
            err: 0,
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
              if (this.status !== '5') {
                this.status = '4';
                this.pickConsumer(union);
                // this.race(union);
              }
            })
            .on('complete', this.handleComplete.bind(this))
            .on('close', () => {
              callFunction(this.slotConfig.onClose);
            });

          union.run(con, $container);
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
      this.loadedConsumers.length === this.consumerLength
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
}
