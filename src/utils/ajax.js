/**
 * @module utils/ajax
 */
import axios from 'axios';
import eventBus from './eventBus';
import * as storage from './storage';
import { pushUrl } from "framework/utils/url";

const qs = require('qs');

const formatParams = function (params) {
  return { ...params };
};

const dealOptions = function (options) {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers.channel = 'qianduan';
  const isDev = window.location.href.indexOf('localhost') >= 0;
  if (isDev) {
    options.headers.whitelist = 'localhost';
  }
  return options;
};

function urlFix(url) {
  return url.indexOf('/interface') === 0 ? `/apiInterface${url}` : `/apiInterface/interface${url}`;

}

function ajaxComplateHandler(result) {
  eventBus.emit('ajaxComplate', result);
  return result;
}

export const ajax = {
  /**
   * 发送ajax get请求
   * @alias module:utils/ajax.get
   * @param url {String} 请求地址
   * @param params {Object} http参数
   * @param options {Object}
   * @returns {Promise}
   */
  get(url, params, options) {
    options = options || {};
    const formatResult = formatParams(params);
    formatResult._r_ = Math.floor(Math.random() * 10000000 + 10000000); // 增加一个随机数参数，禁止IE的缓存
    options.params = formatResult;
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      axios
        .get(resUrl, dealOptions(options))
        .then(res => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch(reject);
    });
  },
  formPost(url, params, options) {
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      const data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      })
      axios.post(resUrl, data, dealOptions(options)).then(res => {
        if (res) {
          resolve(res.data);
        }
      }).catch(reject);
    });
  },
  /**
   * 发送ajax post请求
   * @alias module:utils/ajax.post
   * @param url {String} 请求地址
   * @param params {Object} http参数
   * @param options {Object}
   * @returns {Promise}
   */
  post(url, params, options) {
    // 需要对复杂对象进行JSON序列化
    const formatResult = options.noFormat ? params : formatParams(params);
    // formatResult = qs.stringify(formatResult);
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      axios
        .post(resUrl, formatResult, dealOptions(options))
        .then(res => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch(reject);
    });
  },
  //
  formPut(url, params, options) {
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      const data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      axios.put(resUrl, data, dealOptions(options)).then(res => {
        if (res) {
          resolve(res.data);
        }
      }).catch(reject);
    });
  },
  //
  put(url, params, options) {
    // 需要对复杂对象进行JSON序列化
    const formatResult = formatParams(params);
    // formatResult = qs.stringify(formatResult);
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      axios
        .put(resUrl, formatResult, dealOptions(options))
        .then(res => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch(reject);
    });
  },
  del(url, params, options) {
    options = options || {};
    const formatResult = formatParams(params);
    formatResult._r_ = Math.floor(Math.random() * 10000000 + 10000000); // 增加一个随机数参数，禁止IE的缓存
    options.params = formatResult;
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      axios
        .delete(resUrl, dealOptions(options))
        .then(res => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch(reject);
    });
  },
};

//
function setHeaderToken(opt) {
  
  const loginToken = storage.get('userId');
  // const loginToken = localStorage.getItem('userId');
  if (loginToken) {
    if (!opt.headers) {
      opt.headers = {};
    }
    if (!opt.headers['userId']) {
      opt.headers['userId'] = loginToken;
    }
  }
  return opt;
}

//
export const ajaxSync = {
  headers: {},
  setHeaders(headers = {}) {
    ajaxSync.headers = { ...ajaxSync.headers, ...headers };
    return ajaxSync;
  },
  async get(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    options = setHeaderToken(options);
    try {
      res = await ajax.get(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
      if(res.state === 401){
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
  async formPost(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    options = setHeaderToken(options);
    try {
      res = await ajax.formPost(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
      if(res.state === 401){
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
  async post(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    options = setHeaderToken(options);
    try {
      res = await ajax.post(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
      if(res.state === 401){
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
  async formPut(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    options = setHeaderToken(options);
    try {
      res = await ajax.formPut(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
      if(res.state === 401){
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
  async put(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    options = setHeaderToken(options);
    try {
      res = await ajax.put(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
      if(res.state === 401){
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
  async del(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    options = setHeaderToken(options);
    try {
      res = await ajax.del(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
      if(res.state === 401){
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
};
