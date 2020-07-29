import { isPlainObject } from './type';

export const each = (list, callback) => {
  if (list) {
    if (Array.isArray(list)) {
      list.forEach(callback);
    } else if (isPlainObject) {
      for (let key in list) {
        callback && callback(list[key], key);
      }
    }
  }
};
