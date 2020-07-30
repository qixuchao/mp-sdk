import { each, macroReplace } from './utils/index';
import { isString } from './utils/type';

const list = [];
function send(url) {
  if (url !== '') {
    var img = document.createElement('img');
    img.onload = function () {
      img = img.onload = null;
    };
    // 需要宏替换
    img.src = macroReplace(url);
    list.push(img);
  }
}
const logger = {
  send(urls) {
    if (isString(urls)) {
      urls = [urls];
    }
    each(urls, send);
  }
};

export default logger;
