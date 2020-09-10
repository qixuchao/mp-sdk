import { isFunction } from '../utils/type';
import { generateName, addParam } from '../utils/index';

export const loadScript = (src, success, fail) => {
  // 寻找script，而不是直接往body中插入，避免代码在head中执行或文档不规范
  const fisrtScript = document.getElementsByTagName('script')[0];

  let script = document.createElement('script');
  script.onload = function () {
    script = script.onload = null;
    success && success();
  };
  script.onerror = function () {
    script = script.onerror = null;
    fail && fail();
  };
  script.src = src;

  fisrtScript.parentNode.insertBefore(script, fisrtScript);
};

export const createWrapper = (tagName = 'div', id) => {
  const tag = document.createElement(tagName);
  tag.id = id;
  tag.style.display = 'none';
  tag.className = id;
  document.body.appendChild(tag);
  return tag;
};

export function addEventListener(el, eventName, callback, isUseCapture) {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, !!isUseCapture);
  } else {
    el.attachEvent('on' + eventName, callback);
  }
}

/**
 *
 * @param  {string} url  [description]
 * @param  {object||function} opts
 */
export const jsonp = (url, opts) => {
  if (isFunction(opts)) {
    opts = {
      callback: opts
    };
  }

  const callbackFnName = opts.callbackFnName || generateName('', 'jsonp');

  opts = opts || {};

  window[callbackFnName] = function (data) {
    opts.callback && opts.callback(data || {});
    try {
      delete window[callbackFnName];
    } catch (e) {}

    window[callbackFnName] = undefined;
  };

  var data = opts.data || {};

  //无缓存
  data.v = Math.random().toString(36).slice(-6);

  data.jsonp = callbackFnName;

  loadScript(addParam(url, data));
};
