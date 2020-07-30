/*global window */
import Mp from './Mp';
import { MODEL_NAME } from './config';
import { isUndefined } from './utils/type';

const _mp = window[MODEL_NAME];

// 判断是否已经存在初始化对象
if (Array.isArray(_mp) || isUndefined(_mp)) {
  new Mp(_mp);
}
