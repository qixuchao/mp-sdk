import { each } from '../../../utils/index';

let doClick;
let onClose;
/**
 * 由于广点通不支持重新加载广告配置，需要在第一次执行时将配置全部载入。
 * 后面可以通过window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
 * 再次加载广告。同时增加一个广告位容器和广告位对应的功能
 */
class GdtManager {
  constructor() {
    window.TencentGDT = window.TencentGDT || [];
    this.slotMap = {};
    this.init();
  }
  init() {
    if (window.M$P_M_C && window.M$P_M_C.slotBiddings) {
      each(window.M$P_M_C.slotBiddings, item => {
        each(item.slotBidding, consumer => {
          if (consumer.consumer.consumerType === 'gdt') {
            this.slotMap[consumer.consumer.consumerSlotId] = {
              consumerSlotId: consumer.consumer.consumerSlotId,
              appid: consumer.consumer.appId,
              status: 0
            };
          }
        });
      });
      each(this.slotMap, this.initSlot);
    }
  }
  proxyComplete = consumerSlotId => {
    return res => {
      let slot = this.slotMap[consumerSlotId];
      if (slot && slot.status === 1) {
        if (Array.isArray(res)) {
          window.TencentGDT.NATIVE.renderAd(res[0], slot.container);
          slot.complete(true);
        } else {
          slot.complete(false);
        }
      }
    };
  };
  initSlot = slot => {
    // 广告初始化
    window.TencentGDT.push({
      placement_id: slot.consumerSlotId, // {String} - 广告位id - 必填
      app_id: slot.appid, // {String} - appid - 必填
      type: 'native', // 原生模板：native、激励视频：rewardVideo
      // banner：banner广告 interstitial：插屏广告 。 banner、插屏广告必须填写display_type，具体值见各个广告文档说明。
      // display_type: 'banner',
      // containerid: this.id,
      count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
      onComplete: this.proxyComplete(slot.consumerSlotId)
    });
  };
  bindSlot(consumerSlotId, container, complete) {
    const slot = this.slotMap[consumerSlotId];
    if (slot) {
      slot.status = 1;
      slot.container = container;
      slot.complete = complete;
      if (window.jsInited) {
        this.loadAd(consumerSlotId);
      }
    } else {
      console.error(`广点通消耗方id不存在${consumerSlotId}`);
    }
  }
  bindEvent(Union) {
    if (doClick) {
      return;
    }
    doClick = TencentGDT.TN.doClick;
    onClose = TencentGDT.TN.adClose;
    const getUnionInstance = traceid => {
      var container = document.querySelector('div[id*="' + traceid + '"]');

      return Union.unionInstances[container.parentNode.id];
    };

    TencentGDT.TN.doClick = function (event, traceid) {
      const union = getUnionInstance(traceid);
      if (union) {
        union.onClick();
        doClick.apply(this, arguments);
      }
    };

    TencentGDT.TN.adClose = function (event, traceid) {
      const union = getUnionInstance(event.traceid);
      if (union) {
        union.onClose();
        onClose.apply(this, arguments);
      }
    };
  }
  loadAd(consumerSlotId) {
    window.TencentGDT.NATIVE && window.TencentGDT.NATIVE.loadAd(consumerSlotId);
  }
}

let gdtManager;
export default () => {
  if (!gdtManager) {
    gdtManager = new GdtManager();
  }
  return gdtManager;
};
