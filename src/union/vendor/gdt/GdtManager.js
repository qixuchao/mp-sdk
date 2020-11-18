import { each, addParam } from '../../../utils/index';
import { addEventListener, isVisible } from '../../helper';

let doClick;
let onClose;

/**
  标记状态广点通的complete方法的执行状态，处理初始化时如果方法未执行完成，多次调用广点通请求的问题
 */
const status = {
  0: '初始化',
  1: 'complete执行等待',
  2: 'complete执行完成'
};

/**
 * 由于广点通不支持重新加载广告配置，需要在第一次执行时将配置全部载入。
 * 后面可以通过window.TencentGDT.NATIVE.loadAd(data.consumerSlotId);
 * 再次加载广告。同时增加一个广告位容器和广告位对应的功能
 */
class GdtManager {
  constructor() {
    window.TencentGDT = window.TencentGDT || [];
    this.slotMap = {};
    this.status = 0;
    this.init();
  }
  init() {
    if (window.M$P_M_C && window.M$P_M_C.slotBiddings) {
      each(window.M$P_M_C.slotBiddings, item => {
        each(item.slotBidding, consumer => {
          if (consumer.consumer.consumerType === 'gdt') {
            this.slotMap[consumer.consumer.consumerSlotId] = {
              consumerSlotId: consumer.consumer.consumerSlotId,
              appid: consumer.consumer.appId || 1110655203,
              status: 0,
              fns: [], // 存放callback 存在顺序不一致情况，但不影响，符合执行要求，先插入先执行
              next: [] // 存在并发请求，用于频控处理，每次取3个，处理广告返回长度的next，然后再执行一次next方法 此逻辑循环
            };
          }
        });
      });
      each(this.slotMap, this.initSlot);
    }
  }

  proxyComplete = consumerSlotId => {
    let adKeys = [];
    let isRepeatAd = false;
    return res => {
      this.status = 2;
      let slot = this.slotMap[consumerSlotId];
      let fn;
      // 获取广告位对应的广告素材
      let materialData = [];
      try {
        materialData = window.GDT.getPosData(consumerSlotId).data;
      } catch (e) {}

      if (slot && slot.status === 1 && slot.fns) {
        if (Array.isArray(res)) {
          res.forEach((ad, index) => {
            const adKey = ad.advertisement_id + ad.placement_id;
            if (adKeys.indexOf(adKey) === -1) {
              let currentSlot = slot.fns.shift();

              let currentMaterial = materialData[index] && materialData[index];

              if (currentSlot) {
                adKeys.push(adKey);

                window.TencentGDT.NATIVE.renderAd(ad, currentSlot.container);
                currentSlot.complete(true, currentMaterial);
                fn = slot.next.shift();
              } else {
                return false;
              }
            } else {
              isRepeatAd = true;
            }
          });
          let currentSlot = slot.fns.shift();
          if (isRepeatAd) {
            currentSlot.complete(false, null, '10006');
          }
        } else {
          let currentSlot = slot.fns.shift();
          currentSlot.complete(false);
        }
      }
      if (!fn) {
        fn = slot.next.shift();
      }

      fn && fn();
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
      count: 3, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
      onComplete: this.proxyComplete(slot.consumerSlotId)
    });
  };
  bindSlot(consumerSlotId, slotInstance, complete) {
    this.unionInstance = slotInstance;
    const slot = this.slotMap[consumerSlotId];
    if (slot) {
      slot.status = 1;
      slot.fns.push({
        container: this.unionInstance.id,
        complete
      });
      if (![0, 1].includes(this.status)) {
        if (window.jsInited && window.GDT && window.GDT.load) {
          this.loadAd(consumerSlotId);
        } else {
          slot.next.push(() => {
            this.loadAd(consumerSlotId);
          });
        }
      } else {
        this.status = 1;
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

    TencentGDT.TN.doExpose = () => {};

    const getUnionInstance = traceid => {
      const container = document.querySelector('div[id*="' + traceid + '"]');

      return Union.unionInstances[container.parentNode.id];
    };

    TencentGDT.TN.doClick = function (event, traceid) {
      const union = getUnionInstance(traceid);
      if (union) {
        union.onClick();
        console.log(event);
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
