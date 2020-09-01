import { isPlainObject } from '../utils/type';
import { each } from '../utils/index';
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

export const mergeTrackData = (target, data) => {
  let _target = Object.assign({}, target);
  each(data, (da, key) => {
    if (isPlainObject(da)) {
      _target[key] = Object.assign(_target[key], da);
    } else {
      _target[key] = da;
    }
  });

  each(_target, (da, key) => {
    if (isPlainObject(da)) {
      _target[key] = JSON.stringify(da);
    }
  });

  return _target;
};
