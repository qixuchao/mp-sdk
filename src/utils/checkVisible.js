import { isVisible, addEventListener } from '../union/helper';
import { throttle } from './index';

let _list = [];

const checkList = () => {
  _list = _list.filter(({ container, callback }) =>
    inView(container, callback)
  );
};

const inView = (container, callback) => {
  const isVisibleFlag = isVisible(container);
  if (isVisibleFlag) {
    callback && callback();
  }
  return !isVisibleFlag;
};

addEventListener(window.document, 'touchmove', throttle(checkList, 150));
addEventListener(window, 'scroll', throttle(checkList, 150));

export default function add(container, callback) {
  if (!inView(container, callback)) {
    _list.push({
      container,
      callback
    });
  }
}
