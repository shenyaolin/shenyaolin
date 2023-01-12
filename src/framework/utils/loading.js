import {Toast} from 'antd-mobile';
import _ from 'lodash';

let isLoading = false;
export const showLoading = (options = {}) => {
  if (!isLoading) {
    isLoading = true;
    const content = _.get(options, 'content') || '拼命加载中...';
    const duration = _.get(options, 'duration') || 5;
    setTimeout(() => {
      isLoading = false;
    }, duration * 1000);
    Toast.loading(content, duration);
  }
};
export const hideLoading = () => {
  isLoading = false;
  Toast.hide();
};

window.showLoading = showLoading;
window.hideLoading = hideLoading;