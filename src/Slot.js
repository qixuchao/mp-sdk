import { each } from './utils/index';
import Union from './union/index';
import logger from './logger';

// 广告位状态
const SLOT_STATUS = {
  '0': '初始化',
  '1': '广告请求中',
  '2': '已渲染',
  '3': '渲染失败',
  '4': '重新请求',
  '5': '已渲染',
  '6': '渲染失败'
};

/**
 * 通过权重计算使用消耗方
 * @param {Array} consumers
 *
 * @returns [Array]
 */
function getConsumerByweight(consumers) {
  let maxWeightConsumers = [];
  let maxWeight = 0;
  each(consumers, ({ weight = 0, ...consumer }, index) => {
    // 需要根据环境进行加权和减权
    if (weight > maxWeight) {
      maxWeight = weight;
      maxWeightConsumers = [consumer];
    } else if (weight === maxWeight) {
      maxWeightConsumers.push(consumer);
    }
  });
  return maxWeightConsumers;
}

export default class Slot {
  constructor(container, options = {}, config) {
    this.container = container;
    this.$container = document.querySelector(container);

    // 是否并非请求
    this.isConcurrent = options.isConcurrent;
    this.priorityPolicy = options.priorityPolicy;

    this.options = options;
    this.config = config;

    this.slotId = options.slotId;

    this.status = '0';

    if (options.isConcurrent) {
      this.consumers = options.slotBidding;
    } else {
      this.consumers = getConsumerByweight(options.slotBidding);
    }

    // 已经加载消耗方个数
    this.loadedConsumerNumber = 0;

    this.distribute();
  }

  distribute() {
    each(this.consumers, con => {
      const union = Union.use(con.consumer.consumerType);
      if (union) {
        // 存放一个广告位请求不同消耗方请求id，标记为同一次请求
        union.requestId = `${this.slotId}-${con.consumer.consumerSlotId}`;

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
            this.race(union);
          });

        union.run(con);
      } else {
        console.error(`Union 【${con.consumer.consumerType}】is not register`);
      }
    });
  }

  /**
   * 真实填充 根据配置填充策略进行选择
   *
   * 有竞速模式和随机模式
   * @param {Union} union
   */
  race(union) {
    if (this.status !== '5') {
      this.status = '5';
      console.log('winer ' + union.name);
      this.winner = union;
      union.render(this.container);
    } else {
      //   union.destroy();
    }
  }
  reload() {
    if (!(this.winner && this.winner.hasReload())) {
      this.status = '4';
      this.distribute();
    }
    return this;
  }
}
