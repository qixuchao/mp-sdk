import { each, isDebug, macroReplace } from './utils/index';
import { isString } from './utils/type';

const list = [];
function send(url, data) {
  if (url !== '') {
    let img = new Image();
    list.push(img);
    img.onload = function () {
      img = img.onload = null;
    };

    // 宏替换
    img.src = macroReplace(url, data);
  }
}
const logger = {
  send(urls, data) {
    if (isString(urls)) {
      urls = [urls];
    }
    each(urls, url => send(url, data));
  },
  info(...args) {
    if (isDebug) {
      console['log'].apply(window, args);
    }
  }
};

export default logger;
