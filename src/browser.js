const ua = navigator.userAgent;

export const isIOS = /(iPhone|iPod|Android|ios)/i.test(ua);
export const isAndroid = /Android|Linux/.test(ua);

export const isWechat = /micromessenger/i.test(ua);
export const isMqqbrowser = /mqqbrowser/i.test(ua);
export const isQQ = !isMqqbrowser && /qq/i.test(ua);
