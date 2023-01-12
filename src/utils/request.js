/* eslint-disable guard-for-in */
/*
 * @Author: xutengfeng 
 * @Date: 2019-09-30 16:02:34 
 * @Last Modified by: gaoqiuyan
 * @Last Modified time: 2021-05-10 16:49:31
 */
import { ajaxSync } from './ajax';
import message from 'framework/utils/message';
import { isObject, isArray } from 'lodash';
// import { pushUrl } from "framework/utils/url";
// import storage from 'framework/utils/storage';


const replaceObj = obj => {
  const keys = Object.keys(obj);
  const target = {};
  for (const key of keys) {
    if (obj[key] === null) {
      target[key] = undefined;
    } else {
      target[key] = obj[key];
    }
  }
  return target;
};


const replaceArray = list => {
  const array = [...list];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item === null) {
      array[i] = undefined;
    }
    if (isObject(item)) {
      array[i] = replaceObj({ ...item });
    }
    if (isArray(item)) {
      array[i] = replaceArray([...item]);
    }
  }
  return array;
};


// 把获取到的数据过滤一遍
const replaceNull = (obj) => {
  for (const key in obj) {
    switch (Object.prototype.toString.call(obj[key]).slice(8, -1)) {
      case 'Object':
        replaceNull(obj[key]);
        break;
      case 'Array':
        for (let i = 0; i < obj[key].length; i++) {
          replaceNull(obj[key][i]);
        }
        break;
      default:
        if (obj[key] === null) obj[key] = undefined;
    }
  }
};


async function request({ url, data, method = 'get', options = {} }) {
  const { err, ...rest } = await ajaxSync[method](url, data, options);
  const res = rest.res || {};
  if (err) {
    message.toast(err);
    return err;
  } else if (res) {
    const { results, ...rest } = res || {};
    replaceNull(results);
    return { results, ...rest };
  }
}

export default request;