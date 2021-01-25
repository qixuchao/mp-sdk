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

  off(type, handler) {
    if (Array.isArray(this._events[type])) {
      each(this._events[type], (cb, i) => {
        if (cb === handler) {
          this._events[type].splice(i, 1);
          return false;
        }
      });
    }
    return this;
  }

  once(type, fn) {
    const on = () => {
      this.off(type, on);
      fn.apply(this, arguments);
    };
    on.fn = fn;
    this.on(type, on);
    return this;
  }

  trigger(type, data) {
    let _isStopPropagation = false;
    const stopPropagation = () => {
      _isStopPropagation = true;
    };
    each(this._events[type], fn => {
      if (_isStopPropagation) {
        return false;
      }
      if (isFunction(fn)) {
        fn.call(this, data, { stopPropagation });
      }
    });
  }
}
