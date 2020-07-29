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
  constructor(container, options = {}) {
    this.container = container;
    this.$container = document.querySelector(container);

    this.options = options;

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
    console.log(this.consumers);
    each(this.consumers, con => {
      Union.use(con.consumer.consumerType, con.consumer)
        .on('init', () => {
          console.log('init');
        })
        .on('mounted', () => {
          console.log('mounted');
        });
    });
  }
}
