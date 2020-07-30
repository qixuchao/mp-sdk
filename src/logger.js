import { each, macro } from './utils/index';
import { isString } from './utils/type';

const list = [];
function send(url) {
  if (url !== '') {
    var img = document.createElement('img');
    img.onload = function () {
      img = img.onload = null;
    };
    // 需要宏替换
    img.src = macro(url);
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
