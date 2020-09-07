/* gloabl window */
import { isPlainObject, isLikeArray } from './type';

export const isDebug =
  /(localhost|127\.0\.0\.1|([192,10]\.168\.\d{1,3}\.\d{1,3}))/.test(
    window.location.hostname
  ) || /_mp_debug_/.test(window.location.search);

export const each = (list, callback) => {
  if (list) {
    if (Array.isArray(list) || isLikeArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (callback && callback(list[i], i) === false) {
          break;
        }
      }
    } else if (isPlainObject(list)) {
      for (let key in list) {
        if (callback && callback(list[key], key) === false) {
          break;
        }
      }
    }
  }
};

export const getRandom = (min, max) => {
  return Math.floor(min + Math.random() * max);
};

/**
 *
 * @param {String} str 需要宏替换的字符串
 * @param {Object} data 替换自定义数据
 */
export const macroReplace = (
  str = '',
  data = {
    REQUESTID: ''
  },
  needEncode = true
) => {
  // 内置数据
  const builtData = {
    OS: 3, // H5
    APP: window.location.hostname,
    IP: '127.0.0.1',
    TS: +new Date()
  };

  const encode = value => {
    if (isPlainObject(value)) {
      value = JSON.stringify(value);
    }
    return needEncode ? encodeURIComponent(value) : value;
  };

  return str.replace(/__(.*?)__/g, function (fragment) {
    let variable = fragment.match(/__(.*)__/);
    const value = builtData[variable[1]] || data[variable[1]];
    return value === undefined ? fragment : encode(value);
  });
};

export const jsonp = url => {
  let script = document.createElement('script');
  const callbackName = '';
  return new Promise((resolve, reject) => {
    window[callbackName] = res => {
      resolve(res);
      window[callbackName] = script = null;
    };
    script.src = `${url}`;

    script.onload = () => {};

    script.onerror = () => {};
  });
};
