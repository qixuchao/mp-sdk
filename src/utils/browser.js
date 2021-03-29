/*global window*/
const ua = window.navigator.userAgent;

export default {
  isMobile: /(iPhone|iPod|Android|ios|mobile)/i.test(ua),
  isAndroid: /Android|Linux/i.test(ua),
  isIos: /\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(ua)
};
