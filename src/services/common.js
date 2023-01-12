import { ajaxSync } from 'utils/ajax';
import api from 'config/api';
import message from 'framework/utils/message';
import config from 'config/index';
import request from 'utils/request';

// 功能定制接口-列表
export const traceDynamicFun = async (functionId, data = { current: 1, pageSize: 5 }) => {
  const { err, res } = await ajaxSync.formPost(api.common.TRACE_DYNAMIC_FUN, { ...data, functionId, organizationId: config.organizationId });
  if (res && res.state === 200) {
    return res.results;
  }
  return false;
}

// 功能定制接口-详情
export const traceDynamicFunDetail = async (functionId, id) => {
  const { err, res } = await ajaxSync.post(api.common.TRACE_DYNAMIC_FUN_DETAIL, {
    id,
    functionId,
    organizationId: config.organizationId
  });
  if (res && res.state === 200) {
    return res.results;
  } else {
    message.toast(err);
  }
  return false;
}

// 获取地图点位信息
export const getMapList = async (data) =>
  request({
    url: api.mapPoint.GET_LIST,
    data,
    method: 'get'
  })

// 获取地图点位详情
export const getMapDetail = async (data) =>
  request({
    url: api.mapPoint.GET_MAP_DETAIL,
    data,
    method: 'get'
  })

