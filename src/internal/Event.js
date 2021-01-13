import { each } from '../utils/index';
import { isFunction } from '../utils/type';

export default class Event {
  constructor() {
    this._events = {};
  }
  on(type, handler) {
    const types = type.split(',');
    each(types, type => {
      (this._events[type] = this._events[type] || []).push(handler);
    });

    return this;
  }
  off(type, handler) {}
  once(type, handler) {
    this.on(type, () => {});
  }
  trigger(type, data) {
    each(this._events[type], fn => {
      if (isFunction(fn)) {
        fn.call(this, data);
      }
    });
  }
}
