/*
 * 轮播间隔
 * 增加轮播项
 * 移出轮播项
 * 分页器
 * 容器的尺寸
 * */
import { createWrapper } from '../union/helper';
import { each } from '../utils/index';

export default class Swiper {
  constructor(options) {
    this.options = options;
    this.$slotContainer = document.querySelector(options.container);
    this.currentitems = 0;
    this.id = 'mp_swiper_' + options.slotId + '_' + ++Swiper.uuid;
    this.slotContainerWidth = this.$slotContainer.getBoundingClientRect().width;
    this.slotContainerHeight =
      this.slotContainerWidth / (options.width / options.height);
    this.currentId = 0;
    this.delay = options.delay || 2000;
    this.init();
  }

  static uuid = 0;

  init = () => {
    this.$container = createWrapper(this.$slotContainer, 'div', this.id);
    this.$container.style.cssText = 'position: relative; display: none';

    this.$paginationContainer = createWrapper(
      this.$container,
      'div',
      this.id + '_pagination'
    );
    this.$paginationContainer.style.cssText =
      'position: absolute; display: flex; width: 100%; height: 10px; bottom: 0; justify-content: center; z-index: 1; align-item: center';

    this.$sliderContainer = createWrapper(
      this.$container,
      'div',
      'mp_swiper_' + Swiper.uuid + '_' + this.currentitems
    );
    this.$sliderContainer.style.cssText =
      'display: flex; height: ' + this.slotContainerHeight + ' width: 100%;';
  };

  push = () => {
    this.currentitems++;

    this.$sliderContainer.style.width =
      this.currentitems * this.slotContainerWidth + 'px';

    let $paginationItem = document.createElement('div');
    $paginationItem.className = 'pagination_item';
    $paginationItem.style.cssText =
      'display: inline-block; width: 5px; height: 5px;border-radius: 50%; background-color: gray;margin: 0 3px;';
    this.$paginationContainer.appendChild($paginationItem);

    this.changeItemStyle(0);
  };

  createItemContainer = () => {
    let $item = document.createElement('div');
    $item.style.cssText = 'width: 100%; display: inline-block;';
    $item.className = 'slide_item';
    this.$sliderContainer.appendChild($item);
    return $item;
  };

  changeItemStyle = index => {
    each(
      this.$paginationContainer.querySelectorAll('.pagination_item'),
      (item, i) => {
        item.style.backgroundColor = 'gray';
        if (i === index) {
          item.style.backgroundColor = 'green';
        }
      }
    );
  };

  removeItem = ($container, selector) => {
    each($container.querySelectorAll(selector), item => {
      if (!item.children.length) {
        item.parentElement.removeChild(item);
      }
    });
  };

  reRender = () => {
    this.currentitems--;
    this.removeItem(this.$sliderContainer, '.slide_item');

    this.$sliderContainer.style.width =
      this.currentitems * this.slotContainerWidth + 'px';

    const items = this.$paginationContainer.querySelectorAll(
      '.pagination_item'
    );

    each(items, (item, index) => {
      if (index === 0) {
        item.parentElement.removeChild(item);
      }
    });

    this.currentId = 0;
    this.next();
  };

  next = () => {
    this.currentId++;
    if (this.currentId === this.currentitems) {
      this.currentId = 0;
    }
    let left = -this.currentId * this.slotContainerWidth + 'px';
    this.$sliderContainer.style.transform = 'translateX(' + left + ')';
    this.$sliderContainer.style.transition = 'all .5s';

    this.changeItemStyle(this.currentId);
  };

  previous = () => {};

  finish = () => {
    this.$container.style.display = 'block';
    this.timer = setInterval(() => {
      if (this.currentitems < 2) {
        clearInterval(this.timer);
      }
      this.next();
    }, this.delay);
  };
}
