import request from 'utils/request';
import api from 'config/api';

// 新增随手拍
export const addList = async (data) =>
  request({
    url: api.list.ADD_LIST,
    data,
    method: 'post'
  })
// 获取随手拍详情
export const getListDetail = async (data) =>
  request({
    url: api.list.GET_LIST_DETAILS,
    data,
    method: 'get'
  })
// 设置受理
export const setAcceptance = async (data) =>
  request({
    url: api.list.SET_ACCEPTANCE,
    data,
    method: 'get'
  })
// 回复办结
export const setFinish = async (data) =>
  request({
    url: api.list.SET_FINISH,
    data,
    method: 'post'
  })
// 评价
export const evaluate = async (data) =>
  request({
    url: api.list.EVALUATE,
    data,
    method: 'post'
  })

//获取地址
export const getAddress = async (data) =>
  request({
    url: api.user.REGION,
    data,
    method: "get",
  });
