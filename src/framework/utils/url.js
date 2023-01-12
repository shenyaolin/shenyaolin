import { isWxMiniProgram } from 'framework/config'
//
const urlNative = require('url');
const path = require('path');
//
export const parse = url => {
  return urlNative.parse(url, true);
};
export const stringify = urlObject => {
  return urlNative.format({ ...urlObject, search: undefined });
};
export const setQuery = (url, newQuery) => {
  const urlObject = parse(url);
  newQuery && Object.keys(newQuery).forEach(key => {
    if (newQuery[key]) {
      urlObject.query[key] = newQuery[key];
    }
  });
  return stringify({ ...urlObject });
};
/**
 * 获取url中的所有参数
 * @alias module:url.getParams
 * @returns {object} 所有参数的键值对
 * @example cjm.url.getParams()
 */
export const getParams = () => {
  const url = window.location.search;
  const searchResult = {};
  let strs = [];
  let i = 0;
  let item;
  if (url.indexOf('?') >= 0) {
    strs = url.substr(1).split('&');
    for (; i < strs.length; i++) {
      item = strs[i].split('=');
      searchResult[item[0].toLowerCase()] = decodeURIComponent(item[1]);
    }
  }
  return searchResult;
};
export const getRouterInfo = () => {
  const url = window.location.hash.replace(/^#/, '');
  return parse(url);
};

// 页面跳转,带历史记录
export const pushUrl = ({ pathname = '', query = {} }) => {
  const localPath = window.location.hash.replace(/^#/, '').split('?')[0];
  const targetPath = path.resolve(localPath, pathname);
  const url = setQuery(targetPath, query);
  window.location.hash = url;
};

export const wxPushUrl = ({ pathname = '', query = {} }) => {
  const localPath = window.location.hash.replace(/^#/, '').split('?')[0];
  const targetPath = path.resolve(localPath, pathname);
  const url = setQuery(targetPath, query);
  if (isWxMiniProgram()) {
    const src = `#${url}`;
    window.wx.miniProgram.navigateTo({ url: `index?src=${encodeURIComponent(src)}` });
  } else {
    window.location.hash = url;
  }
};

// 清空当前页面的历史记录
export const redirectTo = ({ pathname = '', query = {} }) => {
  const localPath = window.location.hash.replace(/^#/, '').split('?')[0];
  const targetPath = path.resolve(localPath, pathname);
  const url = setQuery(targetPath, query);
  if (isWxMiniProgram()) {
    const src = `#${url}`;
    window.wx.miniProgram.redirectTo({ url: `index?src=${encodeURIComponent(src)}` });
  } else {
    window.location.hash = url;
  }
};

export const historyBack = () => {
  window.history.go(-1);
};

export const navBack = (delta = 1) => {
  if (isWxMiniProgram()) {
    window.wx.miniProgram.navigateBack({ delta });
  } else {
    historyBack();
  }
};

// 清空当前堆栈
export const reLaunch = ({ pathname = '', query = {} }) => {
  const localPath = window.location.hash.replace(/^#/, '').split('?')[0];
  const targetPath = path.resolve(localPath, pathname);
  const url = setQuery(targetPath, query);
  if (isWxMiniProgram()) {
    const src = `#${url}`;
    window.wx.miniProgram.reLaunch({ url: `index?src=${encodeURIComponent(src)}` });
  } else {
    window.location.hash = url;
  }
}

// 页面跳转,不带历史记录
export const replaceUrl = ({ pathname = '', query = {} }) => {
  const localPath = window.location.hash.replace(/^#/, '').split('?')[0];
  const targetPath = path.resolve(localPath, pathname);
  const url = setQuery(targetPath, query);
  window.location.replace(`#${url}`);
};
