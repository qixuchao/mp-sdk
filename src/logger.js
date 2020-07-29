import { each, macro } from './utils';

let list = [];
function send(url) {
  if (url !== '') {
    var img = document.createElement('img');
    img.onload = function () {
      img = img.onload = null;
    };
    // 需要宏替换
    img.src = url;
    list.push(img);
  }
}
const logger = {
  send(urls) {
    each(urls, send);
  }
};

export default logger;
