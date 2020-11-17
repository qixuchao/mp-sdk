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

export const createWrapper = (context = document.body, tagName = 'div', id) => {
  const tag = document.createElement(tagName);
  tag.id = id;
  tag.style.display = 'none';
  tag.className = id;
  context.appendChild(tag);
  return tag;
};

export function addEventListener(el, eventName, callback, isUseCapture) {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, !!isUseCapture);
  } else {
    el.attachEvent('on' + eventName, callback);
  }
}

export const withIframeRenderAd = (url, container, iframeStyle) => {
  iframeStyle = iframeStyle || 'height: 240px; padding: 0px 15px';
  let iframe = document.createElement('iframe');
  iframe.style.cssText = `width: 100%;border: none;${iframeStyle}`;

  document.querySelector(container).appendChild(iframe);

  let iframeDoc = iframe.contentDocument;

  iframeDoc.body.style.cssText =
    'margin: 0; box-sizing: border-box; border-bottom: 1px solid #f5f5f5;';
  let script = iframeDoc.createElement('script');
  script.src = url;
  iframeDoc.body.appendChild(script);
};

export const isVisible = ele => {
  if (ele) {
    const eleRect = ele.getBoundingClientRect();
    return eleRect.top + eleRect.height > 0 && eleRect.top < window.innerHeight;
  }
  return false;
};
