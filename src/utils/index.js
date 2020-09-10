/* gloabl window */
import { isPlainObject, isLikeArray, isUndefined } from './type';

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

const hasOwnProperty = (own, property) => {
  return Object.prototype.hasOwnProperty.call(own, property);
};

export const getRandom = (min, max) => {
  return Math.floor(min + Math.random() * max);
};

export const generateName = (prefix, suffix) => {
  prefix = prefix || '';
  suffix = suffix || '';
  return prefix + '_' + Math.random().toString(36).slice(-6) + '_' + suffix;
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

/**
 * 将对象url参数化
 * @param  {object} paramObj 参数对象
 * @return {string}          url query param
 */
const param = obj => {
  let str = [];
  for (let i in obj) {
    if (!isUndefined(obj[i]) && hasOwnProperty(obj, i)) {
      str.push(i + '=' + encodeURIComponent(obj[i]));
    }
  }
  return str.join('&');
};

const extend = function () {
  let obj,
    args = arguments,
    i = 1,
    len = args.length,
    src = args[0],
    key;

  //如果只有一个参数则将这个参数合并到当前调用对象上
  if (len === 1) {
    i = 0;
    src = this;
  }
  for (; i < len; i++) {
    if ((obj = args[i])) {
      for (key in obj) {
        src[key] = obj[key];
      }
    }
  }
  return src;
};

/**
 * 解析url
 * @param  {String}  str      需要解析的URL
 * @param {boolean} [isNoCaseSensitive] 是否不区分大小写 default:false 默认是区分的
 *                                      如果值为true，则会全部转成小写
 * @return {String}
 */
const parseUrl = (str, isNoCaseSensitive) => {
  var arr,
    part,
    url = {};
  //去掉首位空格
  if (!(str || '').replace(/^\s+|\s+$/, '')) {
    return {};
  }

  str = str.replace(/\S*\?/, '');

  if (str) {
    if (isNoCaseSensitive) {
      str = str.toLocaleLowerCase();
    }

    arr = str.split('&');
    for (let i in arr) {
      part = arr[i].split('=');
      url[part[0]] = decodeURIComponent(part[1]);
    }
  }
  return url;
};

/**
 * 增加参数
 *
 * @param {string}  url
 * @param {object}  params
 * @return {String}
 */
export const addParam = (url, params) => {
  let SEARCH_REG = /\?([^#]*)/,
    HASH_REG = /#(.*)/,
    searchStr;

  url = url || '';
  let search = {},
    searchMatch = url.match(SEARCH_REG);

  if (searchMatch) {
    search = parseUrl(searchMatch[0]);
  }

  //合并当前search参数
  search = extend.call(search, search, params);

  searchStr = '?' + param(search);

  //是否存在search
  if (SEARCH_REG.test(url)) {
    url = url.replace(SEARCH_REG, searchStr);
  } else {
    //是否存在hash
    if (HASH_REG.test(url)) {
      url = url.replace(HASH_REG, searchStr + '#' + url.match(HASH_REG)[1]);
    } else {
      url += searchStr;
    }
  }
  return url;
};
