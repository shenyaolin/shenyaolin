//获取sdk
import ajax from "framework/utils/ajax";
import api from "framework/config/api";
import message from "framework/utils/message";
import _ from 'lodash';

export const getSDK = async form => {
  const {err, res} = await ajax.get(api.weixin.SDK, form);
  if (err) {
    message.toast(err);
    return null;
  } else if (res) {
    return _.get(res, 'results');
  }
};
