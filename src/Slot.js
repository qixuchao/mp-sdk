import { each, getRandom } from './utils/index';
import Union from './union/index';

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

/**
 * 通过权重计算使用消耗方
 * @param {Array} consumers
 *
 * @returns [Array]
 */

const getMaxConsumerWeight = consumers => {
  let maxWeight = 0;
  each(consumers, ({ weight = 0 }) => {
    if (weight > maxWeight) {
      maxWeight = weight;
    }
  });
  return maxWeight;
};

const getConsumerByWeight = loadedConsumers => {
  let union = {};
  let max = 0;

  each(loadedConsumers, (con, index) => {
    if (con.data.weight > max) {
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
  constructor(container, slotConfig = {}, config, slotOptions = {}) {
    this.container = container;
    this.$container = document.querySelector(container);

    // 是否并非请求
    this.isConcurrent = slotConfig.isConcurrent;
    this.priorityPolicy = slotConfig.priorityPolicy;

    this.slotConfig = slotConfig;
    this.config = config;
    this.slotOptions = slotOptions;

    this.slotId = slotConfig.slotId;
    this.status = '0';

    this.slotContainerSize = {
      width:
        this.$container.clientWidth ||
        this.$container.scrollWidth ||
        this.$container.offsetWidth,
      height:
        this.$container.clientHeight ||
        this.$container.scrollHeight ||
        this.$container.offsetHeight
    };

    //
    this.templateConfig = slotConfig.templateConfig || {};

    this.consumers = slotConfig.slotBidding;

    this.consumerMaxWeight = getMaxConsumerWeight(this.consumers);

    this.loadedConsumers = [];

    this.consumerLength = this.consumers && this.consumers.length;
    this.completeNumber = 0;

    // 已经加载消耗方个数
    this.loadedConsumerNumber = 0;

    this.distribute();
  }

  distribute() {
    if (this.consumerLength > 0) {
      each(this.consumers, con => {
        const union = Union.use(con.consumer.consumerType);
        if (union) {
          union.slotSize = this.slotContainerSize;
          // 存放一个广告位请求不同消耗方请求id，标记为同一次请求
          union.requestId = `${this.slotId}-${
            con.consumer.consumerSlotId
          }-${new Date().getTime()}-${getRandom(0, 100)}`;

          // 存放不同消耗方的不同配置信息
          union.requestData = {
            category: this.isConcurrent,
            sdkVersion: '__VERSION__',
            policyVersion: this.config.policyVersion,
            slotId: this.slotId,
            err: 0,
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

          union.run(con, this.$container);
        } else {
          console.error(
            `Union 【${con.consumer.consumerType}】is not register`
          );
        }
      });
      this.timeouter = setTimeout(() => {
        if (this.slotConfig.priorityPolicy === 2) {
          this.race(getConsumerByWeightForRandom(this.loadedConsumers));
        } else if (this.slotConfig.priorityPolicy === 1) {
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
      (priorityPolicy === 1 && union.data.weight === this.consumerMaxWeight)
    ) {
      this.race(union);
    } else if (
      priorityPolicy === 2 &&
      this.loadedConsumers.length === this.consumerLength
    ) {
      this.race(getConsumerByWeightForRandom(this.loadedConsumers));
    }
  };

  /**
   * 真实填充 根据配置填充策略进行选择
   *
   * 有竞速模式和随机模式
   * @param {Union} union
   */
  race(union) {
    clearTimeout(this.timeouter);
    if (union) {
      if (this.status !== '5') {
        callFunction(this.slotOptions.complete, true);
        this.status = '5';
        console.log('winer ' + union.name);
        this.winner = union;
        union.render(this.container);
      } else {
        union.destroy();
      }
    }
  }
  reload() {
    if (!(this.winner && this.winner.hasReload())) {
      this.status = '7';
      this.distribute();
    }
    return this;
  }
}
